import React, {Component} from 'react';
import Dates from './dates';

export default class DueDate extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: {
                month: '',
                year: '',
            }
        }
    }
    componentWillMount(){
        let d = new Date();
        this.setState({date: {month: d.getMonth(), year: d.getFullYear()}})
    }
    returnDate(dateString){
        this.props.getDate(dateString);
    }
    decreaseMonth(){
        let t = new Date(this.state.date.year, this.state.date.month-1);
        this.setState({
            date: {
                month: t.getMonth(),
                year: t.getFullYear(),
            }
        });
    }
    increaseMonth(){
        let t = new Date(this.state.date.year, this.state.date.month+1);
        this.setState({
            date: {
                month: t.getMonth(),
                year: t.getFullYear(),
            }
        });
    }
    render(){
        let dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        let monthName = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        let firstDay = new Date(this.state.date.year,this.state.date.month,1).toDateString().substring(0,3) //exp: Mon
        let totalDays = new Date(this.state.date.year,this.state.date.month+1, 0).getDate();    //exp: 30
        let freeSpace = dayName.indexOf(firstDay);
        let dateInfo = {
            total: totalDays,
            free: freeSpace
        }
        let days = dayName.map((value, index) => {
            return <span key={index}>{value.substring(0,1)}</span> //s m t w 
        });
        return (
            <div className="calendar-container">
                <span className="calendar-month-backward" onClick={()=>this.decreaseMonth()}>&lsaquo;</span>
                <span className="calendar-month-forward" onClick={()=>this.increaseMonth()}>&rsaquo;</span>
                <div className="calendar-header">
                    <span className="calendar-month-year">{`${monthName[this.state.date.month]} ${this.state.date.year}`}</span>
                </div>
                <div className="calendar-body">
                    <div className="calendar-day">{days}</div>
                    <Dates date={this.state.date} returnDate={this.returnDate.bind(this)} dateInfo={dateInfo}/>
                </div>
            </div>
        );
    }
}