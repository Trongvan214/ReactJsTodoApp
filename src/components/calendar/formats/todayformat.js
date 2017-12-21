import React, {Component} from 'react';
import CalTodo from './caltodo';
import './todayformat.css';

export default class TodayFormat extends Component {
    constructor(props){
        super(props);
        this.state = {
            todo: [],
        }
        this.getUTCTime = this.props.utcFunction;
        this.todayTodo = this.todayTodo.bind(this);
    }
    componentWillMount(){
        let sorted = this.todayTodo(this.props.todo)
        this.setState({
            todo: sorted,
        });
    }
    todayTodo = (a) => {
        let c = new Date();
        let w = new Date(c.getFullYear(),c.getMonth(),c.getDate()).getTime();
        let d = new Date(c.getFullYear(),c.getMonth(),c.getDate()+1).getTime();
        let todayTodo = a.filter((v,i)=>{
            let time = this.getUTCTime(v);
            return w<=time&&time<=d;
        });
        return todayTodo;
    }
    render(){
       return <CalTodo todo={this.state.todo} />
    }   
}