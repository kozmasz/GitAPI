import React, { Component } from 'react';
import dir from "../../dir.svg";


class Dir extends Component{

    render() {

        const {elem} = this.props;
        return (
            <div className="line">
                <img className="tree-icon" src={dir}/><span>&nbsp;{elem.path}</span>
            </div>
        )
    }
}

export default Dir;