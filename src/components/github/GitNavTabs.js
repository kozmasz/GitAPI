import React, { Component } from 'react';
import {Tabs, Tab} from "react-bootstrap";
import Tree from "./Tree";

class GitNavTabs extends Component{
    constructor(props, context) {
        super(props, context);

        this.state = {
            key: 1
        };
    }

    handleSelect = (key) => {
        this.setState({ key });
    }

    render() {
        return (
            <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
                <Tab eventKey={1} title="Tab 1">
                    asd
                    {/*<Tree rootUrl={branch.commit.commit.tree.url}/>*/}
                </Tab>
                <Tab eventKey={2} title="Tab 2">
                    Tab 2 content
                </Tab>
            </Tabs>
        );
    }
}

export default GitNavTabs;