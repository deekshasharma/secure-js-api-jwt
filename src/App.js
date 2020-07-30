import React, {useState, useEffect} from 'react';
import './styles.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Home} from "./components/Home";
import {Books} from "./components/Books";
import {Users} from "./components/Users";
import {AddBook} from "./components/AddBook";
import {MyFavorite} from "./components/MyFavorite";

//TODO: Token verification should be done

export default function App() {
    const [showLoginErr, setLoginError] = useState(false);

    //TODO: For incorrect username and password, showLoginErr should be set to true
    function onClickLogin(username, password) {
        console.log(username);
        console.log(password);
    };

    function onAddFavorite(bookId) {
        console.log("Favorite book added ", bookId);
    }

    function onAddNewBook(name, author) {
        console.log("Adding "+name+ " by "+ author);
    };

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/books">
                        <Books onAddFavorite={onAddFavorite}/>
                    </Route>
                    <Route path="/users">
                        <Users/>
                    </Route>
                    <Route exact path="/favorite">
                        <MyFavorite books={books}/>
                    </Route>
                    <Route exact path="/book">
                        <AddBook onAddBook={onAddNewBook}/>
                    </Route>
                    <Route path="/">
                        <Home onClickLogin={onClickLogin} showLoginErr={showLoginErr}/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

const books = [
    {
        "name": "Surrounded by idiots",
        "author": "Thomas Erikson",
    },
    {
        "name": "The Tipping Point",
        "author": "Malcolm Gladwell",
    },
    {
        "name": "Stillness is the key",
        "author": "Ryan Holiday",
    }
]

// function Books() {
//     const [collection, setCollection] = useState([]);
//     useEffect(() => {
//         getDataFromBackend("http://localhost:5000/books")
//             .then(result => {
//                 const allBooks = result.bookCollection;
//                 setCollection([...allBooks])
//             });
//
//     }, []);
//     return <div>
//         {collection.map((book, key) => {
//             return <h2 key={key}>
//                 {book.name} by {book.author}
//             </h2>
//         })}
//     </div>;
// }


// function Users() {
//     const [users, setUsers] = useState([]);
//     useEffect(() => {
//         getDataFromBackend("http://localhost:5000/users")
//             .then(result => setUsers([...result]));
//     }, []);
//
//     return <div>
//         {users.map((user, key) => {
//             return <h2 key={key}>
//                 {user.fName + " " + user.lastName}
//             </h2>
//         })}
//     </div>
// }

//TODO: URL should not be hard coded
// function MyFavorite() {
//     const [favBooks, setFavBooks] = useState([]);
//
//     useEffect(() => {
//         getDataFromBackend("http://localhost:5000/favorite/f2775f38-92fc-42e5-98a5-b137a0887a40")
//             .then(result => setFavBooks(result.favorites));
//     }, []);
//
//     return <div>
//         <h1>YOUR FAVORITE BOOKS</h1>
//         {favBooks.map((book, key) => {
//             return <h3 key={key}>
//                 {book.name + " by " + book.author}
//             </h3>
//         })}
//     </div>
// }

export const getDataFromBackend = async (endpoint) => {
    const response = await fetch(endpoint);
    return await response.json();
};