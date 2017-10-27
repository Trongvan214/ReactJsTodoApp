import React from 'react';

const CalBody = (props) => {
    console.log(props);
    let dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let monthName = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    let d = new Date(props.date.year,props.date.month);
    let firstDay = new Date(props.date.year,props.date.month,1).toDateString().substring(0,3) //exp: Mon
    let totalDays = new Date(props.date.year,props.date.month+1, 0).getDate();    //exp: 30
    let days = dayName.map((value, index) => {
        return <span key={index}>{value}</span>
    });
    const Dates = () => {
        //when to place the date
        let freeSpace = dayName.indexOf(firstDay);
        let arrDate = [];
        //put nothing in these
        let i = 0;
        for(i = 0;i<freeSpace;i++){
            arrDate.push(<div key={i}></div>);
        }
        //put dates counting until total days
        let dateCount = 1;
        for(;dateCount<=totalDays;i++){
            arrDate.push(<div key={i}>{dateCount}</div>);
            dateCount++;
        }
        return <div id="calendar-date">{arrDate}</div>
    }
    const decreaseMonth = () => {
        let d = new Date(props.date.year, props.date.month-1);
        props.changeMonth(d.getMonth(),d.getFullYear());
    }
    const increaseMonth = () => {
        let d = new Date(props.date.year, props.date.month+1)
        props.changeMonth(d.getMonth(), d.getFullYear());
    }
    return (
        <div id="calendar">
            <span id="calendar-month-backward" onClick={decreaseMonth}>&larr;</span>
            <span id="calendar-month-forward" onClick={increaseMonth}>&rarr;</span>
            <div id="calendar-container">
                <div id="calendar-header">
                    <span id="calendar-month-year">{`${monthName[d.getMonth()]} ${d.getFullYear()}`}</span>
                    <div id="calendar-day">{days}</div>
                </div>
                <Dates />
            </div>
        </div>
    )
}

export default CalBody;

