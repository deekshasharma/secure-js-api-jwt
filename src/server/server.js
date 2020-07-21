const express = require('express');
const jsonfile = require('jsonfile');
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
    jsonfile.readFile(users)
        .then(allUsers => allUsers.filter(user => user.id === req.params.id)[0]['favorite'])
        .then(favBookIds => {
            let allBooks = [];
            const favoriteBooks = [];
            jsonfile.readFile(inventory)
                .then(books => allBooks = books)
                .then(() => {
                    favBookIds.map(id => favoriteBooks.push(allBooks.filter(book => id === book.id)[0]);
                    return favoriteBooks;
                })
                .then(favoriteBooks => {
                    res.send({favoriteBooks: favoriteBooks})
                })
                .catch(error => console.log("Cannot retrieve inventory ", error.message));
        })
        .catch(err => console.log("Cannot read users ",err.message))
});