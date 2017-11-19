import React, {Component} from 'react';

export default class NewTodo extends Component {
    constructor(props){
        super(props);
        this.addTodo = this.addTodo.bind(this);
        this.state = {
            newTodo: {},
        }
    }
    addTodo(e){
        e.preventDefault();
        if(this.refs.name.value){
            var todo = {
                "name": this.refs.name.value,
                "priority": '',
                "format": 0,
                "star": false,
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
            this.setState({newTodo: todo}, () => this.props.getTodo(this.state.newTodo));
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