import React, { Component } from 'react';
import './App.css';
import Welcome from "./components/welcome";
import Route from "react-router-dom/Route";
import SearchRepoForm from "./components/github/SearchRepoForm";
import Profile from "./components/github/Profile";
import {BrowserRouter as Router} from "react-router-dom";
import Branch from "./components/github/Branch";

class App extends Component {

  render() {

      return (

          <div className="App">
              <header className="App-header">
                  <Router>
                      <div>
                          <Route path="/" exact strict component={Welcome}/>
                          <Route path="/github" exact strict component={SearchRepoForm}/>
                          <Route path="/github/:username" exact strict component={Profile}/>
                          <Route path="/github/:username/:repo/branches/:branch" exact strict component={Branch}/>
                          {/*<Route path="/github/:username/:repo/trees/:sha" exact strict component={Tree}/>*/}
                      </div>
                  </Router>
              </header>
          </div>

      );
  }
}

export default App;
