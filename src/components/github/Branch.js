import React, { Component } from 'react';
import GitHubAPI from "../../api/githubAPI";
import gitLogo from "../../gitLogo.svg";
import Readme from "../../components/github/Readme"
import classnames from 'classnames';
import Tree from "./Tree";
import CommitList from "./CommitList";
import {Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";

class Branch extends Component{

    constructor(props) {
        super(props);
        this.username = props.match.params.username;
        this.branch = props.match.params.branch;
        this.repo = props.match.params.repo;
        this.state = { branch: this.initBranch(),
            readme: {content: ''},
            isLoading: false,
            error: null,
            activeTab: '1'}
    }

    initBranch = () => {
        return { commit: { commit: {tree: {}, committer: {} } } }
    }

    componentDidMount() {
        this.getBranch();
        this.getReadme();
    }

    getBranch = () => {
        this.setState({branch: this.initBranch(), error: null, isLoading: true});
        GitHubAPI.get('/repos/' + this.username + '/' + this.repo + '/branches/' + this.branch)
            .then(res => {
                this.setState({branch: res.data, isLoading: false});
            })
            .catch(error => {
                this.setState({error, isLoading: false})
            });
    }

    getReadme = () => {
        this.setState({readme: {content: ''}, error: null, isLoading: true});
        GitHubAPI.get('/repos/' + this.username + '/' + this.repo + '/readme')
            .then(res => {
                this.setState({readme: res.data, isLoading: false});
            })
            .catch(error => {
                this.setState({error, isLoading: false})
            });
    }

    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        const {readme, branch, isLoading, error} = this.state;

        if (error){
            return <p>{error.message}</p>
        }

        if (isLoading){
            return (
                <div>
                    <img id="git-logo" src={gitLogo} className="App-logo-2" alt="logo"/>
                    <p>Loading...</p>
                </div>
            )
        }

        return (
            <div className="branch">
                <h1>{this.repo + ' - ' + this.branch}</h1>
                <div>
                    <Nav tabs>
                        <NavItem>
                            <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }}>
                                Files
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }}>
                                Commits
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <Row>
                                <Col sm="12">
                                    <Tree rootUrl={branch.commit.commit.tree.url}/>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <Col sm="12">
                                    <CommitList username={this.username} branch={this.branch} repo={this.repo}/>
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                </div>

                <Readme content={readme.content} name={readme.name}/>
            </div>
        )
    }
}

export default Branch;