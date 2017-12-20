import React, {Component} from 'react';
import CalTodo from './caltodo';

export default class DateLessFormat extends Component {
    constructor(props){
        super(props);
        this.state = {
            todo: [],
        }
    }
    componentWillMount(){
        this.setState({
            todo: this.props.sortedTodo,
        })
    }
    render(){
        return <CalTodo todo={this.state.todo} />
    }
} 