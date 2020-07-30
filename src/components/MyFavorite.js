import React from 'react';
import {Grid, Paper, Typography} from '@material-ui/core';
import '../styles.css';

export const MyFavorite = ({books}) => {
    return <Grid container direction="column" alignItems="center" className="Content">
        <Grid item style={{marginBottom: "5vh"}}>
            <Typography variant="h3" gutterBottom>Your Favorite Books!
                <span role="img" aria-label="books">👍</span>
            </Typography>
        </Grid>
        <Grid item>
            {books.map((book, key) => {
                return <Paper key={key} elevation={2} className="Book">
                    <Grid container direction="column">
                        <Grid item xs={12}>
                            <Typography variant="h6">{book.name}</Typography>
                        </Grid>
                        <Typography variant="subtitle1" gutterBottom>{book.author}</Typography>
                    </Grid>
                </Paper>
            })}
        </Grid>
    </Grid>
};
