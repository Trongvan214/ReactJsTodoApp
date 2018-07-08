import React, {Component} from 'react';
import Edit from './edit/edit.js';
import './todoitem.css';

export default class TodoItems extends Component {
    state = {
        editIndex: -1,
        hi: false,
    };
    updateStar = (e,index) => {
        e.stopPropagation();
        e.target.classList.toggle('active');

        const { todos } = this.props;
        todos[index].star = !todos[index].star;
        this.props.update(todos);
    }
    deleteTodo = (index) => {
        const { todos } = this.props;
        todos.splice(index, 1);
        this.props.update(todos);
    }
    updateTodo = (todo) => {
        const { todos } = this.props;
        todos[this.state.editIndex] = todo;  
        this.setState(() => ({editIndex: -1}));
        this.props.update(todos);
    }
    editTodo = (e,index) => {
        this.setState({editIndex: index});
    }
    render(){
        const { todos } = this.props;

        if(!todos) return null;
        let displayTodos = todos.map((todo,index) => {
            return (
                <li 
                    key={index} 
                    className={"ti-item "+todo.priority} 
                    ref={"item-"+index}
                    onClick={(e)=>this.editTodo(e,index)}
                >
                    <div className="ti-item-content">
                        <div className="ti-name">
                            <span 
                                className={todo.star ? " ti-star active" : "ti-star"} 
                                onClick={(e)=>this.updateStar(e,index)}>
                            </span>
                            <h1>{shortenName(todo.name)}</h1>
                        </div>
                        <div className="ti-time-info">
                            <span className="ti-time-date" ref={"item-date-"+index}>{updateDate(todo.date)}</span>
                            <span className="ti-time-time" ref={"item-time-"+index}>{updateTime(todo.time)}</span>
                        </div>
                        <span 
                            className="ti-subtask-length" 
                            ref={"item-sub-length-"+index}
                        >
                            {todo.subTasks.active ? todo.subTasks.active : ""}
                        </span>
                        <Edit   key={index}
                                index={index} 
                                todo={todo} 
                                updateTodo={this.updateTodo} 
                                editIndex={this.state.editIndex}
                        />
                        <span className="ti-delete" onClick={()=>this.deleteTodo(index)}>&#10006;</span>
                    </div>
                </li>
            )
        });

        return (
            <div className="ti">
                <ul>
                    {displayTodos}
                </ul>
            </div>
        )
    }
}

//if name of todo is longer than a certain amount replace it with 3 dots
let shortenName = (name) => {
    if(name.length < 15){
        return name;
    }
    else {
        let sName = name.slice(0, 15) + '...';
        return sName;
    }
}

//update the time today, yesterday, tommrrow, or date 
let updateDate = (d) => {
    if(d){
        let userDate = new Date(d.year,d.month,d.date);
        let dateString = userDate.toDateString();
        let c = new Date();
        let cYear = c.getFullYear();
        let cMonth = c.getMonth();
        let cDate = c.getDate();
        if(dateString === new Date(cYear, cMonth, cDate).toDateString()){
            dateString = "Today";
        }
        else if(dateString === new Date(cYear, cMonth, cDate-1).toDateString()){
            dateString = "Yesterday";
        } 
        else if(dateString === new Date(cYear, cMonth, cDate+1).toDateString()){
            dateString = "Tommorrow";
        }
        return dateString;
    }
    return ""; //return nothing
    
}
let updateTime = (t) => {
    if(t){
        //format time
        let hour = t.hour%12===0?12:t.hour%12;
        let min = ("0"+t.min).slice(-2);
        let dayTime = hour<12? "AM" : "PM";
        let displayTime = hour+":"+min+dayTime;
        return displayTime;
    }
    return ""; //return nothing
}