import React, { Component } from 'react';
import GitHubAPI from "../../api/github";
import gitLogo from "../../gitLogo.svg";
import File from '../../components/github/File'
import Dir from '../../components/github/Dir'
import {sortBy} from 'sugar'

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
            error: null }
    }

    componentDidMount() {
        this.getTree();
    }

    getTree = () => {
        this.setState({tree: {tree: []}, error: null, isLoading: true});
        GitHubAPI.get(this.state.path)
            .then(res => {
                res.data.tree.sort(this.compare);
                this.setState({tree: res.data, isLoading: false});
                console.log(res.data.tree)
            })
            .catch(error => {
                this.setState({error, isLoading: false})
            });
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

    openFile = (pathname) => {
        console.log('File')
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
            const {FileComponent, handlerFunction} = elem.type == 'tree' ? {FileComponent: Dir, handlerFunction: self.openDir} : {FileComponent: File, handlerFunction: self.openFile};
            const path = document.createElement('a');
            path.href = elem.url;

            return (
                <div key={elem.path}>
                    <a href='#' onClick={() => handlerFunction(path.pathname)}><FileComponent elem={elem}/></a>
                </div>)
        })

        return (
            <div className="branch">
                <a href='#' onClick={self.closeDir}>
                    <div className="line">
                        <span>..</span>
                    </div>
                </a>
                {treeDom}
            </div>
        )
    }
}

export default Tree;