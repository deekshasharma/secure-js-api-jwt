require('dotenv').config({path: './variables.env'});
const express = require('express');
const {uuid} = require('uuidv4');
const Constants = require('./constants');
const {verifyToken, isAPIAccessAllowed, getAllUsers, addBook, constructTokenResponse, isCredentialValid, getAllBooks,getFavoriteBooksForUser} = require('./shared');


const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send({message: 'Welcome to our Home '});
});

app.get('/users', verifyToken, (req, res) => {
    if (isAPIAccessAllowed(req.headers.authorization, Constants.SHOW_USERS)) {
        getAllUsers()
            .then(users => {
                constructTokenResponse(req.headers.authorization, null)
                    .then(tokenRes => res.status(200).send(Object.assign(tokenRes, {users: users})))
            }).catch(error => console.error("Error retrieving users ", error.message));
    } else res.status(401).send({message: "You cannot view users, only admin user can."})
});


app.get('/books', verifyToken, (req, res) => {
    if (isAPIAccessAllowed(req.headers.authorization, Constants.SHOW_BOOKS)) {
        getAllBooks()
            .then(books => {
                constructTokenResponse(req.headers.authorization, null)
                    .then((tokenRes) => res.status(200).send(Object.assign(tokenRes, {books: books})))
            })
            .catch(error => console.error("Error retrieving books ", error.message));
    } else res.status(401).send({message: "Cannot view books"});
});


app.post('/login', (req, res) => {
    let base64Encoding = req.headers.authorization.split(" ")[1];
    let credentials = (Buffer.from(base64Encoding, "base64").toString().split(":"));
    const username = credentials[0];
    const password = credentials[1];
    isCredentialValid(username, password)
        .then(result => {
            if (!result) res.status(403).send({message: "Either username or password is incorrect"});
            else constructTokenResponse(null, username).then(tokenRes => res.send(tokenRes))
        });
});

app.get('/favorite', verifyToken, (req, res) => {
    if (isAPIAccessAllowed(req.headers.authorization, Constants.SHOW_FAVORITE)) {
        getFavoriteBooksForUser(req.headers.authorization).then(books => {
            constructTokenResponse(req.headers.authorization, null)
                .then((tokenRes) => res.status(200).send(Object.assign(tokenRes, {favorites: books})))
        })
    } else res.status(403).send({message: "You cannot view favorite books"});
});


app.post('/book', verifyToken, (req, res) => {
    if (isAPIAccessAllowed(req.headers.authorization, Constants.ADD_BOOK)) {
        addBook({name: req.body.name, author: req.body.author, id: uuid()})
            .then(err => {
                if (err) console.log(err);
                else {
                    constructTokenResponse(req.headers.authorization).then(tokenRes => res.send(tokenRes))
                }
            })
    } else res.status(401).send({message: "Sorry! Only admin can add a book"})
});

