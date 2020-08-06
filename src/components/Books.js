import React from "react";
import { Button, Grid, Paper, Typography } from "@material-ui/core";
import "../styles.css";
import { AppHeader } from "./AppHeader";

export const Books = () => {
  return (
    <div className="Content">
      <AppHeader tabValue={0} />
      <Grid container justify="center" alignItems="center" direction="column">
        <Grid item style={{ marginBottom: "5vh" }}>
          <Typography variant="h3" gutterBottom>
            Curated Books!
            <span role="img" aria-label="books">
              📚
            </span>
          </Typography>
        </Grid>
        <Grid item container justify="center">
          {books.map((book, key) => {
            return (
              <Book
                key={key}
                name={book.name}
                id={book.id}
                author={book.author}
                color={book.color}
                onClick={() => console.log("My Favorite")}
              />
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
};

const Book = ({ name, id, author, onClick }) => {
  return (
    <Paper elevation={2} className="Book">
      <Grid container direction="column">
        <Grid item xs={12}>
          <Typography variant="h6">{name}</Typography>
        </Grid>
        <Typography variant="subtitle1" gutterBottom>
          {author}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => onClick(id)}
        >
          ADD TO FAVORITES
        </Button>
      </Grid>
    </Paper>
  );
};

const books = [
  {
    name: "Surrounded by idiots",
    author: "Thomas Erikson",
  },
  {
    name: "The Tipping Point",
    author: "Malcolm Gladwell",
  },
  {
    name: "Stillness is the key",
    author: "Ryan Holiday",
  },
  {
    name: "Being Mortal",
    author: "Atul Gawande",
  },
  {
    name: "Principles for Success",
    author: "Ray Dalio",
  },
  {
    id: "228877ef-e264-46a2-948f-5a28dd592322",
    name: "Digital Minimalism",
    author: "Cal Newport",
  },
  {
    id: "19a36fd2-9823-4498-9ea2-261c549d806d",
    name: "The 1% Rule",
    author: "Tommy Baker",
  },
  {
    id: "79ebfeb6-eff0-4ea8-b4fd-92ca7dcebac4",
    name: "Into Thin Air",
    author: "Jon Krakauer",
  },
  {
    id: "6e19e4e7-b86b-4255-8b7e-d84d12d49f16",
    name: "Thinking Fast and Slow",
    author: "Daniel Kahneman",
  },
  {
    id: "90c9a136-0b40-40bc-9c93-ab44befe21ad",
    name: "Company of One",
    author: "Paul Jarvis",
  },
  {
    id: "1e3ba4f8-6ef7-4065-9240-abb67fe616c6",
    name: "Motivation Manifesto",
    author: "Brendon Burchard",
  },
  {
    id: "445c3cbc-8cf9-41e1-be55-6508a6a5c374",
    name: "Disrupt You!",
    author: "Jay Samit",
  },
];
