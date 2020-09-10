require("dotenv").config({ path: "./variables.env" });
const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");
const {
  getUserByUsername,
  isEmptyObject,
  isPasswordCorrect,
  getAllBooks,
  getAllUsers,
  addBook,
  verifyToken,
  getFavoriteBooksForUser,
  getAudienceFromToken,
  generateToken,
} = require("./shared");
const Constants = require("./constants");
const app = express();
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(express.json());
app.use(cors());

app.get("/users", verifyToken, (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (getAudienceFromToken(token).includes(Constants.SHOW_USERS)) {
    getAllUsers().then((users) => {
      if (users && users.length > 0) {
        generateToken(token, null).then((token) => {
          res.status(200).send({ users: users, token: token });
        });
      } else res.status(500).send({ users: [], token: token });
    });
  } else
    res
      .status(403)
      .send({ message: "Not authorized to view users", token: token });
});

app.get("/books", verifyToken, (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  getAllBooks().then((books) => {
    if (books && books.length > 0) {
      generateToken(token, null).then((token) => {
        res.status(200).send({ books: books, token: token });
      });
    } else res.status(500).send({ books: [], token: token });
  });
});

app.post("/login", (req, res) => {
  let base64Encoding = req.headers.authorization.split(" ")[1];
  let credentials = Buffer.from(base64Encoding, "base64").toString().split(":");
  const username = credentials[0];
  const password = credentials[1];
  getUserByUsername(username).then((user) => {
    if (user && !isEmptyObject(user)) {
      isPasswordCorrect(user.key, password).then((result) => {
        if (!result)
          res
            .status(401)
            .send({ message: "username or password is incorrect" });
        else {
          generateToken(null, username).then((token) => {
            res
              .status(200)
              .send({ username: user.username, role: user.role, token: token });
          });
        }
      });
    } else
      res.status(401).send({ message: "username or password is incorrect" });
  });
});

app.get("/logout", verifyToken, (req, res) => {
  res.status(200).send({ message: "Signed out" });
});

app.get("/favorite", verifyToken, (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  getFavoriteBooksForUser(token).then((books) => {
    generateToken(token, null).then((token) => {
      res.status(200).send({ favorites: books, token: token });
    });
  });
});

app.post("/book", verifyToken, (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (getAudienceFromToken(token).includes(Constants.ADD_BOOK)) {
    addBook({ name: req.body.name, author: req.body.author, id: uuid() }).then(
      (err) => {
        if (err) res.status(500).send({ message: "Cannot add this book" });
        else {
          generateToken(token, null).then((token) => {
            res
              .status(200)
              .send({ message: "Book added successfully", token: token });
          });
        }
      }
    );
  } else
    res
      .status(403)
      .send({ message: "Not authorized to add a book", token: token });
});
