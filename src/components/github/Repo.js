import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { Card, Button, CardHeader, CardFooter, CardBody, CardTitle, CardText } from 'reactstrap';

class Repo extends Component{
    render() {
        const {repo} = this.props;

        return (
            <Card>
                <CardHeader>{repo.name} - {repo.language}</CardHeader>
                <CardBody>
                    <CardTitle>Clone URL</CardTitle>
                    <CardText>{repo.clone_url}</CardText>
                    <Link to={"/github/" + repo.owner.login + "/" + repo.name + "/branches/master"}>
                        <Button color="primary" size="lg">Details</Button>
                    </Link>
                </CardBody>
                <CardFooter>{repo.updated_at}</CardFooter>
            </Card>
        )
    }
}

export default Repo;