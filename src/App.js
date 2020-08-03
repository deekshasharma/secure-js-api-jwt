import React from 'react';
import './styles.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Login} from "./components/Login";
import {Books} from "./components/Books";
import {Users} from "./components/Users";
import {AddBook} from "./components/AddBook";
import {MyFavorite} from "./components/MyFavorite";

//TODO: Token verification should be done
//TODO: Home/Login page should not have the Tab Menu. Make sure "/" gets routed to the Home Page

export default function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/books">
                        <Books/>
                    </Route>
                    <Route exact path="/users">
                        <Users/>
                    </Route>
                    <Route exact path="/favorite">
                        <MyFavorite/>
                    </Route>
                    <Route exact path="/book">
                        <AddBook/>
                    </Route>
                    <Route path="/">
                        <Login/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

//TODO: Removed the dead code

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

export const getDataFromBackend = async (url) => {
    const response = await fetch(url);
    return await response.json();
};