import React, { useState, useEffect } from "react";
import { Avatar, Grid, Typography } from "@material-ui/core";
import "../styles.css";
import { AppHeader } from "./AppHeader";
const url = "http://localhost:5000/users";

export const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => setUsers([...json.users]))
      .catch((err) => console.log("Error fetching users ", err.message));
  }, []);

  return (
    <div className="Content">
      <AppHeader tabValue={3} />
      <Grid container justify="center" direction="column" alignItems="center">
        <Grid item style={{ marginBottom: "5vh" }}>
          <Typography variant="h3" gutterBottom>
            Bookie Users!
            <span role="img" aria-label="books">
              🤓🤠
            </span>
          </Typography>
        </Grid>
        <Grid item xs={4}>
          {users.map((user, key) => {
            return (
              <User
                key={key}
                userName={user.username}
                firstName={user.firstName}
                lastName={user.lastName}
                role={user.role}
              />
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
};

const User = ({ firstName, lastName, userName, role }) => {
  return (
    <Grid container direction="column" alignItems="center" className="User">
      <Grid item xs={12}>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          style={{ padding: "0.7em" }}
        >
          <Avatar style={{ marginRight: "0.5em" }}>
            {firstName.charAt(0)}
          </Avatar>
          <Typography variant="body2" gutterBottom>
            {userName + " (" + role + ") "}
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="h6" gutterBottom color="primary">
          {firstName + " " + lastName}
        </Typography>
      </Grid>
    </Grid>
  );
};
