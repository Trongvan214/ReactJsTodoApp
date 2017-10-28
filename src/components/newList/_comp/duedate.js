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
            searchBox: this.refs.searchBox,
        }
        this.calSearch = this.calSearch.bind(this);
    }
    //set the state before mounting
    componentWillMount(){
        let d = new Date();
        this.setState({date: {year: d.getFullYear(), month: d.getMonth(), date: d.getDate()}});
    }
    calSearch(){
        let searchReg = new RegExp(/^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}/);
        if(searchReg.test(this.refs.calSearchBox.value)){
            let d = this.refs.calSearchBox.value.split('/');
            this.setState({date: {year: d[2], month: d[1]-1, date: d[0]}});
        }
    }
    returnDate(dateString){
        this.props.getDate(dateString);
    }
    decreaseMonth(){
        let t = new Date(this.state.date.year, this.state.date.month-1);
        this.setState({
            date: {
                month: t.getMonth(),
                year: t.getFullYear(),
            }
        });
    }
    increaseMonth(){
        let t = new Date(this.state.date.year, this.state.date.month+1);
        this.setState({
            date: {
                month: t.getMonth(),
                year: t.getFullYear(),
            }
        });
    }
    render(){
        let dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        let monthName = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        let firstDay = new Date(this.state.date.year,this.state.date.month,1).toDateString().substring(0,3) //exp: Mon
        let totalDays = new Date(this.state.date.year,this.state.date.month+1, 0).getDate();    //exp: 30
        let freeSpace = dayName.indexOf(firstDay);
        let curr = this.state.date.date+"/"+(this.state.date.month+1)+"/"+this.state.date.year;
        let dateInfo = {
            total: totalDays,
            free: freeSpace
        }
        let days = dayName.map((value, index) => {
            return <span key={index}>{value.substring(0,1)}</span> //s m t w 
        });
        return (
            <div className="calendar-container">
                <input className="calendar-search" type="text" defaultValue={curr} onChange={this.calSearch} ref="calSearchBox" placeholder="08/23/2020"/>
                <span className="calendar-month-backward" onClick={()=>this.decreaseMonth()}>&lsaquo;</span>
                <span className="calendar-month-forward" onClick={()=>this.increaseMonth()}>&rsaquo;</span>
                <div className="calendar-header">
                    <span className="calendar-month-year">{`${monthName[this.state.date.month]} ${this.state.date.year}`}</span>
                </div>
                <div className="calendar-body">
                    <div className="calendar-day">{days}</div>
                    <Dates date={this.state.date} returnDate={this.returnDate.bind(this)} dateInfo={dateInfo}/>
                </div>
            </div>
        );
    }
}