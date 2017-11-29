import React, {Component} from 'react';
import './todayformat.css';

export default class TodayFormat extends Component {
    constructor(props){
        super(props);
        this.state = {
            todo: [],
        }
    }
    // shouldComponentUpdate(nextProps){
    //     if(!nextProps.todo){
    //         return false;
    //     }
    //     return true;
    // }
    componentWillUpdate(nextProps){
        //if null || undefined || [] than don't update
        if(!nextProps.todo || nextProps.todo.length === 0 ){
            return;
        }
        else if(nextProps.todo !== this.props.todo){
            this.setState({
                todo: nextProps.todo,
            })
        }
    }
    insertTodo(mapArr, locationArr){
        if(locationArr.length === 0){
            return [];
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
                        <div className={"min "+todo.priority} key={i}>
                            <span></span>
                            <span className="todo">
                                {star}
                                <span>{todo.name}</span>    
                            </span> 
                        </div>
                    )
                }
                return <div className="min" key={i}></div>;
            })
            return (
                <div className="calendar-today-format-section" key={i}>
                    <span className="calendar-today-format-hour">{hourArrValue[i]}</span>
                    <div className="calendar-today-format-min" key={i}>
                        {min}
                    </div>
                </div>
            )
        })
        return <div className="calendar-today-format">{finalMapArr}</div>;
    }
}