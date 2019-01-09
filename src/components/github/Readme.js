import React, { Component } from 'react';
const ReactMarkdown = require('react-markdown')

class Readme extends Component{

    render() {
        const {content,name} = this.props;
        const decodedContent = decodeURIComponent(escape(window.atob( content )));
        return (
            <div id='readme'>
                <h1>{name}</h1>
                <ReactMarkdown source={decodedContent} />
            </div>
        )
    }
}

export default Readme;