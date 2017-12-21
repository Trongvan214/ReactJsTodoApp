import React, {Component} from 'react';
import Dates from './dates';

export default class Calendar extends Component {
    state = {
        date: {
            year: '',
            month: '',
            date: '',
        },
        dateSearch:  '',
        monthName: ['January','February','March','April','May','June','July','August','September','October','November','December'],
    }
    //set the state before mounting
    componentWillMount(){
        let date = this.props.setDate;
        if(date){
            let d = new Date(date.year, date.month, date.date);
            //call return date to show choice time
            this.returnDate(d.toDateString());
        }
        else {
            let d = new Date();
            let s = d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
            this.setState({
                date: {
                    year: d.getFullYear(), 
                    month: d.getMonth(), 
                    date: d.getDate()
                },
                dateSearch: s
            });
        }
    }
    updateMonth(e,choice){
        let year = this.state.date.year;
        let month = this.state.date.month;
        (choice === "increase" ) ? month+=1 : month-=1;
        let t = new Date(year,month);
        //update the dates 
        this.setState({
            date: {
                year: t.getFullYear(),
                month: t.getMonth(),
                date: '',
            },
        });
        //this function dates all the dates
        //this.returnDate(t.toDateString());
    }
    dateSearch(e){
        this.setState({
            dateSearch: e.target.value,
        });
        let searchReg = new RegExp(/^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}/);
        if(searchReg.test(e.target.value)){
            let d = e.target.value.split('/');
            //covert to date first to avoid 12+ number
            let a = new Date(d[2],d[1]-1,d[0]);
            this.returnDate(a.toDateString());  
        }
    }
    returnDate = (dateString) => {
        let d = dateString.split(" ");
        //loop through monthname and return 3 char month name
        let s = this.state.monthName.map(value=>value.substring(0,3));
        //covert to date first to avoid 12+ number
        let a = new Date(d[3],s.indexOf(d[1]),d[2]);
        let dateFormatted = a.getDate()+"/"+(a.getMonth()+1)+"/"+a.getFullYear();
        //set the dateSearch to the date of clicked 
        this.setState({
            date: {
                year: a.getFullYear(), 
                month: a.getMonth(), 
                date: a.getDate(),
            },
            dateSearch: dateFormatted,
        });
        //figure out tommrrow/yesterday/today
        let c = new Date();
        let cYear = c.getFullYear();
        let cMonth = c.getMonth();
        let cDate = c.getDate();
        //past date is red else green 
        let dateColor = a.getTime() > c.getTime() ? "green":"red"
        //check whether the date is past due
        // let bool = new Date(dateString).getTime < c.getTime();
        if(dateString === new Date(cYear, cMonth, cDate).toDateString()){
            dateString = "Today";
            dateColor = "black";
        }
        else if(dateString === new Date(cYear, cMonth, cDate-1).toDateString()){
            dateString = "Yesterday";
            dateColor = "red";
        } 
        else if(dateString === new Date(cYear, cMonth, cDate+1).toDateString()){
            dateString = "Tommorrow";
            dateColor = "green";
        }
        let rawDate = {
            "year": a.getFullYear(), 
            "month": a.getMonth(), 
            "date": a.getDate(),
            "color": dateColor,
        }
        this.props.getDate(dateString, dateColor, rawDate);
    }
    render(){
        //day name prefixes
        let days = Array(7).fill().map((value, index) => {
            let d = "SMTWTFS"
            return <span key={index}>{d[index]}</span> //s m t w 
        });
        if(this.props.showCal){
            return (
                <div className="calendar-container">
                    <input className="calendar-search" type="text" value={this.state.dateSearch || ''} onChange={(e)=>this.dateSearch(e)}/>
                    <span className="calendar-month-backward" onClick={(e)=>this.updateMonth(e,"decrease")}>&lsaquo;</span>
                    <span className="calendar-month-forward" onClick={(e)=>this.updateMonth(e,"increase")}>&rsaquo;</span>
                    <div className="calendar-header">
                        <span className="calendar-month-year">{`${this.state.monthName[this.state.date.month]} ${this.state.date.year}`}</span>
                    </div>
                    <div className="calendar-body">
                        <div className="calendar-day">{days}</div>
                        <Dates date={this.state.date} returnDate={this.returnDate} />
                    </div>
                </div>
            )
        }
        else {
            return null;
        }
    }
}