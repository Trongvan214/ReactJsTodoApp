import React, {Component} from 'react';

export default class Edit extends Component {
    //remember to add class trick
    //styles
    render() {
            return <span className="edit" onClick={this.props.onClick}>Edit</span>
    }
}