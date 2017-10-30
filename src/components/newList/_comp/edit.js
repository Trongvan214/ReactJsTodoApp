import React, {Component} from 'react';
import DueDate from './duedate';
import DueTime from './duetime';
import Priority from './priority';
import './edit.css';

export default class Edit extends Component {
    constructor(props){
        super(props);
        this.state = {
            exit: true,
        }
        this.exitEdit = this.exitEdit.bind(this);
    }
    //toggle active
    exitEdit(){
        this.setState({exit: !this.state.exit});
    }
    render(){
        //edit the todo
        if(!this.state.exit){
            return (
                <div className="edit-menu">
                    <span className="todo-name">{this.props.name}</span>
                    <div className="edit-body">
                        <DueDate />
                        <DueTime />
                        <Priority />
                        <div className="sub-task">
                            <span className="sub-task-symbol">&#43;</span>
                            <input type="text" className="sub-task-textbox" placeholder="Add a subtask" />
                        </div>
                        <div className="add-note">
                            <span className="add-note-symbol">&#9998;</span>
                            <input type="text" className="add-note-textbox" placeholder="Add a note.." />
                        </div>
                        <span className="edit-exit" onClick={this.exitEdit}>&#10006;</span>
                    </div>
                </div>
            )
        }
        else {
            //edit button on each todo
            return <span className="edit" onClick={this.exitEdit}>&#9998;</span>;
        }
    }
}