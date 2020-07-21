import React, {useState, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";


export default function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/books">
                        <Books/>
                    </Route>
                    <Route path="/users">
                        <Users/>
                    </Route>
                    <Route exact path="/favorite/:id">
                        <MyFavorite/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

function Home() {
    return <h2>Welcome this is Home!</h2>;
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
            return <h2 key={key}>
                {user.fName + " " + user.lastName}
            </h2>
        })}
    </div>
}

function MyFavorite() {
    const [favBooks, setFavBooks] = useState([]);

    useEffect(() => {
        getDataFromBackend("http://localhost:5000/favorite/f2775f38-92fc-42e5-98a5-b137a0887a40")
            .then(result => setFavBooks(result.favorites));
    });

    return <div>
        <h1>YOUR FAVORITE BOOKS</h1>
        {favBooks.map((book, key) => {
            return <h3 key={key}>
                {book.name + " by " + book.author}
            </h3>
        })}
    </div>
}

export const getDataFromBackend = async (endpoint) => {
    const response = await fetch(endpoint);
    return await response.json();
};