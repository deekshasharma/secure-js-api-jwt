import React from 'react';
import './styles.css';
import {AppBar, Tab, Tabs} from "@material-ui/core";
import {BrowserRouter as Router, useHistory} from "react-router-dom";


export const AppHeader = () => {
    const tabs = ["/books", "/favorite", "/book", "/users"];
    let history = useHistory();
    function handleClick(urlIndex) {
        history.push(tabs[urlIndex])
    }

    return <div>
        <Router>
            <AppBar position="fixed">
                <Tabs value="/books">
                    <Tab label="Books"
                         value="/books"
                         onClick={() => handleClick(0)}
                    />
                    <Tab label="Favorite"
                         value="/favorite"
                         onClick={() => handleClick(1)}
                         to={tabs[1]}
                    />
                    <Tab label="Add Book"
                         value="/book"
                         onClick={() => handleClick(2)}
                    />
                    <Tab label="Users"
                         value="/users"
                         onClick={() => handleClick(3)}
                    />
                </Tabs>
            </AppBar>
        </Router>
    </div>
};