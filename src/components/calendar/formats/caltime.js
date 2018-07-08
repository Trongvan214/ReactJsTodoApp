import React, {Component} from 'react';

export default class CalTime extends Component {
    updateTime(t){
        if(t){
            let min = t.min;
            let hour = t.hour;
            //same formated to figure out am or pm
            let dayTime = hour<11||hour===24? "AM" : "PM";
            //get 2 digit value for min
            min = ("0"+min).slice(-2);
            let displayTime = hour===24?12+":"+min+dayTime : hour%12+":"+min+dayTime;
            return displayTime;
        }
        return ""; //return nothing
    }
    render(){
        if(!this.props.time){
            return null;
        }
        return (
            <div className="todo-cal-time">
                <span className="todo-cal-time-symbol" role="img" aria-label="clock">&#x1F550;</span>
                <span className="todo-cal-time-value">{this.updateTime(this.props.time)}</span>
            </div>
        );
    }
}