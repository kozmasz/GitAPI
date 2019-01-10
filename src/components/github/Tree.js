import React, { Component } from 'react';
import GitHubAPI from "../../api/githubAPI";
import gitLogo from "../../gitLogo.svg";
import File from '../../components/github/File'
import Dir from '../../components/github/Dir'
import { Row, Col } from "reactstrap";
import FileOpener from "./FileOpener";

class Tree extends Component{

    constructor(props) {
        super(props);
        const a = document.createElement('a');
        a.href = props.rootUrl;
        this.state = { path: a.pathname,
            rootPath: a.pathname,
            pathes: [],
            tree: {tree: []},
            isLoading: false,
            error: null,
            file: null}
    }

    componentDidMount() {
        this.getTree();
    }

    getTree = () => {
        this.setState({tree: {tree: []}, error: null, isLoading: true});
        if (this.state.path.indexOf('undefined') === -1) {
            GitHubAPI.get(this.state.path)
                .then(res => {
                    res.data.tree.sort(this.compare);
                    this.setState({tree: res.data, isLoading: false});
                })
                .catch(error => {
                    this.setState({error, isLoading: false})
                });
        } else {
            this.setState({isLoading: false})
        }
    }

    compare = (a,b) => {
        if (a.type > b.type)
            return -1;
        if (a.type < b.type)
            return 1;
        return 0;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.path !== this.state.path) {
            this.getTree();
        }
    }

    openDir = (pathname) => {
        this.setState({path: pathname, pathes: [...this.state.pathes, pathname]});
    }

    closeDir = () => {
        this.state.pathes.pop();
        this.setState({path: (this.state.pathes[this.state.pathes.length-1] || this.state.rootPath)});
    }

    openFile = (file) => {
        this.setState({file: file});
    }

    closeFile = () => {
        this.setState({file: null});
    }

    render() {

        const {tree, isLoading, error} = this.state;
        const self = this;

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

        const treeDom = tree.tree.map(function (elem) {
            const path = document.createElement('a');
            path.href = elem.url;

            const {FileComponent, handlerFunction} = elem.type === 'tree'
                ? {FileComponent: Dir, handlerFunction: () => self.openDir(path.pathname)}
                : {FileComponent: File, handlerFunction: () => self.openFile(elem)};


            return (
                <div key={elem.path}>
                    <a href='#' onClick={handlerFunction}><FileComponent elem={elem}/></a>
                </div>)
        })

        return (
            <div>
                {self.state.file
                    ? <div>
                        <Row>
                            <Col lg={12} className="table-list-cell line">
                                <strong><span>{this.state.file.path}</span></strong>
                                <button className="btn btn-primary pull-right" onClick={self.closeFile} type="button"><i className="fa fa-close"></i></button>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12} className="table-list-cell line">
                                <FileOpener url={self.state.file.url}/>
                            </Col>
                        </Row>
                      </div>
                    : <div>
                        <a href='#' onClick={self.closeDir}>
                            <div className="line">
                                <span>..</span>
                            </div>
                        </a>
                        {treeDom}
                    </div>}
            </div>
        )
    }
}

export default Tree;