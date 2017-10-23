import React, {Component} from 'react';

export default class Delete extends Component {
    render(){
        return(
            <span className="delete" onClick={this.props.onClick}>Delete</span>
        )
    }
}