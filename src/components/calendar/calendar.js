import React, {Component} from 'react';
// import CalBody from './_comp/calbody';
import BackToMenu from '.././backtomenu/backtomenu';
import './calendar.css';

export default class Calendar extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: {
                month: '',
                year: '',
            },
            todo: [],
        }
        this.updateDate = this.updateDate.bind(this);
        this.updateTime = this.updateTime.bind(this);
        this.sortTodo = this.sortTodo.bind(this);
    }
    componentWillUpdate(nextProps){
        //update the todo
        if(nextProps.show === "cal" && nextProps !== this.props){
            let parseTodo = JSON.parse(localStorage.getItem('todo')); 
            let sortedTodo = this.sortTodo(parseTodo);
            this.setState({
                todo: sortedTodo,
            });
        }
    }
    //remember to figure how to update without setting up first
    componentWillMount(){
        // let d = new Date();
        // this.setState({date: {
        //         month: d.getMonth(),
        //         year: d.getFullYear(), 
        //     }});       
        let parseTodo = JSON.parse(localStorage.getItem('todo')); 
        let sortedTodo = this.sortTodo(parseTodo);
        this.setState({
            todo: sortedTodo,
        });
    }
    // setMonth(newMonth, newYear){
    //     this.setState({date: {month: newMonth, year: newYear}});
    // }
    sortTodo(a){
        const getUTCTime = (obj) => {
            let arr = [];
            //merge the objects together
            let data = Object.assign({}, obj.edit.date, obj.edit.time);
            //delete the color object
            delete data.color;
            //if no time given than return 0
            if(Object.keys(data).length !== 0){
                for(let prop in data){
                    arr.push(data[prop]);
                }
                return new Date(...arr).getTime();
            }
            return 0;
        };
        let temp, swap, currData, nextData, noTimeArr = [];
        do {
            swap = false;
            for(let i=0;i<a.length-1;i++){
                currData = getUTCTime(a[i]);
                nextData = getUTCTime(a[i+1]);
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
    updateDate(d){
        if(d){
            let userDate = new Date(d.year,d.month,d.date);
            let dateString = userDate.toDateString();
            let c = new Date();
            let cYear = c.getFullYear();
            let cMonth = c.getMonth();
            let cDate = c.getDate();
            if(dateString === new Date(cYear, cMonth, cDate).toDateString()){
                dateString = "Today";
            }
            else if(dateString === new Date(cYear, cMonth, cDate-1).toDateString()){
                dateString = "Yesterday";
            } 
            else if(dateString === new Date(cYear, cMonth, cDate+1).toDateString()){
                dateString = "Tommorrow";
            }
            return dateString;
        }
        return ""; //return nothing
        
    }
    updateTime(t){
        if(t){
            let min = t.min;
            let hour = t.hour;
            //same formated to figure out am or pm
            let dayTime = hour<11||hour===23? "AM" : "PM";
            //get 2 digit value for min
            min = ("0"+min).slice(-2);
            let displayTime = hour%12+":"+min+dayTime;
            return displayTime;
        }
        return ""; //return nothing
    }
    render(){
        let todoCal = this.state.todo.map((v,i)=>{
            let star = v.star?<span className="todo-cal-star">&#9733;</span>:""
            let time = v.edit.time?
                    <div className="todo-cal-time">
                        <span className="todo-cal-time-symbol" role="img" aria-label="clock">&#x1F550;</span>
                        <span className="todo-cal-time-value">{this.updateTime(v.edit.time)}</span>
                    </div>
                    :
                    "";
            let date = v.edit.date?
                    <div className="todo-cal-date">
                        <span className="todo-cal-date-symbol" role="img" aria-label="calendar">&#x1F4C5;</span>
                        <span className="todo-cal-date-value">{this.updateDate(v.edit.date)}</span>
                    </div>
                    :
                    "";
            let note = v.edit.note?
                    <div className="todo-cal-note">
                        <span className="todo-cal-note-symbol">&#9998;</span>
                        <span className="todo-cal-note-value">{v.edit.note}</span>
                    </div>
                    :
                    "";
            let subtask = v.edit.subTask.tasks.map((v,i)=>{
                let check = v.isComplete?<span>&#10004;</span>:"";
                return (
                    <div className="todo-cal-subtask-task" key={i}>
                        {check}
                        <span>{v.name}</span>
                    </div>
                )
            });
            return (
                <div className="todo-cal" key={i}>
                    <div className={"todo-cal-header "+v.priority}>
                        {star}
                        <span className="todo-cal-name">{v.name}</span>
                    </div>
                    <div className="todo-cal-body">
                        {date}
                        {time}
                        {note}
                        <div className="todo-cal-subtask">
                            {subtask}
                        </div>
                    </div>
                </div>
            )
        });
        if(this.props.show === "cal")
        {
            return (
                <div className="calendar">
                    <BackToMenu onClick={this.props.return}/>
                    {/* <CalBody date={this.state.date} changeMonth={this.setMonth.bind(this)}/> */}
                    {todoCal}
               </div>
            )
        }
        else
        {
            return null;
        }
    }
}
