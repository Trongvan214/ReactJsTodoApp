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
        this.updateColor = this.updateColor.bind(this);
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
    updateColor(date,time,color,index){
        this.refs["item-"+index].className = "todo-item "+ color;
        //default   
        this.refs["item-date-"+index].innerHTML = '';
        this.refs["item-time-"+index].innerHTML = '';
        if(date){ //when not undefined print out
            this.refs["item-date-"+index].innerHTML = this.updateDate(date);
        }
        if(time){
            this.refs["item-time-"+index].innerHTML = this.updateTime(time);
        }
        this.render();
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
    render(){
        if(this.props.todo != null) {
            var todos = this.props.todo.map((eachTodo,index, arr) => {
                let updateD = this.updateDate(eachTodo.edit.date);
                let updateT = this.updateTime(eachTodo.edit.time);
                return (
                    <li key={index} className={"todo-item "+eachTodo.priority} ref={"item-"+index}>
                        <Star onClick={(e)=>this.updateStar(e,index)} active={eachTodo.star}/>
                        <span className="name">{eachTodo.name}</span>
                        <div className="date-info">
                            <span className="date" ref={"item-date-"+index}>{updateD}</span>
                            <span className="time" ref={"item-time-"+index}>{updateT}</span>
                        </div>
                        <Edit name={eachTodo.name} index={index} info={eachTodo.edit} updateColor={this.updateColor} priority={eachTodo.priority}/>
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