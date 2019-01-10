import React, { Component } from 'react';
import GitHubAPI from "../../api/githubAPI";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from 'react-syntax-highlighter/dist/styles/prism';

class FileOpener extends Component{

    constructor(props){
        super(props);
        const path = document.createElement('a');
        path.href = props.url;
        this.path = path.pathname;
        this.state = {file: { content: ''}};
    }

    componentDidMount() {
        this.getFile();
    }

    getFile = () => {
        this.setState({file: {content: ''}, error: null, isLoading: true});
        GitHubAPI.get(this.path)
            .then(res => {
                this.setState({file: res.data, isLoading: false});
            })
            .catch(error => {
                this.setState({error, isLoading: false})
            });
    }

    decodedContent = () => {
        return decodeURIComponent(escape(window.atob( this.state.file.content )));
    }

    render() {
        return (<SyntaxHighlighter language='javascript' style={dark} wrapLines={true}>{this.decodedContent()}</SyntaxHighlighter>)
    }
}

export default FileOpener;