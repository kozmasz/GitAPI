import React, { Component } from 'react';
import GitHubAPI from "../../api/github";
import gitLogo from "../../gitLogo.svg";
import Tree from "./Tree";
import Readme from "../../components/github/Readme"
import GitNavTabs from './GitNavTabs';

class Branch extends Component{

    constructor(props) {
        super(props);
        this.username = props.match.params.username;
        this.branch = props.match.params.branch;
        this.repo = props.match.params.repo;
        this.state = { branch: this.initBranch(),
            readme: {content: ''},
            isLoading: false,
            error: null }
    }

    initBranch = () => {
        return { commit: { commit: {tree: {}, committer: {} } } }
    }

    componentDidMount() {
        this.getBranch();
        this.getReadme();
    }

    getBranch = () => {
        this.setState({branch: this.initBranch(), error: null, isLoading: true});
        GitHubAPI.get('/repos/' + this.username + '/' + this.repo + '/branches/' + this.branch)
            .then(res => {
                this.setState({branch: res.data, isLoading: false});
                console.log(res.data)
            })
            .catch(error => {
                this.setState({error, isLoading: false})
            });
    }

    getReadme = () => {
        this.setState({readme: {content: ''}, error: null, isLoading: true});
        GitHubAPI.get('/repos/' + this.username + '/' + this.repo + '/readme')
            .then(res => {
                this.setState({readme: res.data, isLoading: false});
                console.log(res.data)
            })
            .catch(error => {
                this.setState({error, isLoading: false})
            });
    }

    render() {
        const {readme, branch, isLoading, error} = this.state;

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
            <div className="branch">
                <h1>{this.repo + ' - ' + this.branch}</h1>
                <div className="alert alert-info">
                    <strong>Current commit ID:</strong> {branch.commit.sha}
                    <br/>
                    <strong>Current commit message:</strong> {branch.commit.commit.message}
                    <br/>
                    <strong>Committer:</strong> {branch.commit.commit.committer.name}
                </div>
                <GitNavTabs/>
                <Readme content={readme.content} name={readme.name}/>
            </div>
        )
    }
}

export default Branch;