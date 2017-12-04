import React, {Component} from 'react';
import CalTodo from './caltodo';

export default class AllFormat extends Component {
    render(){
        if(this.props.format !== "all") return null;
        return <CalTodo todo={this.props.todo}/>
    }
}