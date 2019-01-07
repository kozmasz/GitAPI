import React, { Component } from 'react';

class GitProfile extends Component{

    render() {
        const {avatarUrl, repoCount, languages} = this.props;
        return (
            <React.Fragment>
                <div className="text-center">
                    <img src={avatarUrl} className="avatar img-circle img-thumbnail" alt="avatar"/>
                </div>

                <hr/>
                <br/>

                <ul className="list-group">
                    <li className="list-group-item text-muted">Activity <i
                        className="fa fa-dashboard fa-1x"></i></li>
                    <li className="list-group-item text-right"><span
                        className="pull-left"><strong>Repo count:</strong></span> {repoCount}
                    </li>
                    <li className="list-group-item text-right"><span
                        className="pull-left"><strong>Languages:</strong></span> {languages}
                    </li>
                </ul>
            </React.Fragment>
        )
    }
}

export default GitProfile;