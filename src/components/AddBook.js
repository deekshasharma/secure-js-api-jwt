import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Snackbar,
} from "@material-ui/core";
import "../styles.css";
import { AppHeader } from "./AppHeader";

export const AddBook = () => {
  const [book, setBookName] = useState("");
  const [author, setAuthorName] = useState("");
  const [bookAdded, setBookAdded] = useState(false);

  const onChangeBookName = (book) => setBookName(book);
  const onChangeAuthorName = (author) => setAuthorName(author);
  const onClick = () => {
    setBookAdded(true);
    setBookName("");
    setAuthorName("");
  };

  const handleClose = () => setBookAdded(false);

  return (
    <div className="AddBook">
      <AppHeader tabValue={2} />
      <Grid container direction="column" alignItems="center">
        <Grid item style={{ marginBottom: "5vh" }}>
          <Typography variant="h3" gutterBottom>
            Add New Book!
            <span role="img" aria-label="books">
              📘
            </span>
          </Typography>
        </Grid>
        <Grid item style={{ marginBottom: "5vh" }}>
          <TextField
            id="bookname-input"
            variant="outlined"
            label="book"
            value={book}
            onChange={(e) => onChangeBookName(e.target.value)}
          />
        </Grid>
        <Grid item style={{ marginBottom: "5vh" }}>
          <TextField
            id="authorname-input"
            variant="outlined"
            label="author"
            value={author}
            onChange={(e) => onChangeAuthorName(e.target.value)}
          />
        </Grid>
        <Grid item style={{ marginBottom: "7vh" }}>
          <Button
            aria-label="login"
            variant="contained"
            size="large"
            color="primary"
            onClick={onClick}
          >
            ADD BOOK
          </Button>
        </Grid>
        <Grid>
          <Snackbar
            open={bookAdded}
            message="The book is added!"
            autoHideDuration={2000}
            onClose={handleClose}
          />
        </Grid>
      </Grid>
    </div>
  );
};
