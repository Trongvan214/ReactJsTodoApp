import React, {Component} from 'react';
// import CalBody from './_comp/calbody';
import BackToMenu from '.././backtomenu/backtomenu';
import SortMenu from './sortmenu';
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
        this.todoSortChoice = this.todoSortChoice.bind(this);
        this.allTodo = this.allTodo.bind(this);
        this.datelessTodo = this.datelessTodo.bind(this);
        this.todayTodo = this.todayTodo.bind(this);
        this.weekTodo= this.weekTodo.bind(this);
        this.upcomingTodo = this.upcomingTodo.bind(this);
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
        // let d = new Date();
        // this.setState({date: {
        //         month: d.getMonth(),
        //         year: d.getFullYear(), 
        //     }});       
        let parseTodo = JSON.parse(localStorage.getItem('todo')); 
        let sortedTodo = this.allTodo(parseTodo);
        this.setState({
            todo: sortedTodo,
        });
    }
    // setMonth(newMonth, newYear){
    //     this.setState({date: {month: newMonth, year: newYear}});
    // }
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
        if(choice === "all"){
            let allTodo = this.allTodo(parseTodo);
            this.setState({
                todo: allTodo,
            });
        }
        else if(choice === "dateless"){
            let datelessTodo = this.datelessTodo(parseTodo);
            this.setState({
                todo: datelessTodo,
            })
        }
        else if(choice === "star"){
            let starTodo = this.starTodo(parseTodo);
            this.setState({
                todo: starTodo,
            })
        }
        else if(choice === "today"){
            let todayTodo = this.todayTodo(parseTodo);
            this.setState({
                todo: todayTodo,
            })
        }
        else if(choice === "week"){
            let weekTodo = this.weekTodo(parseTodo);
            this.setState({
                todo: weekTodo
            })
        }
        else if(choice === "upcoming"){
            let upcomingTodo = this.upcomingTodo(parseTodo);
            this.setState({
                todo: upcomingTodo,
            })
        }
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
            let dayTime = hour<11||hour===24? "AM" : "PM";
            //get 2 digit value for min
            min = ("0"+min).slice(-2);
            let displayTime = hour===24?12+":"+min+dayTime:hour%12+":"+min+dayTime;
            return displayTime;
        }
        return ""; //return nothing
    }
    render(){
        let todoCal = this.state.todo.map((v,i)=>{
            const star = v.star?<span className="todo-cal-star">&#9733;</span>:""
            const Time = () => {
                if(!v.edit.time){
                    return null;
                }
                return (
                    <div className="todo-cal-time">
                        <span className="todo-cal-time-symbol" role="img" aria-label="clock">&#x1F550;</span>
                        <span className="todo-cal-time-value">{this.updateTime(v.edit.time)}</span>
                    </div>
                );
            }
            const Date = () => {
                //if date is null or undefined .. 
                if(!v.edit.date){
                    return null;
                }
                return (
                    <div className="todo-cal-date">
                        <span className="todo-cal-date-symbol" role="img" aria-label="calendar">&#x1F4C5;</span>
                        <span className="todo-cal-date-value">{this.updateDate(v.edit.date)}</span>
                    </div>
                );
            }
            const Note = () => {
                //if empty string in the note
                if(!v.edit.note){
                    return null;
                }
                return (
                    <div className="todo-cal-note">
                        <span className="todo-cal-note-symbol">&#9998;</span>
                        <span className="todo-cal-note-value">{v.edit.note}</span>
                    </div>
                );
            }
            const Subtask = () => {
                let tasks = v.edit.subTask.tasks.map((v,i)=>{
                    let check = v.isComplete?<span>&#10004;</span>:<span></span>;
                    return (
                        <div className="todo-cal-subtask-task" key={i}>
                            {check}
                            <span>{v.name}</span>
                        </div>
                    )
                });
                if(tasks.length === 0){
                    return null;
                }
                return (
                    <div className="todo-cal-subtask">
                        <div className="todo-cal-subtask-header">
                            <span>Subtasks:</span>
                            <span>Completed &#10004;</span>
                        </div>
                        {tasks}
                    </div>
                )
            }
            return (
                <div className="todo-cal" key={i}>
                    <div className={"todo-cal-header "+v.priority}>
                        {star}
                        <span className="todo-cal-name">{v.name}</span>
                    </div>
                    <div className="todo-cal-body">
                        <Date />
                        <Time />
                        <Note />
                        <Subtask />
                    </div>
                </div>
            )
        });
        if(this.props.show === "cal")
        {
            return (
                <div className="calendar">
                    <BackToMenu onClick={this.props.return}/>
                    <SortMenu choice={this.todoSortChoice}/>
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
