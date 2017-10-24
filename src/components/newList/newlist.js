import React, {Component} from 'react';
import NewTodo from './_comp/newtodo';
import TodoItems from './_comp/todoitems';
import BackToMenu from '.././backtomenu/backtomenu';
import './newlist.css';

export default class NewList extends Component {
    constructor(props){
        super(props);
        this.getTodo = this.getTodo.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
        this.state = {
            todo: JSON.parse(localStorage.getItem("todo"))
        }
    }
    getTodo(todo){
        var todos;
        console.log(todo);
        if (localStorage.getItem('todo') == null) {
            todos = [];
            todos.push(todo);
            localStorage.setItem('todo', JSON.stringify(todos));
        }
        else {
            todos = JSON.parse(localStorage.getItem('todo'));
            todos.push(todo);
            localStorage.setItem('todo', JSON.stringify(todos));
          }
        var parseTodo = JSON.parse(localStorage.getItem('todo'));
        this.setState({
            todo: parseTodo
        });
    }
    updateTodo(updated){
        this.setState({
            todo: updated,
        })
    }
    render(){
        if(this.props.show === "new"){
            return (
                <div className="newlist">
                    <BackToMenu onClick={this.props.return}/>
                    <NewTodo getTodo={this.getTodo}/>
                    <TodoItems todo={this.state.todo} update={this.updateTodo}/>
                </div>
            );
        }
        else {
            return null;
        }
    }
}
