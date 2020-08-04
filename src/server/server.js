const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(cors());
app.use(express.json());


app.get('/users', (req, res) => {});

app.get('/books', (req, res) => {});

app.post('/login', (req, res) => {});

app.get('/logout', (req, res) => {});

app.get('/favorite', (req, res) => {});

app.post('/book', (req, res) => {});

