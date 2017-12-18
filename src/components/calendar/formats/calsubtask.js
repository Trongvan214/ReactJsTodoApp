import React from 'react';

const CalSubtask = ({task}) => {
    if(task.length === 0 || !task){
        return null;
    }
    let tasks = task.tasks.map((v,i)=>{
        let check = v.isComplete?<span>&#10004;</span>:<span></span>;
        return (
            <div className="todo-cal-subtask-task" key={i}>
                {check}
                <span>{v.name}</span>
            </div>
        )
    });
    return (
        <div className="todo-cal-subtask">
            <div className="todo-cal-subtask-header">
                <span>Subtasks:</span>
                <span>Completed &#10004;</span>
            </div>
            {tasks}
        </div>
    )
}

export default CalSubtask;