import React, {Component} from 'react';
import CalTodo from './caltodo';

export default class AllFormat extends Component {
    render(){
        return <CalTodo todo={this.props.todo}/>
    }
}