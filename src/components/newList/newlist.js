import React, {Component} from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import TodoItems from './todoitem/todoitems.js';
import './todo.css';

export default class NewList extends Component {
    constructor(props){
        super(props);
        this.state = {todos: []};
        this.countID = 0;
    }
    componentDidMount(){
        let todos = JSON.parse(localStorage.getItem("todo")) 
        if(todos){
            this.setState(() => ({todos}));
        }
    }
    componentDidUpdate(prevProps, prevState){  
        //update to localstorage
        localStorage.setItem('todo', JSON.stringify(this.state.todos));
    }
    addTodo = (e) => {
        e.preventDefault();
        if(this.refs.name.value){
            let todo = {
                "id": this.countID,
                "name": this.refs.name.value,
                "priority": '',
                "star": false,
                "date": null,
                "time": null,
                "note": '',
                "subTasks": {
                    "tasks": [],
                    "active": 0,
                },
            }
            let { todos } = this.state;
            todos.push(todo);
            this.setState(() => ({todos}));
            this.countID++;
        }
        e.target.reset();
    }
    updateTodo = (todos) => {
        this.setState(() => ({todos}));
    }
    render(){
        return (
            <div className="todo shadow">
                <nav>
                    <ul>
                        <li><Link to="/calendar">Calender</Link></li>
                    </ul>
                </nav>
                <div className="nt">
                    <form onSubmit={this.addTodo}>
                        <input type="text" ref="name" placeholder="Add a todo..."/>
                        <span className="nt-plus-sign">+</span>
                    </form>
                </div>
                <TodoItems todos={this.state.todos} update={this.updateTodo}/>
            </div>
        );
    }
}

{/* <div className="create-todo-button-wrapper">
<span className="create-todo-button">
</span>
</div> */}
