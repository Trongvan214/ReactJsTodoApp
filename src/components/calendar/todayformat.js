import React, {Component} from 'react';

export default class TodayFormat extends Component {
    render(){
        //array with time with am and pm 1-12
        let hour = Array(24).fill().map((v,i)=>{
            let value = i;
            let formatedValue;
            if(i<11||i===23){
                formatedValue = (value%12)+1;
                return <div key={i}>{formatedValue}<span className="time-prefix">AM</span></div>
            }
            else {
                formatedValue = (value%12)+1;
                return <div key={i}>{formatedValue}<span className="time-prefix">PM</span></div>
            }
        });
        //set the last item to the first of the array
        hour.unshift(hour.pop());
        return <div>{hour}</div>;
    }
}