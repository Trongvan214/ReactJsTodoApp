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
        // for(let i=0;i<len;i++){
        //     if(i !== index){
        //         e.target.parentNode.childNodes[i].classList.remove('active');
        //     }
        // }
        // e.target.classList.toggle('active');
        //return date string back to duedate
        let u = new Date(this.props.date.year, this.props.date.month, value); //user time
        this.props.returnDate(u.toDateString());
    }

    render(){
        let dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        let firstDay = new Date(this.props.date.year,this.props.date.month,1).toDateString().substring(0,3) //exp: Mon
        let totalDays = new Date(this.props.date.year,this.props.date.month+1, 0).getDate();    //exp: 30
        let freeSpace = dayName.indexOf(firstDay);
        //make a arr of nth element with that's empty
        let arrDate = Array(totalDays+freeSpace).fill();
        var dates = arrDate.map((v,i,a)=>{
            let value = i+1-freeSpace;
            if(i<freeSpace){
                //empty spans
                return <span key={"free"+i}></span>;
            }
            else if(value === this.props.date.date){
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