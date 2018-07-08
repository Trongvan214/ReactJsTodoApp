import React, {Component} from 'react';

export default class Time extends Component {
    constructor(props){
        super(props);
        this.state = {
            hour: '',
            min: '',
        }
        this.setTime = this.setTime.bind(this);
    }
    componentWillMount(){
        //if time already set 
        let time = this.props.setTime;
        if(time){
           this.setTime(time.min,time.hour);
        }
        //use current time 
        else
        {
            let t = new Date();
            //in string form
            let min = ("0"+t.getMinutes()).slice(-2);
            let part1,part2;
            if(min[1]>5){
                //round it up
                part1 = parseInt(min[0],10)+1;
                part2 = 0;
            }
            else{
                //round it down
                part1 = parseInt(min[0],10);
                part2 = 5;
            }
            //concatenating the 2 strings
            min = part1.toString()+part2.toString();
            let n = new Date(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours()-1,parseInt(min,10));
            //update the state
            this.setState({
                hour: n.getHours(),
                min: n.getMinutes(),
            });
        }
    }
    //update the time states
    setTime(minValue = this.state.min,hourValue = this.state.hour){
        this.setState({
            hour: hourValue,
            min: minValue,
        });
        let dayTime = hourValue<12?"AM":"PM";
        let min = ("0"+minValue).slice(-2);
        let hour = hourValue%12===0?12:hourValue%12;
        let displayTime = hour+":"+min+dayTime;
        let rawTime = {
            "hour": hourValue,
            "min": parseInt(min,10),
        }
        this.props.getTime(displayTime, rawTime);
    }
    render(){
        //array with 00 05 10 ++ multiple of 5
        let min =  Array(12).fill(0).map((v,i)=>{
            let value = i*5;
            let formatedValue = ":"+("0"+(value)).slice(-2);
            return <span key={i} className={this.state.min===value?"active":""} onClick={()=>this.setTime(value)}>{formatedValue}</span>;
        });
        let hourArr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
        let hour = hourArr.map((v,i)=>{
            let value = v%12===0?12:v%12;
            return <span key={i} className={this.state.hour===v?"active":" "} onClick={()=>this.setTime(undefined,v)}>{value}<span className="time-prefix">AM</span></span>
        });
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