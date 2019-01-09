import React, { Component } from 'react';
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";

class Commit extends Component{

    constructor(props) {
        super(props);
        this.commit = this.props.commit;
        this.parent = this.props.commit.parents[0];
    }

    date = () => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let date = new Date(this.commit.commit.committer.date);
        let current_date = new Date();
        let dateString = date.getDay() + " " + months[date.getMonth()];
        return date.getFullYear() === current_date.getFullYear() ? dateString : dateString + " " + date.getFullYear();

    }

    render() {
        return (
            <Row>
                <Col sm={12} className="table-list-cell">
                    <strong>{this.commit.commit.message}</strong> - {this.commit.sha}
                    <br/>
                    {this.commit.commit.committer.name} commited on {this.date()}
                    {this.parent && <button className="btn btn-primary dim pull-right" type="button"><i className="fa fa-code"></i></button>}
                </Col>
            </Row>
        )
    }
}

export default Commit;