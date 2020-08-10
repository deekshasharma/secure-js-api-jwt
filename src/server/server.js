const express = require("express");
const cors = require("cors");
const { isCredentialValid, getAllUsers, getAllBooks } = require("./shared");

const port = process.env.PORT || 5000;
const app = express();
app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(express.json());
app.use(cors());

app.get("/users", (req, res) => {
  getAllUsers()
    .then((users) => {
      if (users.length > 0) res.status(200).send({ users: users });
      else res.status(500).send({ users: [] });
    })
    .catch((error) => console.error("Error retrieving users ", error.message));
});

// app.get('/books', verifyToken, (req, res) => {
//   if (isAPIAccessAllowed(req.cookies.token, Constants.SHOW_BOOKS)) {
//     getAllBooks()
//         .then(books => {
//           constructTokenResponse(req.cookies.token, null)
//               .then((token) => {
//                 res.cookie('token', token, {httpOnly: true});
//                 res.status(200).send({books: books});
//               })
//         })
//         .catch(error => console.error("Error retrieving books ", error.message));
//   } else res.status(401).send({message: "You are not authorized to view books"});
// });

app.get("/books", (req, res) => {
  getAllBooks()
    .then((books) => {
      if (books.length > 0) res.status(200).send({ books: books });
      else res.status(500).send({ books: [] });
    })
    .catch((error) => console.error("Error retrieving books ", error.message));
});

app.post("/login", (req, res) => {
  let base64Encoding = req.headers.authorization.split(" ")[1];
  let credentials = Buffer.from(base64Encoding, "base64").toString().split(":");
  const username = credentials[0];
  const password = credentials[1];
  isCredentialValid(username, password).then((result) => {
    if (!result)
      res.status(401).send({ message: "username or password is incorrect" });
    else
      res
        .status(200)
        .send({ user: { username: result.username, role: result.role } });
  });
});

app.get("/logout", (req, res) => {});

app.get("/favorite", (req, res) => {});

app.post("/book", (req, res) => {});
