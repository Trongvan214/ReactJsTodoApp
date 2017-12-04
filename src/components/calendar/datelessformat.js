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
    // datelessTodo(a){
    //     let arr = [];
    //     for(let i=0;i<a.length;i++){
    //         let time = this.getUTCTime(a[i]);
    //         if(time === 0){
    //             arr.push(a[i]);
    //         }
    //     }
    //     return arr;
    // }
    render(){
        if(this.props.format !== "dateless") return null;
        return <CalTodo todo={this.state.todo} />
    }
} 