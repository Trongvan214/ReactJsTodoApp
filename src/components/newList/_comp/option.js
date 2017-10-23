import React, {Component} from 'react';

export default class Option extends Component {
    //first to be visble
    render(){
        return (
            <span className="options" onClick={this.props.onClick}>...</span>
        );
    }
}