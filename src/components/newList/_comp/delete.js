import React, {Component} from 'react';

export default class Delete extends Component {
    //rememeber to add styles here 
    //remember to use add class trick here
    render(){
            return <span className="delete" onClick={this.props.onClick} ref="deleteTodo">&#10006;</span>;
    }
}