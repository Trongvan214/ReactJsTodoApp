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
        
        }
        this.subLength = info.subTask.length;
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
        console.log(this.subLength);
        //if not subtask is not 0
        if(this.subLength !== 0){
            this.subTaskLBool = true;
            console.log("true");
        }
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
        console.log('save');
        let parseTodo = JSON.parse(localStorage.getItem('todo')); 
        let target = parseTodo.find((v,i)=>i===this.index);
        Object.assign(target.edit,{
            "date": this.state.date,
            "time": this.state.time,
            "note": this.state.note,
            "subTask": {
                tasks: this.state.subTask,
                length: this.subLength,
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
        this.props.updateTodo(this.state.date,this.state.time,color,this.subLength,this.index, this.findFormat());
    }
    findFormat(){
        let subTaskLBool = this.subTaskLBool;
        let dateBool = this.dateBool;
        let timeBool = this.timeBool;
        if(subTaskLBool && dateBool && timeBool){
            return 3;
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
        else
        {
            //return the current format 
            return this.props.format;
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