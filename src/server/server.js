const express = require('express');
const jsonfile = require('jsonfile');
const {uuid} = require('uuidv4');

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


app.get('/favorite/:id', (req, res) => {
    console.log("Inside Favorite API")
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
/**
 * https://stackoverflow.com/questions/49322709/javascript-how-to-add-data-to-an-array-inside-json-file
 */
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

