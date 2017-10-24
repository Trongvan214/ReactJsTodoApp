import React, {Component} from 'react';
import Edit from './edit';
import Delete from './delete';
import Option from './option';
import Star from './star';

export default class TodoItems extends Component {
    // constructor(props){
    //     super(props);
    // }
    optionActive(e,index){
        e.target.classList.toggle('active');
    }
    editOption(){

    }
    edit(index){
        //let todos = JSON.parse(localStorage.getItem('todo'));

    }
    updateStar(e,index){
        e.target.classList.toggle('active');
        let todos = JSON.parse(localStorage.getItem('todo'));
        todos[index].star.active = !todos[index].star.active;
        localStorage.setItem('todo', JSON.stringify(todos));
        this.props.update(todos);
    }
    deleteTodoItem(e,index, len){
        //remove option active from all todo
        for(var i = 0;i < len;i++){
            e.target.parentNode.parentNode.childNodes[i].childNodes[2].classList.remove('active');
        }
        //take out todo at that index
        let todos = JSON.parse(localStorage.getItem('todo'));
        todos.splice(index, 1);
        localStorage.setItem('todo', JSON.stringify(todos));
        //update back to the parent
        this.props.update(todos);
    }
    render(){
        if(this.props.todo != null) {
            var todos = this.props.todo.map((eachTodo,index, arr) => {
                return (
                    <li key={index}>
                        <Star onClick={(e)=>this.updateStar(e,index)} active={eachTodo.star.active}/>
                        <span className="name">{eachTodo.name}</span>
                        <Option onClick={(e)=>this.optionActive(e,index)} />
                        <Edit onClick={()=>this.editOption}/>
                        <Delete onClick={(e)=>this.deleteTodoItem(e,index,arr.length)}/>
                    </li>
                )
            });
            return (
                <ul className="todo-items">
                    {todos}
                </ul>
            );
        }
        else {
            return null;
        }
    }
}