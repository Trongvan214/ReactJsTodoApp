import React, {Component} from 'react';
import Dates from './dates';
import CalSearch from './calsearch';

export default class DueDate extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: {
                year: '',
                month: '',
                date: '',
            },
            defaultCalSearch:  '',
            monthName: ['January','February','March','April','May','June','July','August','September','October','November','December'],
            dateClicked: false,
        }
        this.calSearch = this.calSearch.bind(this);
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
            defaultCalSearch: s
        });
    }
    calSearch(text){
        let searchReg = new RegExp(/^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}/);
        if(searchReg.test(text)){
            let d = this.refs.calSearchBox.value.split('/');
            this.setState({date: {year: d[2], month: d[1]-1, date: d[0]}});
        }
    }
    returnDate(dateString){
        let c = new Date();
        let cYear = c.getFullYear();
        let cMonth = c.getMonth();
        let cDate = c.getDate()
        let a = dateString.split(" ");
        //loop through monthname and return 3 char month name
        let s = this.state.monthName.map(value=>value.substring(0,3));
        this.setState({date: {year: a[3], month: s.indexOf(a[1]), date: a[2]}});
        this.setState({dateClicked: true});
        if(dateString === new Date(cYear, cMonth, cDate).toDateString()){
            dateString = "Today";
        }
        else if(dateString === new Date(cYear, cMonth, cDate-1).toDateString()){
            dateString = "Yesterday";
        } 
        else if(dateString === new Date(cYear, cMonth, cDate+1).toDateString()){
            dateString = "Tommorrow";
        }
        this.props.getDate(dateString);
    }
    decreaseMonth(){
        let t = new Date(this.state.date.year, this.state.date.month-1, this.state.date.date);
        this.setState({
            date: {
                year: t.getFullYear(),
                month: t.getMonth(),
                date: t.getDate(),
            }
        });
    }
    increaseMonth(){
        let t = new Date(this.state.date.year, this.state.date.month+1, this.state.date.date);
        this.setState({
            date: {
                year: t.getFullYear(),
                month: t.getMonth(),
                date: t.getDate(),
            }
        });
    }
    render(){
        let days = Array(7).fill().map((value, index) => {
            let d = "SMTWTFS"
            return <span key={index}>{d[index]}</span> //s m t w 
        });
        return (
            <div className="calendar-container">
                <CalSearch click={this.dateClicked} onChange={()=>this.calSearch()} date={this.state.date}/>
                <span className="calendar-month-backward" onClick={()=>this.decreaseMonth()}>&lsaquo;</span>
                <span className="calendar-month-forward" onClick={()=>this.increaseMonth()}>&rsaquo;</span>
                <div className="calendar-header">
                    <span className="calendar-month-year">{`${this.state.monthName[this.state.date.month]} ${this.state.date.year}`}</span>
                </div>
                <div className="calendar-body">
                    <div className="calendar-day">{days}</div>
                    <Dates date={this.state.date} returnDate={this.returnDate.bind(this)}/>
                </div>
            </div>
        );
    }
}