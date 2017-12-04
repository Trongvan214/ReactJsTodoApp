import React, {Component} from 'react';
import './todayformat.css';

export default class TodayFormat extends Component {
    constructor(props){
        super(props);
        this.state = {
            todo: [],
        }
        this.getUTCTime = this.props.utcFunction;
        this.todayTodo = this.todayTodo.bind(this);
    }
    componentWillMount(){
        let sorted = this.todayTodo(this.props.todo)
        this.setState({
            todo: sorted,
        });
    }
    todayTodo(a){
        let c = new Date();
        let w = new Date(c.getFullYear(),c.getMonth(),c.getDate()).getTime();
        let d = new Date(c.getFullYear(),c.getMonth(),c.getDate()+1).getTime();
        let todayTodo = a.filter((v,i)=>{
            let time = this.getUTCTime(v);
            return w<=time&&time<=d;
        });
        return todayTodo;
    }
    insertTodo(mapArr, locationArr){
        if(locationArr.length === 0){
            return mapArr;
        }
        for(let i=0;i<locationArr.length;i++){
            let j = locationArr[i].hourLocation;
            let k = locationArr[i].minLocation;
            mapArr[j][k] = i;
        }
        return mapArr;
    }
    render(){
        //return null if todo format is not today
        if(this.props.format !== "today") return null;
        let hourArrValue = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
        let minArrValue = [0,5,10,15,20,25,30,35,40,45,50,55];
        let searchArrLocation = this.state.todo.map(v=>{
            let hourLocation = hourArrValue.indexOf(v.edit.time.hour);
            let minLocation = minArrValue.indexOf(v.edit.time.min);
            return {hourLocation: hourLocation, minLocation: minLocation};
        })
        let fullMapArr = Array(24).fill().map(v=>Array(12).fill(-1).map(v=>v));
        let insertTodoIn = this.insertTodo(fullMapArr, searchArrLocation);
        let finalMapArr = insertTodoIn.map((v,i)=>{
            let min = v.map((v,i)=>{
                if(v!==-1){
                    let todo = this.state.todo[v];
                    let star = todo.star?<span>&#9733;</span>:"";
                    return (
                        <div className={"min "+todo.priority+" type"+i%5} key={i}>
                            <span className="todo">
                                {star}
                                <span>{todo.name}</span>    
                            </span> 
                        </div>
                    )
                }
                return <div className="min" key={i}></div>;
            })
            let hour = hourArrValue[i]%12===0?12:hourArrValue[i]%12;
            let dayTime = i<12?"AM":"PM";
            let hourFormat = hour+dayTime;
            return (
                <div className="calendar-today-format-section" key={i}>
                    <span className="calendar-today-format-hour">{hourFormat}</span>
                    <div className="calendar-today-format-min" key={i}>
                        {min}
                    </div>
                </div>
            )
        })
        return <div className="calendar-today-format">{finalMapArr}</div>;
    }
}