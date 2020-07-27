const jsonfile = require('jsonfile');
const users = './database/users.json';
const Constants = require('./constants');
const jwt = require('jsonwebtoken');


exports.getUserDetails = async function getUserDetails(userName) {
    const allUsers = await jsonfile.readFile(users);
    const filteredUserArray = allUsers.filter(user => (user.username === userName));
    return filteredUserArray.length === 0 ? {} : filteredUserArray[0];
};

exports.generateToken = (username, role) => {
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

exports.verifyToken = (req, res, next) => {
    if (!req.headers.authorization) res.status(401).send({message: "Not Authorized to access data"});
    else {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, Constants.JWT_OPTIONS.SECRET, function (err, decode) {
            if (err) res.status(401).send({message: "Please login again! Your session has expired"});
            else next();
        })
    }
};

exports.isAPIAccessAllowed = (token, apiName) => {
    const decodedToken = jwt.decode(token.split(" ")[1]);
    return (decodedToken['aud'].includes(apiName));
};
