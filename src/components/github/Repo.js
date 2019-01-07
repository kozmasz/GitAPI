import React, { Component } from 'react';
import {Link} from "react-router-dom";

class Repo extends Component{
    render() {
        const {repo} = this.props;

        return (
            <div className="card text-center">
                <div className="card-header">
                    <div>{repo.name} - {repo.language}</div>
                </div>
                <div className="card-body">
                    <h5 className="card-title">Clone URL</h5>
                    <p className="card-text">{repo.clone_url}</p>
                    <Link to={"/github/" + repo.owner.login + "/" + repo.name + "/branches/master"}>
                        <button type="submit" className="btn-lg btn-primary">Details</button>
                    </Link>
                </div>
                <div className="card-footer text-muted">
                    {repo.updated_at}
                </div>
            </div>
        )
    }
}

export default Repo;