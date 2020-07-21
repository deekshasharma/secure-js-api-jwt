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
        .catch(err => console.log(err.message));
});

app.get('/books', (req, res) => {
    jsonfile.readFile(inventory)
        .then(books => res.send({bookCollection: books}))
        .catch(error => console.error(error));

});

app.get('/favorite/:id', (req, res) => {
    const userMatch = users.filter(user => user.id === req.params.id)[0];
    const favoriteBooks = [];
    userMatch.favorite.map(bookId => {
        const matchingBook = getMatchingBook(bookId);
        favoriteBooks.push(matchingBook);
    });
    res.send({favoriteBooks: favoriteBooks});
});


const getMatchingBook = (bookId) => books.filter(book => bookId === book.id)[0];