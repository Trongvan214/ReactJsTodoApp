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
    componentDidMount(){
        const { todo } = this.props;
        this.setState({todo});
    }
    // componentDidUpdate(prevProps, prevStates){
    //     let isInfoDiff = prevProps.editIndex !== this.props.editIndex;
    //     if(isInfoDiff && this.props.editIndex === this.props.index){
    //         let todo = this.props.todo;
    //         this.setState({todo});
    //     }
    // }
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
    delete = (e) => {
        this.props.deleteTodo();
    }
    //*reminder to fix this messy coding for edit * 
    render(){
        //edit the todo
        const { todo } = this.state;
        return (
            <div className="edit-menu">
                <div className="edit-header">
                    <span className="edit-exit" onClick={this.exit}>&#x2039;</span>
                    <span className="edit-name">{todo.name}</span>
                    <span className="edit-delete glyphicon glyphicon-trash" onClick={this.delete}></span>
                </div>
                <div className="edit-body">
                    <DueDate getDate={this.getDate} setDate={todo.date}/>
                    <DueTime getTime={this.getTime} setTime={todo.time}/>
                    <Priority getPriority={this.getPriority}/>
                    <AddNote getNote={this.getNote} setNote={todo.note}/>
                    {/* <SubTask getSubTask={this.getSubTask} setSubTask={todo.subTasks}/> */}
                </div>
            </div>
        )
    }
}




