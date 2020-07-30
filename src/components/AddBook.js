import React, {useState} from 'react';
import {Grid, Typography, Button, TextField} from '@material-ui/core';
import '../styles.css';

export const AddBook = ({onAddBook}) => {
    const [book, setBookName] = useState('');
    const [author, setAuthorName] = useState('');

    const onChangeBookName = (book) => setBookName(book);
    const onChangeAuthorName = (author) => setAuthorName(author);


    return <div className="AddBook">
        <Grid container direction="column" alignItems="center">
            <Grid item style={{marginBottom: "5vh"}}>
                <Typography variant="h3" gutterBottom>Add New Book!
                    <span role="img" aria-label="books">📘</span>
                </Typography>
            </Grid>
            <Grid item style={{marginBottom: "5vh"}}>
                <TextField id="bookname-input" variant="outlined"
                           label="book" value={book}
                           onChange={e => onChangeBookName(e.target.value)}/>
            </Grid>
            <Grid item style={{marginBottom: "5vh"}}>
                <TextField id="authorname-input" variant="outlined" label="author" value={author}
                           onChange={e => onChangeAuthorName(e.target.value)}/>
            </Grid>
            <Grid item style={{marginBottom: "7vh"}}>
                <Button aria-label="login" variant="contained" size="large" color="primary"
                        onClick={() => onAddBook(book, author)}>ADD BOOK</Button>
            </Grid>
        </Grid>
    </div>
};

