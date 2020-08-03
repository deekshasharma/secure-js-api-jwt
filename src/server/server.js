require('dotenv').config({path: './variables.env'});
const express = require('express');
const cookieParser = require('cookie-parser');
const {uuid} = require('uuidv4');
const Constants = require('./constants');
const {verifyToken, isAPIAccessAllowed, getAllUsers, addBook, constructTokenResponse, isCredentialValid, getAllBooks, getFavoriteBooksForUser} = require('./shared');

const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/users', verifyToken, (req, res) => {
    if (isAPIAccessAllowed(req.cookies.token, Constants.SHOW_USERS)) {
        getAllUsers()
            .then(users => {
                constructTokenResponse(req.cookies.token, null)
                    .then(token => {
                        res.cookie('token', token, {httpOnly: true});
                        res.status(200).send( {users: users})
                    })
            }).catch(error => console.error("Error retrieving users ", error.message));
    } else res.status(401).send({message: "You are not authorized to view users"})
});

app.get('/books', verifyToken, (req, res) => {
    if (isAPIAccessAllowed(req.cookies.token, Constants.SHOW_BOOKS)) {
        getAllBooks()
            .then(books => {
                constructTokenResponse(req.cookies.token, null)
                    .then((token) => {
                        res.cookie('token', token, {httpOnly: true});
                        res.status(200).send({books: books});
                    })
            })
            .catch(error => console.error("Error retrieving books ", error.message));
    } else res.status(401).send({message: "You are not authorized to view books"});
});


app.post('/login', (req, res) => {
    let base64Encoding = req.headers.authorization.split(" ")[1];
    let credentials = (Buffer.from(base64Encoding, "base64").toString().split(":"));
    const username = credentials[0];
    const password = credentials[1];
    isCredentialValid(username, password)
        .then(result => {
            if (!result) res.status(403).send({message: "Either username or password is incorrect"});
            else constructTokenResponse(null, username)
                .then(token => {
                    res.cookie('token', token, {httpOnly: true});
                    res.status(200)
                        .send({
                            token_type: process.env.TOKEN_TYPE,
                            expires_in: process.env.EXPIRY,
                            access_token: token
                        })
                })
        });
});

app.get('/favorite', verifyToken, (req, res) => {
    if (isAPIAccessAllowed(req.cookies.token, Constants.SHOW_FAVORITE)) {
        getFavoriteBooksForUser(req.cookies.token).then(books => {
            constructTokenResponse(req.cookies.token, null)
                .then((token) => {
                    res.cookie('token', token, {httpOnly: true});
                    res.status(200).send({favorites: books})
                })
        })
    } else res.status(403).send({message: "You cannot view favorite books"});
});


app.post('/book', verifyToken, (req, res) => {
    if (isAPIAccessAllowed(req.cookies.token, Constants.ADD_BOOK)) {
        addBook({name: req.body.name, author: req.body.author, id: uuid()})
            .then(err => {
                if (err) console.log(err);
                else {
                    constructTokenResponse(req.cookies.token).then(token => {
                        res.cookie('token', token, {httpOnly: true});
                        res.status(200).send({message: "Book added successfully"})
                    })
                }
            })
    } else res.status(401).send({message: "Sorry! Only admin can add a book"})
});

