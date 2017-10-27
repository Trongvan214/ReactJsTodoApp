import React, {Component} from 'react';

export default class Dates extends Component {
    constructor(props){
        super(props);
        this.state = {
            dateActive: false,
        }
    }
    toggleActive(e,index,value,len){
        for(let i=0;i<len;i++){
            if(i !== index){
                e.target.parentNode.childNodes[i].classList.remove('active');
            }
        }
        e.target.classList.toggle('active');
        let month = this.props.date.month;
        let year = this.props.date.year;
        let d = new Date(year, month, value).toDateString();
        this.props.returnDate(d);
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
                return <span key={"free"+i}></span>;
            }
            else {
                return <span key={i} onClick={(e)=>this.toggleActive(e,i,value,a.length)}>{value}</span>;
            }
        });
        return  <div id="calendar-date">{dates}</div>
    }
}