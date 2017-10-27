import React, {Component} from 'react';

export default class Dates extends Component {
    constructor(props){
        super(props);
        this.state = {
            dateActive: false,
        }
    }
    pickTime(e,index,value,len){
        //remove active from all others
        for(let i=0;i<len;i++){
            if(i !== index){
                e.target.parentNode.childNodes[i].classList.remove('active');
            }
        }
        e.target.classList.toggle('active');
        let month = this.props.date.month;
        let year = this.props.date.year;
        let u = new Date(year, month, value); //user time
        let c = new Date();  //curr time
        let midC = new Date(c.getFullYear(), c.getMonth(), c.getDate()+1).setHours(0,0,0,0); // curr time midnight time (UNIX Timestamp)
        // let midY = new Date(c.getFullYear(), c.getMonth(), c.getDate()).setHours(0,0,0,0); //curr time yester midnight time (UNIX Timestamp)
        let hoursFromCurr = (u.getTime() - c.getTime())/1000/60/60; //hours differnt from user pick to curr
        let hourTillMid = (midC - c.getTime())/1000/60/60; //hours until midnight of curr time
        // let hoursFromMid = (midY - c.getTime())/1000/60/60; //hours been since yesterday
        let answer;
        let diff = hoursFromCurr-hourTillMid;
        console.log(diff);
        if(diff >= 0){
            answer = "Tommrow";
            if(diff >= 24) {
                answer = u.toDateString();
            }
        }
        else {
            answer = "Today";
            if(diff>=-47.90){
                answer = "Yesterday";
                if(diff>=-71){
                    answer = u.toDateString();
                }
            }
        }
        this.props.returnDate(answer);
    }
    render(){
        //when to place the date
        let freeSpace = this.props.dateInfo.free;
        let totalDays = this.props.dateInfo.total;
        //make a arr of nth element with that's empty
        let arrDate = new Array(totalDays+freeSpace).fill();
        var dates = arrDate.map((v,i,a)=>{
            let value = i+1-freeSpace;
            if(i<freeSpace){
                //empty spans
                return <span key={"free"+i}></span>;
            }
            else {
                //date count span
                return <span key={i} onClick={(e)=>this.pickTime(e,i,value,a.length)}>{value}</span>;
            }
        });
        //normal edit button on todo
        return  <div className="calendar-date">{dates}</div>
    }
}