const jsonfile = require("jsonfile");
const users = "./database/users.json";
const inventory = "./database/books.json";
const bcrypt = require("bcrypt");

exports.getUserByUsername = async function (username) {
  try {
    const allUsers = await jsonfile.readFile(users);
    const filteredUserArray = allUsers.filter(
      (user) => user.username === username
    );
    return filteredUserArray.length === 0 ? {} : filteredUserArray[0];
  } catch (err) {
    console.log("Error reading users: ", err.message);
  }
};

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
