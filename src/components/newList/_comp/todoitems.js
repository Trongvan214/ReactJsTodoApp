import React, {Component} from 'react';
import Edit from './edit';
import Delete from './delete';
import Option from './option';
import Star from './star';

export default class TodoItems extends Component {
    constructor(props){
        super(props);
        //this.updateStar = this.updateStar.bind(this);
    }
    editOption(){

    }
    edit(index){
        //let todos = JSON.parse(localStorage.getItem('todo'));

    }
    updateStar(e,index){
        e.target.classList.toggle('active');
        let todos = JSON.parse(localStorage.getItem('todo'));
        todos[index].star = !todos[index].star;
        localStorage.setItem('todo', JSON.stringify(todos));
    }
    deleteTodoItem(e,index){
        let todos = JSON.parse(localStorage.getItem('todo'));
        todos.splice(index, 1);
        localStorage.setItem('todo', JSON.stringify(todos));
        this.props.update(todos);
        //remove active from this todo
        e.target.parentNode.childNodes[0].classList.remove('active');

    }
    render(){
        if(this.props.todo != null) {
            var todos = this.props.todo.map((todo,index) => {
                return (
                    <li key={index}>
                        <Star onClick={(e)=>this.updateStar(e,index)} active={todo.star}/>
                        <span className="name">{todo.name}</span>
                        <Option />
                        <Edit onClick={()=>this.editOption}/>
                        <Delete onClick={(e)=>this.deleteTodoItem(e,index)}/>
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
            return <div></div>
        }
    }
}