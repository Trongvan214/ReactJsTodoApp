import React, {Component} from 'react';
import Edit from './edit';
import Delete from './delete';
import Star from './star';

export default class TodoItems extends Component {
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
    render(){
        if(this.props.todo != null) {
            var todos = this.props.todo.map((eachTodo,index, arr) => {
                return (
                    <li key={index}>
                        <Star onClick={(e)=>this.updateStar(e,index)} active={eachTodo.star}/>
                        <span className="name">{eachTodo.name}</span>
                        <Edit name={eachTodo.name} info={eachTodo.edit} index={index}/>
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