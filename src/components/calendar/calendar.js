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
    }
    //remember to figure how to update without setting up first
    componentWillMount(){
        // let d = new Date();
        // this.setState({date: {
        //         month: d.getMonth(),
        //         year: d.getFullYear(), 
        //     }});       
        let parseTodo = JSON.parse(localStorage.getItem('todo')); 
        this.setState({
            todo: parseTodo,
        });
    }
    // setMonth(newMonth, newYear){
    //     this.setState({date: {month: newMonth, year: newYear}});
    // }
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
        console.log(this.state.todo);
        let todoCal = this.state.todo.map((v,i)=>{
            let time = this.updateTime(v.edit.time);
            let date = this.updateDate(v.edit.date);
            let subtask = v.edit.subTask.tasks.map((v,i)=>{
                return (
                    <div key={i}>{v.name}</div>
                )
            });
            return (
                <div className="todo-cal" key={i}>
                    <div className="todo-cal-header">
                        <span className="todo-cal-name">{v.name}</span>
                    </div>
                    <div className="todo-cal-body">
                        <span className="todo-cal-time-symbol"></span>
                        <span className="todo-cal-time">{time+" "+date}</span>
                        <span className="todo-cal-note">{v.edit.note}</span>
                        <span className="todo-cal-subtask">{subtask}</span>
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
