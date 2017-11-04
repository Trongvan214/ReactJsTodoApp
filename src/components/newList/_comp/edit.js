import React, {Component} from 'react';
import DueDate from './duedate';
import DueTime from './duetime';
import Priority from './priority';
import SubTask from './subtask';
import AddNote from './addnote';
import './edit.css';

export default class Edit extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: '',
            time: '',
            priority: '',
            subTask: '',
            note: '',
            exit: true,
        }
        this.index = props.index;
        this.getDate = this.getDate.bind(this);
        this.getTime = this.getTime.bind(this);
        this.getPriority = this.getPriority.bind(this);
        this.getNote = this.getNote.bind(this);
        this.getSubTask = this.getSubTask.bind(this);
        this.saveInfo = this.saveInfo.bind(this);
        this.exitEdit = this.exitEdit.bind(this);
    }
    componentWillMount(){
        let info = this.props.info;
        if(info){
            this.setState({
                date: info.date,
                time: info.time,
                note: info.note,
                subTask: info.subTask,
            });
        }
        window.removeEventListener('beforeunload', this.saveInfo);
        //for phone to work
        window.removeEventListener('unload', this.saveInfo);
    }
    //save when refresh or exit
    componentDidMount(){
        window.addEventListener('beforeunload', this.saveInfo);
        //for phone to work
        window.addEventListener('unload', this.saveInfo);
    }
    getDate(date){
        this.setState({date: date});
    }
    getTime(time){
        this.setState({time: time});
    }
    getPriority(color){
        this.setState({priority: color});
    }
    getNote(note){
        this.setState({note: note});
    }
    getSubTask(updateTask){
        this.setState({
            subtask: updateTask,
        });
    }
    //toggle active
    exitEdit(){
        this.saveInfo();
        this.setState({exit: !this.state.exit});
    }
    //run when exit edit
    saveInfo(){
        let parseTodo = JSON.parse(localStorage.getItem('todo')); 
        let target = parseTodo.find((v,i)=>i===this.index);
        Object.assign(target.edit,{
            "date": this.state.date,
            "time": this.state.time,
            "note": this.state.note,
            "subTask": this.state.subTask,
        });
        let c = this.state.priority;
        let color = c==="green"?"green":c==="red"?"red":c==="#f4d942"?"yellow":"";
        Object.assign(target, {
            "priority": color,
        });
        localStorage.setItem('todo', JSON.stringify(parseTodo));
        //update the todo color
        this.props.updateColor(color, this.index);
    }
    render(){
        //edit the todo
        if(!this.state.exit){
            return (
                <div className="edit-menu">
                    <span className="todo-name">{this.props.name}</span>
                    <div className="edit-body">
                        <DueDate getDate={this.getDate} setDate={this.state.date}/>
                        <DueTime getTime={this.getTime} setTime={this.state.time}/>
                        <Priority getPriority={this.getPriority}/>
                        <AddNote getNote={this.getNote} setNote={this.state.note}/>
                        <SubTask getSubTask={this.getSubTask} setSubTask={this.state.subTask}/>
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