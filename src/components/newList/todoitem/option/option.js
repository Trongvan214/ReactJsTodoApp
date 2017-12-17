import React, {Component} from 'react';

export default class Option extends Component {
    render(){
        return  <span className="option" onClick={this.props.onClick}></span>
    }
}