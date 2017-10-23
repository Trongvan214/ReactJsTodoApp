import React, {Component} from 'react';
import Edit from './edit';
import Delete from './delete';
import Option from './option';

export default class TodoItems extends Component {
    edit(index){
        let todos = JSON.parse(localStorage.getItem('todo'));

    }
    options(){
        
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
                        <span className="star"></span>
                        <Option onClick={this.options.bind(this)}/>
                        <Edit onClick={this.options.bind(this)} />
                        <Delete onClick={this.deleteTodoItem.bind(this,index)} />
                        {/*<span className="edit" onClick={this.edit.bind(this, index)}>Edit</span>
                        <span className="options" onClick={this.options.bind(this)}>...</span>
                        <span className="delete" onClick={this.deleteTodoItem.bind(this, index)}>Delete</span>
                        */}
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