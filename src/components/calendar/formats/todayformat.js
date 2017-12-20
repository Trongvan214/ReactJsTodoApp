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
    todayTodo = (a) => {
        let c = new Date();
        let w = new Date(c.getFullYear(),c.getMonth(),c.getDate()).getTime();
        let d = new Date(c.getFullYear(),c.getMonth(),c.getDate()+1).getTime();
        let todayTodo = a.filter((v,i)=>{
            let time = this.getUTCTime(v);
            return w<=time&&time<=d;
        });
        return todayTodo;
    }
    insertTodo = (timeArr, todos) => {
        //put the todo in the right spot
        let hour;
        todos.forEach(v => {
            hour = v.edit.time.hour;
            timeArr[hour].push(v);
        });
        return timeArr;
    }
    enLargeTodos = (index) => {
        
    }
    render(){
        //return null if todo format is not today
        let time,dayTime,value;
        let hourArr = new Array(24).fill().map((v, i) => {
            time = i%12===0?12:i%12;
            dayTime = i<12?"AM":"PM";
            value = time+dayTime;
            return [value];
        })
        let insertedTodo = this.insertTodo(hourArr, this.state.todo);
        let finalMapArr = insertedTodo.map((v,i)=>{
            let time = v[0];
            let todos = null; 
        if(v.length > 1){
                //take out the time name
                v.shift();
                todos = v.map((value, index) => {
                    return <span className={"todo format-"+value.priority} key={index}></span>;
                });
            }
            return (
                <div key={i} className="calendar-today-format-time" onClick={()=>this.enLargeTodos(i)}>
                    <h4>{time}</h4>
                    <div className="calendar-today-format-todos">
                            {todos}
                    </div>
                </div>
            )
        })
        return <div className="calendar-today-format">{finalMapArr}</div>;
    }
}