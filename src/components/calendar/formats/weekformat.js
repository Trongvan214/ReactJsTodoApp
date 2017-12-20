import React, {Component} from 'react';
import CalTodo from './caltodo';

export default class WeekFormat extends Component {
    constructor(props){
        super(props);
        this.state = {
            todo: [],
        }
        this.weekTodo = this.weekTodo.bind(this);
        this.getUTCTime = this.props.utcFunction;
    }
    componentWillMount(){
        let sorted = this.weekTodo(this.props.todo);
        this.setState({
            todo: sorted,
        })
    }
    weekTodo(a){
        let c = new Date();
        let w = new Date(c.getFullYear(),c.getMonth(),c.getDate()).getTime();
        let d = new Date(c.getFullYear(),c.getMonth(),c.getDate()+7).getTime();
        let weekTodo = a.filter((v,i)=>{
            let time = this.getUTCTime(v);
            return w<=time&&time<=d;
        });
        return weekTodo;
    }
    render(){
        return <CalTodo todo={this.state.todo} />
    }
}