import React, { Component } from 'react';
import {ListGroup, ListGroupItem} from 'reactstrap';
import Badge from "reactstrap/es/Badge";
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

                <ListGroup>
                    <ListGroupItem className="list-group-item text-muted">Activity <i className="fa fa-dashboard fa-1x"></i></ListGroupItem>
                    <ListGroupItem className="justify-content-between"><span
                        className="pull-left"><strong>Repo count:</strong></span> <Badge>{repoCount}</Badge></ListGroupItem>
                    <ListGroupItem className="justify-content-between"><span
                        className="pull-left"><strong>Languages:</strong></span> {languages}</ListGroupItem>
                </ListGroup>
            </React.Fragment>
        )
    }
}

export default GitProfile;