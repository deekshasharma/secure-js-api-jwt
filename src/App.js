import React, {useState} from 'react';
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
  getDataFromBackend("http://localhost:5000/about")
      .then(result => setData({aboutUs: result.aboutUs}));

  return <h2>{data.aboutUs}</h2>;
}

function Users() {
  return <h2>INFO</h2>;
}

export const getDataFromBackend = async(endpoint) => {
  const response = await fetch(endpoint);
  return await response.json();
};