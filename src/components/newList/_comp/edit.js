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
        this.initialState = {
            date: '',
            time: '',
            priority: '',
            subTask: [],
            note: '',
            exit: true,
        }
        this.state = this.initialState;
        this.index = props.index;

        //function binding
        this.getDate = this.getDate.bind(this);
        this.getTime = this.getTime.bind(this);
        this.getPriority = this.getPriority.bind(this);
        this.getNote = this.getNote.bind(this);
        this.getSubTask = this.getSubTask.bind(this);
        this.saveInfo = this.saveInfo.bind(this);
        this.exitEdit = this.exitEdit.bind(this);
        this.findFormat = this.findFormat.bind(this);
    }
    //update 
    componentDidUpdate(nextProps, nextStates){
        if(nextProps !== this.props){
            let info = this.props.info;
            if(info){
                this.setState({
                    date: info.date,
                    time: info.time,
                    priority: this.props.priority,
                    note: info.note,
                    subTask: info.subTask.tasks,
                }); 
                this.subLength = info.subTask.active;
            }
            //have to run this to keep track of subTaskLBool
            //the other 2 bool get called auto
            this.getSubTask(info.subTask.tasks);
        }
    }
    componentWillMount(){
        let info = this.props.info;
        if(info){
            this.setState({
                date: info.date,
                time: info.time,
                priority: this.props.priority,
                note: info.note,
                subTask: info.subTask.tasks,
            }); 
            this.subLength = info.subTask.active;
            console.log(info.subTask.active);
        }
        this.subTaskLBool = false;
        this.dateBool = false;
        this.timeBool = false;
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
    getDate(rawDate,formattedDate){
        this.dateBool = false;
        if(rawDate != null){
            this.dateBool = true;
        }
        this.setState({date: rawDate});
    }
    getTime(rawTime,formattedTime){
        this.timeBool = false;
        if(rawTime != null){
            this.timeBool = true;
        }
        this.setState({time: rawTime});
    }
    getPriority(color){
        this.setState({priority: color});
    }
    getNote(note){
        this.setState({note: note});
    }
    getSubTask(updateTask){
        //reset to calculation the tasks again
        this.subTaskLBool = false;
        this.subLength = 0;
        updateTask.map(v=>{
            if(!v.isComplete){
                this.subLength+=1;
            }
            return v;
        })
        //if not subtask is not 0
        if(this.subLength !== 0){
            this.subTaskLBool = true;
        }
        this.setState({
            subTask: updateTask,
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
            "subTask": {
                "tasks": this.state.subTask,
                "active": this.subLength,
            },
        });
        let c = this.state.priority;
        let color = c==="green"?"green":c==="red"?"red":c==="#f4d942"?"yellow":"";
        Object.assign(target, {
            "priority": color,
            "format": this.findFormat(),
        });
        localStorage.setItem('todo', JSON.stringify(parseTodo));
        //update the todo 
        this.props.updateTodo();
    }
    findFormat(){
        let subTaskLBool = this.subTaskLBool;
        let dateBool = this.dateBool;
        let timeBool = this.timeBool;
        let prevFormat = this.props.format;
        if(subTaskLBool && dateBool && timeBool){
            return 3;
        }
        else if(((subTaskLBool===false) && (dateBool===false) && (timeBool===false)) && this.subLength === 0){
            return 1;
        }
        else if(dateBool&&timeBool){
            return 2;
        }
        //cases with sub tasks
        else if(subTaskLBool || (dateBool&&subTaskLBool) || (subTaskLBool&&timeBool)){
            return 4;
        }
        else if(dateBool || timeBool) {
            return 1;
        }
        else {
            return prevFormat;
        }
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