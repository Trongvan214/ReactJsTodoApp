import React, {Component} from 'react';
import './subtask.css';

export default class AddTask extends Component {
    constructor(props){
        super(props);
        this.state = {
            tasks: [],
            edit: false,
        }
        this.update = this.update.bind(this);
    }
    componentWillMount(){
        this.setState({
            tasks: this.props.setSubTask,
        });
    }
    handleSubmit(e){
        e.preventDefault();
        let bool = this.refs.subTask.value;//value but act like condition if empty
        if(bool){
            let update = this.state.tasks;
            let eachTask = {
                "name": bool,
                "isComplete": false,   
            }
            update.push(eachTask);
            this.props.getSubTask(update);
            e.target.reset();
        }
    }
    update(u){
        this.setState({
            tasks: u,
        })
        this.props.getSubTask(u);
    }
    edit(){
        this.setState({
            edit: !this.state.edit,
        })
    }
    render(){  
        return (
            <div className="sub-task">
                <form className="sub-task-container" onSubmit={(e)=>this.handleSubmit(e)}>
                    <label htmlFor="sub-task-symbol">&#43;</label>
                    <input type="text" id="sub-task-textbox" ref="subTask" placeholder="Add a subtask" />
                </form>
                <button className="sub-task-edit" type="text" onClick={()=>this.edit()}>Edit</button>
                <Task tasks={this.props.setSubTask} update={this.update} editMode={this.state.edit}/>
            </div>
        )
    }
}

class Task extends Component {
    taskComplete(i){
        let tasks = this.props.tasks;
        tasks[i].isComplete = !tasks[i].isComplete;
        this.props.update(tasks);
    }
    deleteSub(e,i){
        e.stopPropagation();
        let tasks = this.props.tasks;
        console.log(tasks);
        tasks.splice(i, 1);
        this.props.update(tasks);
    }
    render(){
        let opacityStyle = {
            "opacity": "0.6",
        }
        let hide = {
            "display": "none"
        }
        let show = {
            "display": "inline-block"
        }
        if(Array.isArray(this.props.tasks)){
            let task = this.props.tasks.map((v,i)=>{
                if(v.isComplete)
                {
                    return <li style={opacityStyle} className="sub-task-item" key={i} onClick={()=>this.taskComplete(i)}>
                                {v.name}<span style={this.props.editMode?show:hide} onClick={(e)=>this.deleteSub(e,i)}>X</span>
                            </li>
                }
                return  <li className="sub-task-item" key={i} onClick={()=>this.taskComplete(i)}>
                                {v.name}<span style={this.props.editMode?show:hide} onClick={(e)=>this.deleteSub(e,i)}>X</span>
                        </li>
            });
            return <ul>{task}</ul>
        }
        return <h1>Not a array</h1>
    }    
}

