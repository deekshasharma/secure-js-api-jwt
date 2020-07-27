const express = require('express');
const jsonfile = require('jsonfile');
const {uuid} = require('uuidv4');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Constants = require('./constants');
const {getUserDetails, generateToken, verifyToken,isAPIAccessAllowed} = require('./shared');


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

//TODO: Verify if the incoming request has access to this API.
app.get('/users', verifyToken, (req, res) => {
    if (isAPIAccessAllowed(req.headers.authorization,Constants.SHOW_USERS )) {
        jsonfile.readFile(users)
            .then(allUsers => res.send(allUsers))
            .catch(error => console.log(error.message));
    }
    else res.status(401).send({message: "You cannot view users, only admin user can."})

});

//TODO: Verify if the incoming request has access to this API. Both members and admin should be able to access
app.get('/books', verifyToken, (req, res) => {
    const decodedToken = jwt.decode(req.headers.authorization.split(" ")[1]);
    if (decodedToken['aud'].includes(Constants.SHOW_BOOKS)) {
        jsonfile.readFile(inventory)
            .then(books => res.send({bookCollection: books}))
            .catch(error => console.error(error.message));
    } else res.status(401).send({message: "Cannot view books"});
});


app.post('/login', (req, res) => {
    let base64Encoding = req.headers.authorization.split(" ")[1];
    let credentials = (Buffer.from(base64Encoding, "base64").toString().split(":"));
    const username = credentials[0];
    const password = credentials[1];

    getUserDetails(username)
        .then(user => {
            if (!user) res.status(403).send({message: "Either username or password is incorrect"});
            else return user;
        })
        .then(user => {
            bcrypt.compare(password, user.key)
                .then((result) => {
                    if (!result) res.status(403).send({message: "Either username or password is incorrect"});
                    else {
                        res.status(200).send({
                            access_token: generateToken(user.username, user.role),
                            token_type: "JWT",
                            expires_in: "1h"
                        })
                    }
                });
        })
        .catch(error => console.log("Error logging to the app ", error.message))
});

//TODO: Verify if the incoming request has access to this API. Both members and admin should be able to access
app.get('/favorite/:id', verifyToken, (req, res) => {
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
});

//TODO: Make sure the client sets the value of Content-Type as "application/json"
//TODO: Sanitize data before saving to DB.
//TODO: Mention in the script if there is more data(books), it's better to use a data store. We are reading all books in memory and then replacing them.
app.post('/book', verifyToken, (req, res) => {
    let book = req.body;
    book.id = uuid();
    jsonfile.readFile(inventory)
        .then(books => {
            books.push(book);
            jsonfile.writeFile(inventory, books, (err) => {
                if (err) console.log(err.message);
            })
        })
        .catch(error => console.error(error.message));
    res.send({message: "OK"})
});
