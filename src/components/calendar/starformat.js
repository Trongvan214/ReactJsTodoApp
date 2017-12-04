import React, {Component} from 'react';
import CalTodo from './caltodo';

export default class StarFormat extends Component {
    constructor(props){
        super(props);
        this.state = {
            todo: [],
        }
        this.starTodo = this.starTodo.bind(this);
    }
    componentWillMount(){
        let sorted = this.starTodo(this.props.todo);
        this.setState({
            todo: sorted,
        })
    }
    starTodo(a){
        let starSort =  a.filter((v,i)=>{
            return v.star===true;
        });
        //return sorted in order
        return starSort;
    }
    render(){
        return <CalTodo todo={this.state.todo} />
    }
}