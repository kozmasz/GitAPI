import React, { Component } from 'react';
import logo from "../../gitLogo.svg";
import GitHubAPI from '../../api/github';

class SearchRepoForm extends Component {

    // state = { repos: [] }

    gitLogoTag = () => {
        return document.getElementById('git-logo');
    }

    getRepos = event => {
        event.preventDefault();
        const userName = event.target[0].value;
        this.gitLogoTag().className='App-logo-2';
        GitHubAPI.get('/users/' + userName + '/repos')
            .then(res => {
                // state.repos = res.data;
                console.log(res.data);
                this.gitLogoTag().className='App-logo';
            })
            .catch(err => {
                console.log(err.response);
                this.gitLogoTag().className = 'App-logo';
            });
    }

    render() {
        return (
            <React.Fragment>
                <img id="git-logo" src={logo} className="App-logo" alt="logo"/>
                <p>GitHub</p>

                <form onSubmit={this.getRepos}>
                    <div className="form-group">
                        <label htmlFor="userName">User name:</label>
                        <input className="form-control" id="userName" placeholder="Enter username"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </React.Fragment>
        )
    }
}

export default SearchRepoForm;