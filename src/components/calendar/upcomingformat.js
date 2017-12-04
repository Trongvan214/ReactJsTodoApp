import React, {Component} from 'react';
import CalTodo from './caltodo';

export default class UpcomingFormat extends Component {
    constructor(props){
        super(props);
        this.state = {
            todo: [],
        }
        this.getUTCTime = this.props.utcFunction;
        this.upcomingTodo = this.upcomingTodo.bind(this);
    }
    componentWillMount(){
        let sorted = this.upcomingTodo(this.props.todo);
        this.setState({
            todo: sorted,
        })
    }
    upcomingTodo(a){
        let c = new Date();
        let d = new Date(c.getFullYear(),c.getMonth(),c.getDate()+7).getTime();
        let upcomingTodo = a.filter((v,i)=>{
            let time = this.getUTCTime(v);
            return d<=time;
        });
        return upcomingTodo;
    }
    render(){
        if(this.props.format !== "upcoming") return null;
        return <CalTodo todo={this.state.todo} />
    }
}