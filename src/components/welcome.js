import React, { Component } from 'react';
import gitLogo from "../gitLogo.svg";
import bitbucketLogo from "../bitbucketLogo.svg";
import {Link} from "react-router-dom";
import {Grid, Row, Col, Clearfix} from 'react-bootstrap';

class Welcome extends Component {

    render() {
        return (
            <React.Fragment>
                <Grid>
                    <h1>Welcome on GitAPI!</h1>
                    <Row className="show-grid">
                        <Col sm={6}>
                            <Link to="/github">
                                <img id="git-logo" src={gitLogo} className="App-logo" alt="logo"/>
                                <p>GitHub</p>
                            </Link>
                        </Col>
                        <Col sm={6}>
                            <Link to="/github">
                                <img id="bitbucket-logo" src={bitbucketLogo} className="App-logo" alt="logo"/>
                                <p>Bitbucket</p>
                            </Link>
                        </Col>
                    </Row>
                </Grid>
            </React.Fragment>

        )
    }
}

export default Welcome;