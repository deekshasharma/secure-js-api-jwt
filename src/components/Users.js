import React, {useState, useEffect} from 'react';
import {Grid, Typography, Avatar} from '@material-ui/core';
import '../styles.css';
import {AppHeader} from "../AppHeader";
import {getDataFromBackend} from "./util";

//TODO: Redirect to Login page when status code is not HTTP 200
export const Users = () => {
    // const [users, setUsers] = useState([]);
    // useEffect(() => {
    //     getDataFromBackend("/users")
    //         .then(response => {
    //             if(response.status !== 200) setUsers([]);
    //             else setUsers([...response])
    //         });
    // }, []);
    return <div className="Content">
        <AppHeader tabValue={3}/>
        <Grid container justify="center" direction="column" alignItems="center">
            <Grid item style={{marginBottom: "5vh"}}>
                <Typography variant="h3" gutterBottom>Bookie Users!
                    <span role="img" aria-label="books">🤓🤠</span>
                </Typography>
            </Grid>
            <Grid item xs={4}>
                {users.map((user, key) => {
                    return <User key={key}
                                 userName={user.username}
                                 firstName={user.firstName}
                                 lastName={user.lastName}
                                 role={user.role}/>
                })
                }
            </Grid>
        </Grid>
    </div>
};

const User = ({firstName, lastName, userName, role}) => {
    return <Grid container direction="column" alignItems="center" className="User">
        <Grid item xs={12}>
            <Grid container justify="space-between" alignItems="center" style={{padding: "0.7em"}}>
                <Avatar style={{marginRight: "0.5em"}}>{firstName.charAt(0)}</Avatar>
                <Typography variant="body2" gutterBottom>{userName + " (" + role + ") "}</Typography>
            </Grid>
        </Grid>
        <Grid item>
            <Typography variant="h6" gutterBottom color="primary">{firstName + " " + lastName}</Typography>
        </Grid>
    </Grid>
};


const users = [
    {
        "id": "f2775f38-92fc-42e5-98a5-b137a0887a40",
        "username": "deeksha30",
        "firstName": "Deeksha",
        "lastName": "Sharma",
        "favorite": ["6cc12b5e-cb5e-11ea-87d0-0242ac130003", "765384e6-cb5e-11ea-87d0-0242ac130003"],
        "role": "member"
    },
    {
        "id": "677c96e2-cb5e-11ea-87d0-0242ac130003",
        "firstName": "Amy",
        "username": "zenmade23",
        "lastName": "Robinson",
        "favorite": ["722f584a-cb5e-11ea-87d0-0242ac130003"],
        "role": "admin"
    },
];