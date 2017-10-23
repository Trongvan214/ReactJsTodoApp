import React, {Component} from 'react';

export default class Edit extends Component {
    //remember to add class trick
    //styles
    render(){
        let styles = {
            "display": "none"
        }
        return (
            <span style={styles} onClick={this.props.onClick}>Edit</span>
        );
    }
}