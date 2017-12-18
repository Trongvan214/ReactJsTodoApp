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
        if(this.props.format !== "dateless") return null;
        if(this.state.todo.length === 0) return <h1>Nothing</h1>;
        return <CalTodo todo={this.state.todo} />
    }
} 