import React, {useState, useEffect} from 'react';
import {Grid, Typography, Paper, Button} from '@material-ui/core';
import '../styles.css';
import {AppHeader} from "../AppHeader";
import {getDataFromBackend} from "./util";
import {useHistory} from "react-router-dom";

//TODO: Redirect to Login page when status code is not HTTP 200
export const Books = ({onAddFavorite}) => {
    const [books, setBooks] = useState([]);

    let history = useHistory();

    useEffect(() => {
        getDataFromBackend("/books")
            .then(result => {
                if (result instanceof Error) history.push("/login");
                else {
                    const allBooks = result.books;
                    setBooks([...allBooks])
                }
            });
    }, []);

    return <div className="Content">
        <AppHeader tabValue={0}/>
        <Grid container justify="center" alignItems="center" direction="column">
            <Grid item style={{marginBottom: "5vh"}}>
                <Typography variant="h3" gutterBottom>Curated Books!
                    <span role="img" aria-label="books">📚</span>
                </Typography>
            </Grid>
            <Grid item container justify="center">
                {books.map((book, key) => {
                    return <Book key={key} name={book.name} id={book.id} author={book.author} color={book.color}
                                 onClick={onAddFavorite}/>
                })}
            </Grid>
        </Grid>
    </div>
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