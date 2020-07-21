const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
var cors = require('cors')

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    res.send({ message: 'Welcome to our Home ' });
});

app.get('/users', (req, res) => {
    res.send([{fName: "Deeksha", lastName: "Sharma"}, {fName: "Amy", lastName: "Robinson"}]);
});

app.get('/about', (req, res) => {
    res.send({aboutUs: "We love to merge our technical skill set with a bit of creativity"})
});