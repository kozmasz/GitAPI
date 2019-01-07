import React, { Component } from 'react';
import logo from "../../gitLogo.svg";
import {Link} from "react-router-dom";
import {FormGroup, FormControl, ControlLabel, Row, InputGroup} from 'react-bootstrap';
import Col from "react-bootstrap/es/Col";
// import InputGroupAddon from "react-bootstrap/es/InputGroupAddon";
// import InputGroupButton from "react-bootstrap/es/InputGroupButton";

class SearchRepoForm extends Component {

    state = { username: null }

    setUsername = event => {
        this.setState({username: event.target.value});
    }

    render() {

        return (
            <React.Fragment>
                <img id="git-logo" src={logo} className="App-logo" alt="logo"/>

                <form>
                    <FormGroup>
                        <ControlLabel>Your GitHub URL</ControlLabel>
                        <Row>
                            <Col lg={3}></Col>

                            {/*<InputGroup>*/}
                                {/*<InputGroup.Button>*/}
                                    {/*<Button>Before</Button>*/}
                                {/*</InputGroup.Button>*/}
                                {/*<FormControl type="text" />*/}
                            {/*</InputGroup>*/}

                            <div className="input-group input-group-lg col-lg-6">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon3"></span>
                                </div>
                                <input type="text" onChange={this.setUsername} className="form-control" id="user-name" aria-describedby="inputGroup-sizing-lg" placeholder="username"/>
                            </div>
                        </Row>
                    </FormGroup>
                    <Link to={"/github/" + this.state.username}>
                        <button type="submit" className="btn-lg btn-primary">Submit</button>
                    </Link>
                </form>
            </React.Fragment>
        )
    }
}

export default SearchRepoForm;