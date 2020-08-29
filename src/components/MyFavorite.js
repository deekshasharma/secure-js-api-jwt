import React, { useState, useEffect } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import "../styles.css";
import { AppHeader } from "./AppHeader";
import { useHistory } from "react-router-dom";

const url = "/favorite";
export const MyFavorite = () => {
  const [favBooks, setFavBooks] = useState([]);
  const history = useHistory();

  const redirect = () => {
    localStorage.clear();
    history.push("/login");
  };

  useEffect(() => {
    fetch(url)
      .then((res) => (res.status === 401 ? redirect() : res.json()))
      .then((json) =>
        json ? setFavBooks([...json.favorites]) : setFavBooks([])
      )
      .catch((err) =>
        console.log("Error getting favorite books ", err.message)
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Content">
      <AppHeader tabValue={1} />
      <Grid container direction="column" alignItems="center">
        <Grid item style={{ marginBottom: "5vh" }}>
          <Typography variant="h3" gutterBottom>
            Your Favorite Books!
            <span role="img" aria-label="books">
              👍
            </span>
          </Typography>
        </Grid>
        <Grid item>
          {favBooks.map((book, key) => {
            return (
              <Paper key={key} elevation={2} className="Book">
                <Grid container direction="column">
                  <Grid item xs={12}>
                    <Typography variant="h6">{book.name}</Typography>
                  </Grid>
                  <Typography variant="subtitle1" gutterBottom>
                    {book.author}
                  </Typography>
                </Grid>
              </Paper>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
};
