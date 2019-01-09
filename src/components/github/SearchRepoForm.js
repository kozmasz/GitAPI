import React, { Component } from 'react';
import logo from "../../gitLogo.svg";
import {Link} from "react-router-dom";
import {Form, FormGroup, Input, Row, Col, InputGroup, InputGroupAddon, Button} from 'reactstrap';

class SearchRepoForm extends Component {

    state = { username: null }

    setUsername = event => {
        this.setState({username: event.target.value});
    }

    render() {

        return (
            <React.Fragment>
                <img id="git-logo" src={logo} className="App-logo" alt="logo"/>
                <p>Your GitHub URL</p>
                <Form>
                    <FormGroup>
                        <Row>
                            <Col sm={3}></Col>
                            <Col sm={6}>
                                <InputGroup size="lg">
                                    <InputGroupAddon addonType="prepend">https://github.com/</InputGroupAddon>
                                    <Input type="text" onChange={this.setUsername} className="form-control" id="user-name" aria-describedby="inputGroup-sizing-lg" placeholder="username" />
                                </InputGroup>
                            </Col>
                        </Row>
                    </FormGroup>
                    <Link to={"/github/" + this.state.username}>
                        <Button color="primary" size="lg">Submit</Button>
                    </Link>
                </Form>
            </React.Fragment>
        )
    }
}

export default SearchRepoForm;