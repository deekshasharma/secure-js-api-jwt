import React, { useState, useEffect } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import "../styles.css";
import { AppHeader } from "./AppHeader";
import { useHistory } from "react-router-dom";
import { updateAppSettings } from "../util";
const url = "http://localhost:5000/favorite";

export const MyFavorite = () => {
  const [favBooks, setFavBooks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetch(url, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token") || "",
      },
    })
      .then((res) => {
        if (res.status === 401) {
          localStorage.clear();
          history.push("/login");
        } else return res.json();
      })
      .then((json) => {
        if (json) {
          updateAppSettings(json.token);
          setFavBooks([...json.favorites]);
        }
      });
  }, [history]);

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
