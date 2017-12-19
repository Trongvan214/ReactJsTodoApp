import React, {Component} from 'react';

export default class NewTodo extends Component {
    addTodo = (e) => {
        e.preventDefault();
        if(this.refs.name.value){
            var todo = {
                "name": this.refs.name.value,
                "priority": '',
                "format": 0,
                "star": false,
                "startDeleteTimer": null,
                "edit": {
                    "date": null,
                    "time": null,
                    "note": '',
                    "subTask": {
                        "tasks": [],
                        "active": 0,
                    },
                },
            }
            //return back the new todo 
            this.props.getTodo(todo);
        }
        e.target.reset();
    }
    render(){
        return (
            <div>
                <form onSubmit={this.addTodo}>
                    <div className="add-todo">
                        <span className="plus-sign">+</span>
                        <input type="text" ref="name" placeholder="Add a todo..."/>
                        <button type="submit">Add</button>
                        </div>
                </form>
            </div>
        );
    }
}