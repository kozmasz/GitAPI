import React, { Component } from 'react';
import GitHubAPI from "../../api/githubAPI";
import Commit from "./Commit";

class CommitList extends Component{

    constructor(props) {
        super(props);
        this.username = props.username;
        this.branch = props.branch;
        this.repo = props.repo;
        this.state = { commits: [], isLoading: false, error: null }
    }

    componentDidMount() {
        this.getCommits();
    }

    getCommits = () => {
        this.setState({commits: [], error: null, isLoading: true});
        GitHubAPI.get('/repos/' + this.username + '/' + this.repo + '/commits', { params: { sha: this.branch } })
            .then(res => {
                this.setState({commits: res.data, isLoading: false});
                console.log(res.data)
            })
            .catch(error => {
                this.setState({error, isLoading: false})
            });
    }

    render() {
        const {commits} = this.state;
        const self = this;
        const commitsDom = commits.map(function (commit) {
            return (
                <div key={commit.sha}>
                    <Commit username={self.username} repo={self.repo} commit={commit}/>
                </div>)
        })
        return (
            commitsDom
        )
    }
}

export default CommitList;