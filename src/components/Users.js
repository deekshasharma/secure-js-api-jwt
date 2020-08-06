import React from "react";
import { Avatar, Grid, Typography } from "@material-ui/core";
import "../styles.css";
import { AppHeader } from "./AppHeader";

export const Users = () => {
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

const users = [
  {
    username: "deeksha30",
    firstName: "Deeksha",
    lastName: "Sharma",
    role: "member",
  },
  {
    firstName: "Amy",
    username: "zenmade23",
    lastName: "Robinson",
    role: "admin",
  },
];
