import React, {useState, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";


export default function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/books">
            <Books />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

function Home() {
  return <h2>INFO</h2>;
}



function Books() {
  const [collection, setCollection] = useState([]);
  useEffect(() => {
    getDataFromBackend("http://localhost:5000/books")
        .then(result => {
          const allBooks = result.bookCollection;
          setCollection([...allBooks])
        });

  }, []);
  return <div>
    {collection.map((book, key) => {
      return <h2 key={key}>
        {book.name} by {book.author}
      </h2>
    })}
  </div>;
}




function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getDataFromBackend("http://localhost:5000/users")
        .then(result => setUsers([...result]));
  }, []);

  return <div>
  {users.map((user, key) => {
    return<h2 key={key}>
    {user.fName+ " "+ user.lastName}
    </h2>
  })}
  </div>
}

export const getDataFromBackend = async(endpoint) => {
  const response = await fetch(endpoint);
  return await response.json();
};