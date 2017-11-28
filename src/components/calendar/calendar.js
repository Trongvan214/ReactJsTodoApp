import React, {Component} from 'react';
// import CalBody from './_comp/calbody';
import BackToMenu from '.././backtomenu/backtomenu';
import SortMenu from './sortmenu';
import FormatMenu from './formatmenu';
import WeekFormat from './weekformat';
import TodayFormat from './todayformat';
import DateLessFormat from './datelessformat';
import CalTodo from './caltodo';
import './calendar.css';

export default class Calendar extends Component {
    constructor(props){
        super(props);
        this.state = {
            todoFormat: 'all',
            todo: [],
            formatActive: false,
        }
        this.todoSortChoice = this.todoSortChoice.bind(this);
        this.allTodo = this.allTodo.bind(this);
        this.datelessTodo = this.datelessTodo.bind(this);
        this.todayTodo = this.todayTodo.bind(this);
        this.weekTodo= this.weekTodo.bind(this);
        this.upcomingTodo = this.upcomingTodo.bind(this);
        // this.changeFullDateTime = this.changeFullDateTime.bind(this);
        this.formatActive = this.formatActive.bind(this);
    }
    componentWillUpdate(nextProps){
        //update the todo
        if(nextProps.show === "cal" && nextProps !== this.props){
            let parseTodo = JSON.parse(localStorage.getItem('todo')); 
            let sortedTodo = this.allTodo(parseTodo);
            this.setState({
                todo: sortedTodo,
            });
        }
    }
    //remember to figure how to update without setting up first
    componentWillMount(){    
        this.format = "";
        let parseTodo = JSON.parse(localStorage.getItem('todo')); 
        let sortedTodo = this.allTodo(parseTodo);
        this.setState({
            todo: sortedTodo,
        });
    }
    getUTCTime(obj){
        let arr = [];
        //merge the objects together
        let data = Object.assign({}, obj.edit.date, obj.edit.time);
        //delete the color object
        delete data.color;
        //if no time given than return 0
        if(Object.keys(data).length !== 0 && data.year){
            for(let prop in data){
                arr.push(data[prop]);
            }
            return new Date(...arr).getTime();
        }
        return 0;
    };
    allTodo(a){
        let temp, swap, currData, nextData, noTimeArr = [];
        do {
            swap = false;
            for(let i=0;i<a.length-1;i++){
                currData = this.getUTCTime(a[i]);
                nextData = this.getUTCTime(a[i+1]);
                //take out of array and put in timeless arr
                if(currData === 0){
                    noTimeArr.push(a[i]);
                    a.splice(i, 1);
                    swap = true;
                }
                //take out of array and in timeless arr
                else if(nextData === 0){
                    noTimeArr.push(a[i+1]);
                    a.splice(i+1, 1);
                    swap = true;
                }
                else if(currData > nextData){
                    temp = a[i];
                    a[i] = a[i+1];
                    a[i+1] = temp;
                    swap = true;
                }
            }
        } while(swap);
        return a.concat(noTimeArr);
    }
    datelessTodo(a){
        let arr = [];
        for(let i=0;i<a.length;i++){
            let time = this.getUTCTime(a[i]);
            if(time === 0){
                arr.push(a[i]);
            }
        }
        return arr;
    }
    starTodo(a){
        let starSort =  a.filter((v,i)=>{
            return v.star===true;
        });
        //return sorted in order
        return this.allTodo(starSort);
    }
    todayTodo(a){
        let c = new Date();
        let w = new Date(c.getFullYear(),c.getMonth(),c.getDate()).getTime();
        let d = new Date(c.getFullYear(),c.getMonth(),c.getDate()+1).getTime();
        let todayTodo = a.filter((v,i)=>{
            let time = this.getUTCTime(v);
            return w<=time&&time<=d;
        });
        return this.allTodo(todayTodo);
    }
    weekTodo(a){
        let c = new Date();
        let w = new Date(c.getFullYear(),c.getMonth(),c.getDate()).getTime();
        let d = new Date(c.getFullYear(),c.getMonth(),c.getDate()+7).getTime();
        let weekTodo = a.filter((v,i)=>{
            let time = this.getUTCTime(v);
            return w<=time&&time<=d;
        });
        return this.allTodo(weekTodo);
    }
    upcomingTodo(a){
        let c = new Date();
        let d = new Date(c.getFullYear(),c.getMonth(),c.getDate()+7).getTime();
        let upcomingTodo = a.filter((v,i)=>{
            let time = this.getUTCTime(v);
            return d<=time;
        });
        return this.allTodo(upcomingTodo);
    }
    todoSortChoice(choice){
        let parseTodo = JSON.parse(localStorage.getItem('todo')); 
        //excute a dynamic function with the choice given
        let updateTodo =  this[choice+"Todo"](parseTodo);
        this.setState({
            todoFormat: choice,
            todo: updateTodo,
            formatActive: false,
        });
        this[choice] = updateTodo;
    }
    formatActive(){
        this.setState({
            formatActive: !this.state.formatActive,
        })
    }
    render(){
        if(this.props.show === "cal")
        {
            return (
                <div className="calendar">
                    <BackToMenu onClick={this.props.return}/>
                    <SortMenu choice={this.todoSortChoice} />
                    <FormatMenu onClick={this.formatActive} currFormat={this.state.todoFormat}/>
                    <TodayFormat format={this.state.todoFormat} todo={this.today}/>
                    <WeekFormat format={this.state.todoFormat} todo={this.week}/>
                    <DateLessFormat format={this.state.todoFormat} todo={this.dateless}/>
                    <CalTodo todo={this.state.todo}/>
               </div>
            )
        }
        else
        {
            return null;
        }
    }
}
