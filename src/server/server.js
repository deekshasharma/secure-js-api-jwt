require('dotenv').config({path: './variables.env'});
const express = require('express');
const jsonfile = require('jsonfile');
const {uuid} = require('uuidv4');
const Constants = require('./constants');
const {getUserDetails, generateToken, verifyToken, isAPIAccessAllowed, decodeTokenAndGetUser, getAllUsers, addBook, constructTokenResponse, isCredentialValid, getAllBooks} = require('./shared');


const inventory = './database/books.json';
const users = './database/users.json';
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
        const subject = decodeTokenAndGetUser(req.headers.authorization);
        getUserDetails(subject).then(user => {
            getAllUsers()
                .then(users => res.status(200).send({
                    access_token: generateToken(user.username, user.role),
                    token_type: process.env.TOKEN_TYPE,
                    expires_in: process.env.EXPIRY,
                    users: users,
                }));
        })
    } else res.status(401).send({message: "You cannot view users, only admin user can."})
});


app.get('/books', verifyToken, (req, res) => {
    if (isAPIAccessAllowed(req.headers.authorization, Constants.SHOW_BOOKS)) {
        getAllBooks()
            .then(books => {
                constructTokenResponse(req.headers.authorization, null)
                    .then((tokenRes) => res.send(Object.assign(tokenRes, {books: books})))
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

app.get('/favorite/:id', verifyToken, (req, res) => {
    if (isAPIAccessAllowed(req.headers.authorization, Constants.SHOW_FAVORITE)) {
        jsonfile.readFile(users)
            .then(allUsers => allUsers.filter(user => user.id === req.params.id)[0]['favorite'])
            .then(favBookIds => {
                jsonfile.readFile(inventory)
                    .then(books => books)
                    .then((books) => {
                        const favoriteBooks = [];
                        favBookIds.map(id => favoriteBooks.push(books.filter(book => id === book.id)[0]));
                        res.send({favorites: favoriteBooks})
                    })
                    .catch(error => console.log("Cannot retrieve inventory ", error.message));
            })
            .catch(err => console.log("Cannot read users ", err.message))
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

