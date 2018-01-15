import React, {Component} from 'react';
import Edit from './edit/edit.js';
import Delete from './option/delete.js';
import Star from './edit/star/star.js';
import ArrowDown from './scroll_up_down/arrowdown.js';
import ArrowUp from './scroll_up_down/arrowup.js';

export default class TodoItems extends Component {
    state = {
        color: 'none', 
        scrollTranslate: 0,
    };
    componentWillMount(){
        let parseTodo = JSON.parse(localStorage.getItem('todo'));
        if(parseTodo){
            for(let i=0;i<parseTodo.length;i++){
                let todoDeleteTimer = parseTodo[i].startDeleteTimer;
                let curr = new Date().getTime();
                let diff = todoDeleteTimer==null?0:curr-todoDeleteTimer;
                if(diff>172800000){
                    parseTodo.splice(i, 1);
                }
            }
        }
        localStorage.setItem('todo', JSON.stringify(parseTodo));
        //update back to the parent
        this.props.update(parseTodo);
    }
    updateStar = (e,index) => {
        //toggle active
        e.target.classList.toggle('active');
        //save it in localstorage and update it
        let todos = JSON.parse(localStorage.getItem('todo'));
        todos[index].star = !todos[index].star;
        localStorage.setItem('todo', JSON.stringify(todos));
        this.props.update(todos);
    }
    deleteTodoItem = (e, index, len) => {
        //take out todo at that index
        let parseTodo = JSON.parse(localStorage.getItem('todo'));
        parseTodo.splice(index, 1);
        localStorage.setItem('todo', JSON.stringify(parseTodo));
        //update back to the parent
        this.props.update(parseTodo);
    }
    updateDate = (d) => {
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
    updateTime = (t) => {
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
    updateTodo = () => {
        //re render
        let todos = JSON.parse(localStorage.getItem('todo'));
        this.props.update(todos);
    }

    //functions for scrolling through todos
    scrollDown = () => {
        this.setState((prevState) => {
            return {
                scrollTranslate: prevState.scrollTranslate-50,
            }
        });
    }
    scrollUp = () => {
        this.setState((prevState) => {
            return {
                scrollTranslate: prevState.scrollTranslate+50,
            }
        });
    }
    render(){
        if(this.props.todo) {
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
                                format={eachTodo.format} 
                        />
                        <Delete onClick={(e)=>this.deleteTodoItem(e,index,arr.length)}/>
                    </li>
                )
            });
            let length = this.props.todo.length;
            let height = length?  length * 50 : 0;
            let clickCount = -this.state.scrollTranslate/50;
            let transformStyles = {
                "transform": "translateY("+this.state.scrollTranslate+"px)",
            }
            let widthStyles = {
                "height": height,
            }  
            console.log(clickCount)
            let showArrowDownBool = shouldDisplayArrowDown(length, clickCount);
            let showArrowUpBool = shouldDisplayArrowUp(length, clickCount);
            return (
                <div className="todo-container">
                   <ArrowUp show={showArrowUpBool} update={this.scrollUp}/>
                   <div className="todo-ul-container" style={widthStyles}>
                        <ul className="todo-ul" style={transformStyles}>
                            {todos}
                        </ul>
                   </div>
                    <ArrowDown show={showArrowDownBool} update={this.scrollDown}/>          
                </div>
            )
        }
        else {
            return null;
        }
    }
}
let shouldDisplayArrowDown = (length, clickCount) => {
    if(length > 9 && length-(9+clickCount) > 0){
        return true;
    }
    return false
}

let shouldDisplayArrowUp = (length, clickCount) => {
    if(clickCount > 0){
        return true;
    }
    return false;
}