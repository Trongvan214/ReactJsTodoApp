import React, {Component} from 'react';
import DueDate from './duedate';
export default class Edit extends Component {
    constructor(props){
        super(props);
        this.state = {
            exit: true,
            pickedDate: '',
        }
        this.exitEdit = this.exitEdit.bind(this);
    }
    //toggle active
    exitEdit(){
        this.setState({exit: !this.state.exit});
    }
    getDate(date){
        this.setState({pickedDate: date});
    }
    render(){
        //edit the todo
        if(!this.state.exit){
            return (
                <div className="edit-menu">
                    <span className="todo-name">{this.props.name}</span>
                    <div className="due-date">
                        <span className="due-date-symbol" role="img" aria-label="cal">&#x1F4C5;</span>
                        <span className="due-date-text">Due Date {this.state.pickedDate}</span>
                        <span className="due-date-button">&#9660;</span>
                        <DueDate getDate={this.getDate.bind(this)} />
                    </div>
                    <div className="due-time">

                    </div>
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
            )
        }
        else {
            //edit button on each todo
            return <span className="edit" onClick={this.exitEdit}>&#9998;</span>;
        }
    }
}