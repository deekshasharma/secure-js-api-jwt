const jsonfile = require("jsonfile");
const users = "./database/users.json";
const inventory = "./database/books.json";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Constants = require("./constants");

var getUserByUsername = (exports.getUserByUsername = async function (username) {
  try {
    const allUsers = await jsonfile.readFile(users);
    const filteredUserArray = allUsers.filter(
      (user) => user.username === username
    );
    return filteredUserArray.length === 0 ? {} : filteredUserArray[0];
  } catch (err) {
    console.log("Error reading users: ", err.message);
  }
});

exports.isEmptyObject = (object) => Object.entries(object).length === 0;

exports.isPasswordCorrect = async function (key, password) {
  return bcrypt.compare(password, key).then((result) => result);
};

exports.getAllBooks = async function () {
  try {
    return await jsonfile.readFile(inventory);
  } catch (err) {
    console.log("Error reading books: ", err);
  }
};

exports.getAllUsers = async function () {
  try {
    const allUsers = await jsonfile.readFile(users);
    let updatedUsers = [];
    allUsers.forEach((user) => {
      updatedUsers.push({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      });
    });
    return updatedUsers;
  } catch (err) {
    console.log("Error reading users from datastore ", err.message);
  }
};

exports.addBook = async function (book) {
  try {
    const allBooks = await jsonfile.readFile(inventory);
    allBooks.push(book);
    return await jsonfile.writeFile(inventory, allBooks);
  } catch (err) {
    return err;
  }
};

const getUsernameFromToken = (token) => jwt.decode(token)["sub"];
exports.getAudienceFromToken = (token) => jwt.decode(token)["aud"];

const generateToken = (username, role) => {
  const payload = {};
  const options = {
    algorithm: process.env.ALGORITHM,
    expiresIn: process.env.EXPIRY,
    issuer: process.env.ISSUER,
    subject: username,
    audience:
      role === "admin"
        ? Constants.JWT_OPTIONS.ADMIN_AUDIENCE
        : Constants.JWT_OPTIONS.MEMBER_AUDIENCE,
  };
  return jwt.sign(payload, process.env.SECRET, options);
};

exports.constructTokenResponse = async function (token, userName) {
  let name = userName || getUsernameFromToken(token);
  const user = await getUserByUsername(name);
  return generateToken(user.username, user.role);
};

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token)
    res.status(401).send({ message: "Not Authorized to access data" });
  else {
    jwt.verify(token, process.env.SECRET, function (err) {
      if (err) {
        res
          .status(401)
          .send({ message: "Please login again! Your session has expired" });
      } else next();
    });
  }
};

exports.getFavoriteBooksForUser = async function (token) {
  const username = getUsernameFromToken(token);
  const user = await getUserByUsername(username);
  const favoriteBookIds = user["favorite"];
  const favoriteBooks = [];
  if (favoriteBookIds.length === 0) return favoriteBooks;
  const allBooks = await jsonfile.readFile(inventory);
  favoriteBookIds.forEach((id) =>
    favoriteBooks.push(allBooks.filter((book) => id === book.id)[0])
  );
  return favoriteBooks;
};