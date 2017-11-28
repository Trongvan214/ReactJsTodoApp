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
        let time = this.props.setTime;
        if(time){
           //call function to update pickedtime display
           this.setTime(time.min,time.hour-1);
        }
        else
        {
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
            let n = new Date(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours()-1,parseInt(min,10));
            this.setState({
                hour: n.getHours(),
                min: n.getMinutes(),
            });
        }
    }
    setTime(minValue = this.state.min,hourValue = this.state.hour){
        this.setState({
            hour: hourValue,
            min: minValue,
        });
        //same formated to figure out am or pm
        let dayTime = hourValue<11||hourValue===23? "AM" : "PM";
        //get 2 digit value for min
        let min = ("0"+minValue).slice(-2);
        let displayTime = (hourValue%12)+1+":"+min+dayTime;
        //add +1 here to formatted store and remember to -1
        let rawTime = {
            "hour": hourValue+1,
            "min": parseInt(min,10),
        }
        this.props.getTime(displayTime, rawTime);
    }
    render(){
        //array with 00 05 10 ++ multiple of 5
        let min =  Array(12).fill(0).map((v,i)=>{
            let value = i*5;
            let formatedValue = ":"+("0"+(value)).slice(-2);
            if(value === this.state.min){
                return <span key={i} className="active" onClick={()=>this.setTime(value)}>{formatedValue}</span>;
            }
            else {
                return <span key={i} onClick={()=>this.setTime(value)}>{formatedValue}</span>;
            }
        });
        let hourArr = [12,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
        //array with time with am and pm 1-12
        let hour = hourArr.map((v,i)=>{
            let value = i;
            if(i<12){
                return <span key={i} className={this.state.hour===value?"active":" "} onClick={()=>this.setTime(undefined,value)}>{i}<span className="time-prefix">AM</span></span>
            }
            else {
                return <span key={i} className={this.state.hour===value?"active":" "} onClick={()=>this.setTime(undefined,value)}>{i}<span className="time-prefix">PM</span></span>
            }
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