import React, {useState, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";


export default function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/about">
            <About />
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



function About() {
  const [data, setData] = useState({aboutUs: ""});
  useEffect(() => {
    getDataFromBackend("http://localhost:5000/about")
        .then(result => setData({aboutUs: result.aboutUs}));

  }, []);
  return <h2>{data.aboutUs}</h2>;
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