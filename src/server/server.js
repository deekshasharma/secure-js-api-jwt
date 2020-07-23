const express = require('express');
const jsonfile = require('jsonfile');
const {uuid} = require('uuidv4');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const inventory = './database/books.json';
const users = './database/users.json';


const app = express();
const port = process.env.PORT || 5000;
var cors = require('cors');

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send({message: 'Welcome to our Home '});
});

app.get('/users', (req, res) => {
    jsonfile.readFile(users)
        .then(allUsers => res.send(allUsers))
        .catch(error => console.log(error.message));
});

app.get('/books', (req, res) => {
    jsonfile.readFile(inventory)
        .then(books => res.send({bookCollection: books}))
        .catch(error => console.error(error.message));

});

app.post('/login', (req, res) => {
    let base64Encoding = req.headers.authorization.split(" ")[1];
    let credentials = (Buffer.from(base64Encoding, "base64").toString().split(":"));
    const username = credentials[0];
    const password = credentials[1];

    jsonfile.readFile(users)
        .then(allUsers => {
            const filteredUserArray = allUsers.filter(user => (user.username === username));
            let user = filteredUserArray.length === 0 ? {} : filteredUserArray[0];
            if (!user) res.status(403).send({message: "Either username or password is incorrect"});
            else return user;
        })
        .then((user) => {
            bcrypt.compare(password, user.key)
                .then((result) => {
                    if (!result) res.status(403).send({message: "Either username or password is incorrect"});
                    else {
                        res.status(200).send({
                            message: "Welcome!",
                            token: generateToken(user.username, user.role)
                        })
                    }
                });
        })
        .catch(error => console.log("Error logging to the app ", error.message));
});


app.get('/favorite/:id', (req, res) => {
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
app.post('/book', (req, res) => {
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

const MEMBER_AUDIENCE = ['SHOW_FAVORITE', 'LOGOUT', 'LOGIN', 'SHOW_BOOKS'];
const ADMIN_AUDIENCE = ['SHOW_FAVORITE', 'LOGOUT', 'LOGIN', 'SHOW_BOOKS', 'ADD_BOOK', 'SHOW_USERS'];
const ISSUER = "BOOKIE_ORG";
const EXPIRY = 120;
const SECRET = ")x2f-l-opsnd)w!!z2m7ykvony99pt@6@6m+=q2uk3%w8*7$ow";

const generateToken = (username, role) => {
    const payload = {data: username};

    const options = {
        algorithm: 'HS256',
        expiresIn: EXPIRY,
        issuer: ISSUER,
        audience: role === "admin" ? ADMIN_AUDIENCE : MEMBER_AUDIENCE,
        subject: username
    };
    return jwt.sign(payload, SECRET, options);
}

