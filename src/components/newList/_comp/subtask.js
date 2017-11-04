import React, {Component} from 'react';

export default class AddTask extends Component {
    handleSubmit(e){
        e.preventDefault();
        let bool = this.refs.subTask.value;//value but act like condition if empty
        if(bool){
            let update = this.props.setSubTask;
            update.push(bool);
            this.props.getSubTask(update);
            e.target.reset();
        }
    }
    render(){  
        return (
            <form className="sub-task-container" onSubmit={(e)=>this.handleSubmit(e)}>
                <label htmlFor="sub-task-symbol">&#43;</label>
                <input type="text" id="sub-task-textbox" ref="subTask" placeholder="Add a subtask" />
                <Task tasks={this.props.setSubTask}/>
            </form>
        )
    }
}

const Task = ({tasks}) => {
    if(Array.isArray(tasks)){
        let task = tasks.map((v,i)=>{
            return <li className="sub-task-item" key={i}>{v}</li>
        });
        return <ul>{task}</ul>
    }
    return <h1>Not a array</h1>
}
