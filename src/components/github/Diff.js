import React, { Component } from 'react';
import GitHubAPI from "../../api/github";
import {Diff2Html} from "diff2html";

class Diff extends Component{

    constructor(props) {
        super(props);
        this.username = props.match.params.username;
        this.repo = props.match.params.repo;
        this.parentSha = props.match.params.parentSha;
        this.currentSha = props.match.params.currentSha;
        this.state = {isLoading: false,
            diff: '',
            error: null}
    }

    componentDidMount() {
        this.getDiff();
    }

    getDiff = () => {
        this.setState({error: null, isLoading: true});
        GitHubAPI.get('/' + this.username + '/' + this.repo + '/compare/' + this.parentSha + '...' + this.currentSha + '.diff')
            .then(res => {
                this.setState({diff: res.data, isLoading: false});
            })
            .catch(error => {
                this.setState({error, isLoading: false})
            });
    }

    render() {
        const diffHtml = Diff2Html.getPrettyHtml(this.state.diff, {inputFormat: 'diff', showFiles: true, matching: 'lines', outputFormat: 'line-by-line'});
        return (
            <div className="content" dangerouslySetInnerHTML={{__html: diffHtml}}></div>
        )
    }
}

export default Diff;