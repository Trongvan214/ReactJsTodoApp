import React, {Component} from 'react';
import DueDate from './date/duedate';
import DueTime from './time/duetime';
import Priority from './priority/priority';
import SubTask from './subtask/subtask';
import AddNote from './note/addnote';
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
            //run function to figure out bools
            this.getSubTask(info.subTask.tasks);
            this.getDate(info.date);
            this.getTime(info.time);
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
        console.log(color);
        this.setState({priority: color});
    }
    getNote(note){
        this.setState({note: note});
    }
    getSubTask(updateTask){
        //reset to calculation the tasks again
        this.subLength = 0;
        this.subTaskLBool = false;
        if(updateTask){
            updateTask.forEach(v=>{
                if(!v.isComplete){
                    this.subLength+=1;
                }
            })
        }
        else {
            this.subLength = 0;
        }
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
        //testing for not saving when open
        if(this.state.exit){
            return;
        }
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
        let timeArray = this.getPastDue(this.state.date,this.state.time);
        if(timeArray < 0 && target.startDeleteTimer == null){
            Object.assign(target, {
                "startDeleteTimer": new Date().getTime(),
            });
        }
        else if(timeArray > 0){
            Object.assign(target, {
                "startDeleteTimer": null,
            });
        }
        Object.assign(target, {
            "priority": this.state.priority,
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
    getPastDue(date,time){
        let arr = [];
        //merge the objects together
        let data = Object.assign({}, date, time);
        //delete the color object
        delete data.color;
        let timeUTC;
        //if no time given than return 0
        if(Object.keys(data).length !== 0 && data.year){
            for(let prop in data){
                arr.push(data[prop]);
            }
            timeUTC = new Date(...arr).getTime();
        }
        else {
            return 0;
        }
        let curr = new Date().getTime();
        return timeUTC-curr;
    };
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