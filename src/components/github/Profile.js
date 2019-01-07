import React, { Component } from 'react';
import GitHubAPI from "../../api/github";
import gitLogo from "../../gitLogo.svg";
import User from '../../components/github/User'
import RepoList from "./RepoList";

class Profile extends Component{


    constructor(props) {
      super(props);
      this.username = props.match.params.username;
      this.state = { repos: [], owner: {}, isLoading: false, error: null }
    }

    componentDidMount() {
        this.getRepos();
    }

    getRepos = () => {
        this.setState({repos: [], owner: {}, error: null, isLoading: true});
        GitHubAPI.get('/users/' + this.username + '/repos')
            .then(res => {
                this.setState({repos: res.data, owner: res.data[0] && res.data[0].owner, isLoading: false});
                console.log(res.data)
            })
            .catch(error => {
                this.setState({error, isLoading: false})
            });
    }

    title = () => {
        return this.state.owner.login + '(' + this.state.owner.type + ')';
    }

    languages = () => {
        const uniqLanguages = [];
        this.state.repos.forEach(function(repo) {
            if (repo.language && uniqLanguages.indexOf(repo.language) == -1){
                uniqLanguages.push(repo.language);
            }
        })
        return uniqLanguages.join();
    }

    render() {
        const {repos, owner, isLoading, error} = this.state;

        if (error){
            return <p>{error.message}</p>
        }

        if (isLoading){
            return (
                <div>
                    <img id="git-logo" src={gitLogo} className="App-logo-2" alt="logo"/>
                    <p>Loading...</p>
                </div>
            )
        }

        return (
                <div className="container bootstrap snippet">
                    <div className="row">
                        <div className="col-sm-3"><h1>{this.title()}</h1></div>

                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            <User avatarUrl={owner.avatar_url} repoCount={repos.length} languages={this.languages()}/>
                        </div>
                        <div className="col-sm-9 repositroies"><h1>Repositories</h1>
                            <RepoList repos={repos}/>
                        </div>
                    </div>
                </div>
        )
    }
}

export default Profile;