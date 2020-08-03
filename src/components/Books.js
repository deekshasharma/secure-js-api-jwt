import React, {useState, useEffect} from 'react';
import {Grid, Typography, Paper, Button} from '@material-ui/core';
import '../styles.css';
import {AppHeader} from "../AppHeader";

//TODO: Redirect to Login page when status code is not HTTP 200
export const Books = ({onAddFavorite}) => {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        getDataFromBackend("/books")
            .then(response => {
                if (response.status !== 200) {
                    console.log("Login Again");
                    setBooks([]);
                } else {
                    const allBooks = response.books;
                    setBooks([...allBooks])
                }
            });
    }, []);

    const getDataFromBackend = async (url) => {
        const response = await fetch(url);
        return await response.json();
    };

    return <>
        <AppHeader/>
        <Grid container className="Content">
            {books.map((book, key) => {
                return <Book key={key} name={book.name} id={book.id} author={book.author} color={book.color}
                             onClick={onAddFavorite}/>
            })}
        </Grid>
    </>
};

const Book = ({name, id, author, onClick}) => {
    return <Paper elevation={2} className="Book">
        <Grid container direction="column">
            <Grid item xs={12}>
                <Typography variant="h6">{name}</Typography>
            </Grid>
            <Typography variant="subtitle1" gutterBottom>{author}</Typography>
            <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => onClick(id)}
            >
                ADD TO FAVORITES
            </Button>
        </Grid>
    </Paper>
};