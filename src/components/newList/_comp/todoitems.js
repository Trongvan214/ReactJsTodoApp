import React, {Component} from 'react';
import Edit from './edit';
import Delete from './delete';
import Option from './option';
import Star from './star';

export default class TodoItems extends Component {
    edit(index){
        let todos = JSON.parse(localStorage.getItem('todo'));

    }
    options(){
        
    }
    star(){

    }
    deleteTodoItem(index){
        let todos = JSON.parse(localStorage.getItem('todo'));
        todos.splice(index, 1);
        localStorage.setItem('todo', JSON.stringify(todos));
        this.props.update(todos);
    }
    render(){
        if(this.props.todo != null) {
            var todos = this.props.todo.map((todo,index) => {
                return (
                    <li key={index}>
                        <span className="name">{todo}</span>
                        <Star onClick={this.star.bind(this)} />
                        <Option onClick={this.options.bind(this)}/>
                        <Edit onClick={this.options.bind(this)} />
                        <Delete onClick={this.deleteTodoItem.bind(this,index)} />
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