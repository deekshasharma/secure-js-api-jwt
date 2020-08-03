import React, {useState} from 'react';
import {Grid, Typography, TextField, Button} from '@material-ui/core';
import {useHistory} from "react-router-dom";

let headers = new Headers();
let base64 = require('base-64');

export const Login = ({showLoginErr}) => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const onChangeUsername = (username) => setUserName(username);
    const onChangePassword = (pass) => setPassword(pass);
    let history = useHistory();

    const onClickLogin = () => {
        headers.set('Authorization', 'Basic ' + base64.encode(username + ":" + password));
        fetch("/login", {headers: headers, method: 'POST'})
            .then(res => res.json())
            .then(() => history.push("/books"))
    };


    return <Grid container direction="column" alignItems="center" style={{marginTop: "10vh"}}>
        <Grid item style={{marginBottom: "10vh"}}>
            <Typography variant="h3">Welcome to Bookie!
                <span role="img" aria-label="books">📚</span>
            </Typography>
        </Grid>
        <Grid item style={{marginBottom: "5vh"}}>
            <TextField id="username-input" label="username" value={username}
                       onChange={e => onChangeUsername(e.target.value)}/>
        </Grid>
        <Grid item style={{marginBottom: "7vh"}}>
            <TextField id="password-input" label="password" type="password" value={password}
                       onChange={e => onChangePassword(e.target.value)}/>
        </Grid>
        <Grid item style={{marginBottom: "7vh"}}>
            <Button aria-label="login" variant="contained" size="large" color="primary"
                    onClick={onClickLogin}>LOGIN</Button>
        </Grid>

        {showLoginErr && <Grid item>
            <Typography color="error" variant="body2"> Either username or password is incorrect. Try again!</Typography>
        </Grid>}
    </Grid>
};