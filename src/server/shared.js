const jsonfile = require("jsonfile");
const users = "./database/users.json";
const inventory = './database/books.json';
const bcrypt = require("bcrypt");

getUserByUsername = async function (username) {
  const allUsers = await jsonfile.readFile(users);
  const filteredUserArray = allUsers.filter(
    (user) => user.username === username
  );
  return filteredUserArray.length === 0 ? null : filteredUserArray[0];
};

exports.isCredentialValid = async function (username, password) {
  const user = await getUserByUsername(username);
  if (user) {
    return bcrypt
      .compare(password, user.key)
      .then((result) => (result ? user : result));
  } else return false;
};

exports.getAllUsers = async function () {
  const allUsers = await jsonfile.readFile(users);
  let updatedUsers = [];
  allUsers.map((user) => {
    updatedUsers.push({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    });
  });
  return updatedUsers;
};

exports.getAllBooks = async function () {
  return await jsonfile.readFile(inventory);
};
