import React, { Component } from 'react';
import file from "../../file.svg";

class File extends Component{

    render() {

        const {elem} = this.props;
        return (
            <div className="line">
                <img className="tree-icon" src={file}/><span>{elem.path}</span><span className="float-right">{elem.size} B</span>
            </div>
        )
    }
}

export default File;