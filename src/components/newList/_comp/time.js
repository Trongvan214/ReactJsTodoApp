import React, {Component} from 'react';

export default class Time extends Component {
    constructor(props){
        super(props);
        this.state = {
            hour: '',
            min: '',
        }
    }
    componentWillMount(){
        let t = new Date();
        let min = ("0"+t.getMinutes()).slice(-2); //in string form
        let part1,part2;
        if(min[1]>5){
            //round it up
            part1 = parseInt(min[0],10)+1;
            part2 = 0;
        }
        else{
            part1 = parseInt(min[0],10);
            part2 = 5;
        }
        min = part1.toString()+part2.toString();
        //new time when round up time + 1 extra hours are default
        let n = new Date(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),parseInt(min,10));
        this.setState({
            hour: n.getHours(),
            min: n.getMinutes(),
        });
    }
    setTime(which,value){
        let hour = this.state.hour;
        let min = this.state.min
        this.setState({
            ...this.state.time,
            [which]: value,
        });
        which==="min"? min = value : hour = value;
        //same formated to figure out am or pm
        let dayTime = hour<11||hour===23? "AM" : "PM";
        //get 2 digit value for min
        min = ("0"+min).slice(-2);
        let time = (hour%12)+1+":"+min+dayTime;
        this.props.getTime(time);
    }
    render(){
        //array with 00 05 10 ++ multiple of 5
        let min =  Array(12).fill(0).map((v,i)=>{
            let value = i*5;
            let formatedValue = ":"+("0"+(value)).slice(-2);
            if(value === this.state.min){
                return <span key={i} className="active" onClick={()=>this.setTime("min",value)}>{formatedValue}</span>;
            }
            else {
                return <span key={i} onClick={()=>this.setTime("min",value)}>{formatedValue}</span>;
            }
        });
        //array with time with am and pm 1-12
        let hour = Array(24).fill().map((v,i)=>{
            let value = i;
            let formatedValue;
            if(i<11||i===23){
                formatedValue = (value%12)+1+"AM";
                return <span key={i} className={this.state.hour===value?"active":" "} onClick={()=>this.setTime("hour",value)}>{formatedValue}</span>
            }
            else {
                formatedValue = (value%12)+1+"PM";
                return <span key={i} className={this.state.hour===value?"active":" "} onClick={()=>this.setTime("hour",value)}>{formatedValue}</span>
            }
        });
        //set the last item to the first of the array
        hour.unshift(hour.pop());
        if(this.props.showTime){
            return (
                <div className="time-choice-container">
                    <div className="time-choice-hour">{hour}</div>
                    <div className="time-choice-min">{min}</div>
                </div>
            )
        }
        else {
            return null;
        }
    }
}