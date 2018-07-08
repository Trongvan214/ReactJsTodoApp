import React, {Component} from 'react';
import DueDate from './date/duedate';
import DueTime from './time/duetime';
import Priority from './priority/priority';
import SubTask from './subtask/subtask';
import AddNote from './note/addnote';
import './edit.css';

export default class Edit extends Component {
    state = {
        todo: {},
    }
    componentDidUpdate(prevProps, prevStates){
        let isInfoDiff = prevProps.editIndex !== this.props.editIndex;
        if(isInfoDiff && this.props.editIndex === this.props.index){
            let todo = this.props.todo;
            this.setState({todo});
        }
    }
    getDate = (date,formattedDate) => {
        this.setState({todo: { ...this.state.todo, date }});
    }
    getTime = (time,formattedTime) => {
        this.setState({todo: { ...this.state.todo, time }});
    }
    getPriority = (priority) => {
        this.setState({todo: { ...this.state.todo, priority }});
    }
    getNote = (note) => {
        this.setState({todo: { ...this.state.todo, note }});
    }
    getSubTask = (subTasks) => { 
        this.setState({todo: { ...this.state.todo, subTasks }});
    }
    //run when exit edit
    exit = (e) => {
        //need this to prevent parent events triggering
        e.stopPropagation();
        //update the todo 
        this.props.updateTodo(this.state.todo);
    }
    render(){
        //edit the todo
        if(this.props.editIndex !== this.props.index) return null;
        return (
            <div className="edit-menu">
                <span className="todo-name">{this.props.name}</span>
                <div className="edit-body">
                    <DueDate getDate={this.getDate} setDate={this.state.todo.date}/>
                    <DueTime getTime={this.getTime} setTime={this.state.todo.time}/>
                    <Priority getPriority={this.getPriority}/>
                    <AddNote getNote={this.getNote} setNote={this.state.todo.note}/>
                    <SubTask getSubTask={this.getSubTask} setSubTask={this.state.todo.subTask}/>
                    <span className="edit-exit" onClick={this.exit}>&#10006;</span>
                </div>
            </div>
        )
    }
}







// if(!this.state.exit){
//     return (
//         <div className="edit-menu">
//             <span className="todo-name">{this.props.name}</span>
//             <div className="edit-body">
//                 <DueDate getDate={this.getDate} setDate={this.state.date}/>
//                 <DueTime getTime={this.getTime} setTime={this.state.time}/>
//                 <Priority getPriority={this.getPriority}/>
//                 <AddNote getNote={this.getNote} setNote={this.state.note}/>
//                 <SubTask getSubTask={this.getSubTask} setSubTask={this.state.subTask}/>
//                 <span className="edit-exit" onClick={this.exitEdit}>&#10006;</span>
//             </div>
//         </div>
//     )
// }
// else {
//     //edit button on each todo
//     return <span className="edit" onClick={this.exitEdit}>&#9998;</span>;
// }