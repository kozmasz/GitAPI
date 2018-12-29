import React, { Component } from 'react';
import './App.css';
import SearchRepoForm from './components/github/SearchRepoForm';

class App extends Component {

  render() {

    return (
        <div className="App">
            <header className="App-header">
                <SearchRepoForm/>
            </header>
        </div>
    );
  }
}

export default App;
