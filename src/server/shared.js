const jsonfile = require("jsonfile");
const users = "./database/users.json";
const inventory = "./database/books.json";
const bcrypt = require("bcrypt");

getUserByUsername = async function (username) {
  const allUsers = await jsonfile.readFile(users);
  const filteredUserArray = allUsers.filter(
    (user) => user.username === username
  );
  return filteredUserArray.length === 0 ? null : filteredUserArray[0];
};

//TODO: Refactor this function
/**
 * Change the name - Get user if valid
 * Return a null object or user instead of falsy value
 */
exports.isCredentialValid = async function (username, password) {
  const user = await getUserByUsername(username);
  if (user) {
    return bcrypt
      .compare(password, user.key)
      .then((result) => (result ? user : result));
  } else return false;
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
    console.log("Error retrieving users: ", err.message);
  }
};

exports.getAllBooks = async function () {
  return await jsonfile.readFile(inventory);
};

exports.addBook = async function (book) {
  const allBooks = await jsonfile.readFile(inventory);
  allBooks.push(book);
  return await jsonfile.writeFile(inventory, allBooks);
};

exports.getFavoriteBooks = async function (username) {
  const user = await getUserByUsername(username);
  const favoriteBookIds = user["favorite"];
  const allBooks = await jsonfile.readFile(inventory);
  const favoriteBooks = [];
  favoriteBookIds.forEach((id) =>
    favoriteBooks.push(allBooks.filter((book) => id === book.id)[0])
  );
  return favoriteBooks;
};
