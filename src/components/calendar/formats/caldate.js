import React, {Component} from 'react';

export default class CalDate extends Component {
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
    render(){
        //if date is null or undefined .. 
        if(!this.props.date){
            return null;
        }
        return (
            <div className="todo-cal-date">
                <span className="todo-cal-date-symbol" role="img" aria-label="calendar">&#x1F4C5;</span>
                <span className="todo-cal-date-value">{this.updateDate(this.props.date)}</span>
            </div>
        );
    }
}