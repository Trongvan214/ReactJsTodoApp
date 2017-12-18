import React, {Component} from 'react';
import CalTodo from './caltodo';

export default class AllFormat extends Component {
    render(){
        if(this.props.format !== "all") return null;
        if(this.props.todo.length === 0) return <h1>Nothing</h1>;
        return <CalTodo todo={this.props.todo}/>
    }
}