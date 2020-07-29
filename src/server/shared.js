const jsonfile = require('jsonfile');
const users = './database/users.json';
const inventory = './database/books.json';
const Constants = require('./constants');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


getUserByUsername = async function getUserDetails(userName) {
    const allUsers = await jsonfile.readFile(users);
    const filteredUserArray = allUsers.filter(user => (user.username === userName));
    return filteredUserArray.length === 0 ? {} : filteredUserArray[0];
};

const generateToken = (username, role) => {
    const payload = {data: username};
    const options = {
        algorithm: process.env.ALGORITHM,
        expiresIn: process.env.EXPIRY,
        issuer: process.env.ISSUER,
        audience: role === "admin" ? Constants.JWT_OPTIONS.ADMIN_AUDIENCE : Constants.JWT_OPTIONS.MEMBER_AUDIENCE,
        subject: username
    };
    return jwt.sign(payload, process.env.SECRET, options);
};

const getUsernameFromToken = (authHeader) => {
    const token = authHeader.split(" ")[1];
    return jwt.decode(token)['sub'];
};

exports.getFavoriteBooksForUser = async function (authHeader) {
    const username = getUsernameFromToken(authHeader);
    const user = await getUserByUsername(username);
    const favoriteBookIds = user['favorite'];
    const allBooks = await jsonfile.readFile(inventory);
    const favoriteBooks = [];
    favoriteBookIds.map(id => favoriteBooks.push(allBooks.filter(book => id === book.id)[0]));
    return favoriteBooks;
};

exports.verifyToken = (req, res, next) => {
    if (!req.headers.authorization) res.status(401).send({message: "Not Authorized to access data"});
    else {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET, function (err, decode) {
            if (err) res.status(401).send({message: "Please login again! Your session has expired"});
            else next();
        })
    }
};

exports.isAPIAccessAllowed = (token, apiName) => {
    const decodedToken = jwt.decode(token.split(" ")[1]);
    return (decodedToken['aud'].includes(apiName));
};

exports.getAllUsers = async function () {
    const allUsers = await jsonfile.readFile(users);
    let updatedUsers = [];
    allUsers.map(user => {
        updatedUsers.push({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role
        })
    });
    return updatedUsers;
};

exports.getAllBooks = async function () {
    return await jsonfile.readFile(inventory);
};

exports.addBook = async function (book) {
    const allBooks = await jsonfile.readFile(inventory);
    allBooks.push(book);
    return await jsonfile.writeFile(inventory, allBooks);
};

exports.constructTokenResponse = async function (authHeader, userName) {
    let name = userName || getUsernameFromToken(authHeader);
    const user = await getUserByUsername(name);
    return {
        access_token: generateToken(user.username, user.role),
        token_type: process.env.TOKEN_TYPE,
        expires_in: process.env.EXPIRY,
    }
};

exports.isCredentialValid = async function (username, password) {
    const user = await getUserByUsername(username);
    if (user) {
        return bcrypt.compare(password, user.key)
            .then(result => result)
    } else return false;
};

