import React, {Component} from 'react';
import Edit from './edit/edit.js';
import Delete from './option/delete.js';
import Star from './edit/star/star.js';

export default class TodoItems extends Component {
    constructor(props){
        super(props);
        this.state = {
            color: 'none',
        }
        this.updateTodo = this.updateTodo.bind(this);
    }
    componentWillMount(){
        let parseTodo = JSON.parse(localStorage.getItem('todo'));
        for(let i=0;i<parseTodo.length;i++){
            let todoDeleteTimer = parseTodo[i].startDeleteTimer;
            let curr = new Date().getTime();
            let diff = todoDeleteTimer==null?0:curr-todoDeleteTimer;
            if(diff>172800000){
                parseTodo.splice(i, 1);
            }
        }
        localStorage.setItem('todo', JSON.stringify(parseTodo));
        //update back to the parent
        this.props.update(parseTodo);
    }
    updateStar(e,index){
        //toggle active
        e.target.classList.toggle('active');
        //save it in localstorage and update it
        let todos = JSON.parse(localStorage.getItem('todo'));
        todos[index].star = !todos[index].star;
        localStorage.setItem('todo', JSON.stringify(todos));
        this.props.update(todos);
    }
    deleteTodoItem(e, index, len){
        console.log(index);
        //take out todo at that index
        let parseTodo = JSON.parse(localStorage.getItem('todo'));
        parseTodo.splice(index, 1);
        localStorage.setItem('todo', JSON.stringify(parseTodo));
        //update back to the parent
        this.props.update(parseTodo);
    }
    updateDate(d){
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
    updateTime(t){
        if(t){
            let hour = t.hour%12===0?12:t.hour%12;
            let min = ("0"+t.min).slice(-2);
            //same formated to figure out am or pm
            let dayTime = hour<12? "AM" : "PM";
            let displayTime = hour+":"+min+dayTime;
            return displayTime;
        }
        return ""; //return nothing
    }
    updateTodo(){
        //re render
        let todos = JSON.parse(localStorage.getItem('todo'));
        this.props.update(todos);
    }
    render(){
        if(this.props.todo != null) {
            var todos = this.props.todo.map((eachTodo,index, arr) => {
                let updateD = this.updateDate(eachTodo.edit.date);
                let updateT = this.updateTime(eachTodo.edit.time);
                let updateSTL = eachTodo.edit.subTask.active?"Tasks " + eachTodo.edit.subTask.active:"";
                return (
                    <li key={index} className={"todo-item "+eachTodo.priority+" format-"+eachTodo.format} ref={"item-"+index}>
                        <Star onClick={(e)=>this.updateStar(e,index)} active={eachTodo.star}/>
                        <div className="name-subtask">
                            <span className="name">{eachTodo.name}</span>
                            <span className="sub-length" ref={"item-sub-length-"+index}>{updateSTL}</span>
                        </div>
                        <div className="date-info">
                            <span className="date" ref={"item-date-"+index}>{updateD}</span>
                            <span className="time" ref={"item-time-"+index}>{updateT}</span>
                        </div>
                        <Edit   name={eachTodo.name}
                                index={index} 
                                info={eachTodo.edit} 
                                updateTodo={this.updateTodo} 
                                priority={eachTodo.priority}
                                format={eachTodo.format} />
                        <Delete onClick={(e)=>this.deleteTodoItem(e,index,arr.length)}/>
                    </li>
                )
            });
            return (
                <ul className="todo-ul">
                    {todos}
                </ul>
            );
        }
        else {
            return null;
        }
    }
}