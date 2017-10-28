import React, {Component} from 'react';
import Dates from './dates';

export default class DueDate extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: {
                year: '',
                month: '',
                date: '',
            },
            dateSearch:  '',
            monthName: ['January','February','March','April','May','June','July','August','September','October','November','December'],
            pickedDate: '',
        }
        this.calSearch = this.calSearch.bind(this);
        this.returnDate = this.returnDate.bind(this);
    }
    //set the state before mounting
    componentWillMount(){
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
    calSearch(e){
        this.setState({
            dateSearch: e.target.value,
        });
        let searchReg = new RegExp(/^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}/);
        if(searchReg.test(e.target.value)){
            let d = e.target.value.split('/');
            //covert to date first to avoid 12+ number
            let a = new Date(d[2],d[1]-1,d[0]);
            this.setState({date: {year: a.getFullYear(), month: a.getMonth(), date: a.getDate()}});
        }
    }
    returnDate(dateString){
        let d = dateString.split(" ");
        //loop through monthname and return 3 char month name
        let s = this.state.monthName.map(value=>value.substring(0,3));
        //covert to date first to avoid 12+ number
        let a = new Date(d[3],s.indexOf(d[1]),d[2]);
        let dateFormatted = a.getDate()+"/"+a.getMonth()+"/"+a.getFullYear();
        //set the dateSearch to the date of clicked 
        this.setState({
            date: {
                year: a.getFullYear(), 
                month: a.getMonth(), 
                date: a.getDate(),
            },
            dateSearch: dateFormatted,
        });
        //function update the due date 
        //figure out tommrrow/yesterday/today
        // let c = new Date();
        // let cYear = c.getFullYear();
        // let cMonth = c.getMonth();
        // let cDate = c.getDate()
        // if(dateString === new Date(cYear, cMonth, cDate).toDateString()){
        //     dateString = "Today";
        // }
        // else if(dateString === new Date(cYear, cMonth, cDate-1).toDateString()){
        //     dateString = "Yesterday";
        // } 
        // else if(dateString === new Date(cYear, cMonth, cDate+1).toDateString()){
        //     dateString = "Tommorrow";
        // }
        // this.setState({pickedDate: dateString});
    }
    updateMonth(e,choice){
        let year = this.state.date.year;
        let month = this.state.date.month;
        (choice === "increase" ) ? month+=1 : month-=1;
        let t = new Date(year,month);
        //this function dates all the dates
        // this.returnDate(t.toDateString());
        //update the dates 
        this.setState({
            date: {
                year: t.getFullYear(),
                month: t.getMonth(),
                date: '',
            },
        });
    }
    render(){
        //day name prefixes
        let days = Array(7).fill().map((value, index) => {
            let d = "SMTWTFS"
            return <span key={index}>{d[index]}</span> //s m t w 
        });
        return (
            <div className="due-date">
                <span className="due-date-symbol" role="img" aria-label="cal">&#x1F4C5;</span>
                <span className="due-date-text">Due Date {this.state.pickedDate}</span>
                <span className="due-date-button">&#9660;</span>
                <div className="calendar-container">
                    <input className="calendar-search" type="text" value={this.state.dateSearch || ''} onChange={this.calSearch}/>
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
            </div>
        );
    }
}