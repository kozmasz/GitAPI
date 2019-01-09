import React, { Component } from 'react';
import file from "../../file.svg";

class File extends Component{

    bytesToSize = (bytes) => {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) return '0 Byte';
        let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    };

    render() {

        const {elem} = this.props;
        return (
            <div className="line">
                <img className="tree-icon" src={file} alt="File"/><span>{elem.path}</span><span className="float-right">{this.bytesToSize(elem.size)}</span>
            </div>
        )
    }
}

export default File;