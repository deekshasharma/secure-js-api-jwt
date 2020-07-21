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
    res.send([{fName: "Deeksha", lastName: "Sharma"}, {fName: "Amy", lastName: "Robinson"}]);
});

app.get('/books', (req, res) => {
    res.send({bookCollection: books})
});

const books = [
    {
        id: "1234455jeler",
        name: "Surrounded by idiots",
        author: "Thomas Erikson"
    },
    {
        id: "68324jkfhe",
        name: "Stillness is the key",
        author: "Ryan Holiday"
    },
    {
        id: "7943854kejer",
        name: "Sapiens:A Brief History of Humankind",
        author: "Yuval Noah Harari"
    },
    {
        id: "5467364754dfjk",
        name: "Principles for Success",
        author: "Ray Dalio"
    },

]