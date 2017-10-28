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
        let cDate = c.getDate();
        let cMonth = c.getMonth();
        let cYear = c.getFullYear();
        let time = u.toDateString();
        let hoursLeft = Math.floor(((u.getTime() - c.getTime())/1000/60/60)); //hours differnt from user pick to curr
        if(u.toDateString() === new Date(cYear, cMonth, cDate).toDateString()){
            time<0? time = hoursLeft+" hours late" : time = hoursLeft+" hours left";
        }
        else if(u.toDateString() === new Date(cYear, cMonth, cDate-1).toDateString()){
            time = "Yesterday";
        } 
        else if(u.toDateString() === new Date(cYear, cMonth, cDate+1).toDateString()){
            time = "Tommmorow";
        }
        this.props.returnDate(time);
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
            else if(i+1 === this.props.date.date){
                return <span key={i} className="active" onClick={(e)=>this.pickTime(e,i,value,a.length)}>{value}</span>;
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