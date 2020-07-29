import React from 'react';
import {Grid, Typography, Avatar} from '@material-ui/core';
import '../styles.css';

export const Users = () => {
    return <Grid container className="Books" justify="center">
        <Grid item xs={5}>
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
};

const User = ({firstName, lastName, userName, role}) => {
    return <Grid container direction="column" alignItems="center"
                 style={{border: "2px solid gray", padding: "1em", marginBottom: "2em", borderRadius: "10px"}}>
        <Grid item xs={12}>
            <Grid container justify="space-between" alignItems="center" style={{padding: "1em"}}>
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
        "key": "$2b$10$ph9/OK1lN/.9KzkeGKGPK.bxOkqJ2b9A2AqH/5iPkS7dmqAnUn.vi",
        "firstName": "Deeksha",
        "lastName": "Sharma",
        "favorite": ["6cc12b5e-cb5e-11ea-87d0-0242ac130003", "765384e6-cb5e-11ea-87d0-0242ac130003"],
        "role": "member"
    },
    {
        "id": "677c96e2-cb5e-11ea-87d0-0242ac130003",
        "firstName": "Amy",
        "username": "zenmade23",
        "key": "$2b$10$ruGV.xw6P0zuPUa0vt694eLO5LwckcxFZ1NfzdzDQKF12E2240vZy",
        "lastName": "Robinson",
        "favorite": ["722f584a-cb5e-11ea-87d0-0242ac130003"],
        "role": "admin"
    },
];