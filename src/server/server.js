const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
var cors = require('cors');

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send({ message: 'Welcome to our Home ' });
});

app.get('/users', (req, res) => {
    res.send([{fName: "Deeksha", lastName: "Sharma", favorite: ["1234455jeler", "7943854kejer"]}, {fName: "Amy", lastName: "Robinson", favorite: ["5467364754dfjk"]}]);
});

app.get('/books', (req, res) => {
    res.send({bookCollection: books})
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


const books = [
    {
        id: "6cc12b5e-cb5e-11ea-87d0-0242ac130003",
        name: "Surrounded by idiots",
        author: "Thomas Erikson"
    },
    {
        id: "722f584a-cb5e-11ea-87d0-0242ac130003",
        name: "Stillness is the key",
        author: "Ryan Holiday"
    },
    {
        id: "765384e6-cb5e-11ea-87d0-0242ac130003",
        name: "Sapiens:A Brief History of Humankind",
        author: "Yuval Noah Harari"
    },
    {
        id: "7a4fe9ea-cb5e-11ea-87d0-0242ac130003",
        name: "Principles for Success",
        author: "Ray Dalio"
    },

];

const users = [
    {id: "f2775f38-92fc-42e5-98a5-b137a0887a40",fName: "Deeksha", lastName: "Sharma", favorite: ["6cc12b5e-cb5e-11ea-87d0-0242ac130003", "765384e6-cb5e-11ea-87d0-0242ac130003"], role: "user"},
    {id: "677c96e2-cb5e-11ea-87d0-0242ac130003", fName: "Amy", lastName: "Robinson", favorite: ["5467364754dfjk"], role: "admin"}
];