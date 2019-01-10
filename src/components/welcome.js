import React, { Component } from 'react';
import gitLogo from "../gitLogo.svg";
import bitbucketLogo from "../bitbucketLogo.svg";
import {Link} from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';

class Welcome extends Component {

    render() {

        return (
            <React.Fragment>
                <Container className='welcome'>
                    <h1>Welcome on GitAPI!</h1>
                    <Row>
                        <Col sm={{ size: 'auto' }}>
                            <Link to="/github">
                                <img id="git-logo" src={gitLogo} className="App-logo" alt="logo"/>
                                <p>GitHub</p>
                            </Link>
                        </Col>
                        <Col sm={{ size: 'auto' }}>
                            <Link to="/github">
                                <img id="bitbucket-logo" src={bitbucketLogo} className="App-logo" alt="logo"/>
                                <p>Bitbucket</p>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>

        )
    }
}

export default Welcome;