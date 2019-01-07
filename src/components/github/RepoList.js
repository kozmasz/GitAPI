import React, { Component } from 'react';
import Repo from './Repo'

class RepoList extends Component{
    render() {
        const {repos} = this.props;
        const repoDom = repos.map(function (repo) {
            return (
                <div key={repo.id}>
                    <Repo repo={repo}/>
                    <br/>
                </div>)
        })
        return (
            repoDom
        )
    }
}

export default RepoList;