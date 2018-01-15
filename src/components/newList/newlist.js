import React, {Component} from 'react';
import NewTodo from './newtodo/newtodo.js';
import TodoItems from './todoitem/todoitems.js';
import BackToMenu from '.././backtomenu/backtomenu.js';
import './newlist.css';

export default class NewList extends Component {
    state = {todo: JSON.parse(localStorage.getItem("todo"))};
    getTodo = (todo) => {
        var todos;
        if (localStorage.getItem('todo') === null) {
            todos = [];
            todos.push(todo);
        }
        else {
            todos = JSON.parse(localStorage.getItem('todo'));
            todos.push(todo);
        }
        localStorage.setItem('todo', JSON.stringify(todos));
        this.setState(() => ({todo: todos}));
    }
    updateTodo = (updated) => {
        this.setState(() => ({todo: updated}));
    }
    render(){
        return (
            <div className="newlist">
                <BackToMenu/>
                <NewTodo getTodo={this.getTodo}/>
                <TodoItems todo={this.state.todo} update={this.updateTodo}/>
            </div>
        );
    }
}
