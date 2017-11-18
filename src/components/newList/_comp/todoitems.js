import React, {Component} from 'react';
import Edit from './edit';
import Delete from './delete';
import Star from './star';

export default class TodoItems extends Component {
    constructor(props){
        super(props);
        this.state = {
            color: 'none',
        }
        this.updateTodo = this.updateTodo.bind(this);
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
        //remove this element active class
        e.target.parentNode.childNodes[2].classList.remove('active');
        //take out todo at that index
        let todos = JSON.parse(localStorage.getItem('todo'));
        todos.splice(index, 1);
        localStorage.setItem('todo', JSON.stringify(todos));
        //update back to the parent
        this.props.update(todos);
    }
    updateDate(d){
        if(d != null){
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
        if(t != null){
            let min = t.min;
            let hour = t.hour;
            //same formated to figure out am or pm
            let dayTime = hour<11||hour===23? "AM" : "PM";
            //get 2 digit value for min
            min = ("0"+min).slice(-2);
            let displayTime = (hour%12)+1+":"+min+dayTime;
            return displayTime;
        }
        return ""; //return nothing
    }
    updateTodo(date,time,color,subTaskL,index){
        let dateBool, timeBool, subTaskLBool, formated;
        dateBool = timeBool = subTaskLBool = false;
        this.refs["item-"+index].className = "todo-item "+ color;
        //default   
        this.refs["item-date-"+index].innerHTML = '';
        this.refs["item-time-"+index].innerHTML = '';
        this.refs["item-sub-length-"+index].innerHTML = '';
        if(subTaskL !== 0){
            this.refs["item-sub-length-"+index].innerHTML = subTaskL;
            subTaskLBool = true;
        }
        if(date){
            this.refs["item-date-"+index].innerHTML = this.updateDate(date);
            dateBool = true;
        }
        if(time){
            this.refs["item-time-"+index].innerHTML = this.updateTime(time);
            timeBool = true;
        }
        //choose the formated
        if(subTaskLBool && dateBool && timeBool){
            formated = 3;
        }
        else if((dateBool&&timeBool) || (dateBool&&subTaskLBool) || (subTaskLBool&&timeBool)){
            formated = 2;
        }
        else if(subTaskLBool || dateBool || timeBool) {
            formated = 1;
        }
        else {
            formated = 0;
        }
        console.log(formated);
        this.refs["item-format-"+index].className = "format-"+formated;
        this.render();
    }
    render(){
        if(this.props.todo != null) {
            var todos = this.props.todo.map((eachTodo,index, arr) => {
                let updateD = this.updateDate(eachTodo.edit.date);
                let updateT = this.updateTime(eachTodo.edit.time);
                return (
                    <li key={index} className={"todo-item "+eachTodo.priority} ref={"item-"+index}>
                        <Star onClick={(e)=>this.updateStar(e,index)} active={eachTodo.star}/>
                        <span className="name">{eachTodo.name}</span>
                        <div ref={"item-format-"+index}>
                            <span className="date" ref={"item-date-"+index}>{updateD}</span>
                            <span className="time" ref={"item-time-"+index}>{updateT}</span>
                            <span className="sub-length" ref={"item-sub-length-"+index}></span>
                        </div>
                        <Edit name={eachTodo.name} index={index} info={eachTodo.edit} updateColor={this.updateTodo} priority={eachTodo.priority}/>
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