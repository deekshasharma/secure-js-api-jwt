import React from 'react';
import {Grid, Typography, TextField, Button} from '@material-ui/core';


export const Home = ({onClickLogin}) => {
    return <Grid container direction="column" alignItems="center" style={{marginTop: "10vh"}}>
        <Grid item style={{marginBottom: "10vh"}}>
            <Typography variant="h3">Welcome to Bookie!
                <span role="img" aria-label="books">📚</span>
            </Typography>
        </Grid>
        <Grid item style={{marginBottom: "5vh"}}>
            <TextField label="username"/>
        </Grid>
        <Grid item style={{marginBottom: "7vh"}}>
            <TextField label="password" type="password"/>
        </Grid>
        <Grid item>
            <Button variant="contained" size="large" color="primary" onClick={onClickLogin}>LOGIN</Button>
        </Grid>
    </Grid>
};