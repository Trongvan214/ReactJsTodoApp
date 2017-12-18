import React, {Component} from 'react';
import CalTime from './caltime';
import CalDate from './caldate';
import CalNote from './calnote';
import CalSubtask from './calsubtask';

export default class calTodo extends Component {
    render(){
        let calTodo = this.props.todo.map((v,i)=>{
            const star = v.star?<span className="todo-cal-star">&#9733;</span>:"";
            return (
                <div className="todo-cal" key={i}>
                    <div className={"todo-cal-header "+v.priority}>
                        {star}
                        <span className="todo-cal-name">{v.name}</span>
                    </div>
                    <div className="todo-cal-body">
                        <CalDate date={v.edit.date} />
                        <CalTime time={v.edit.time} />
                        <CalNote note={v.edit.note}/>
                        <CalSubtask task={v.edit.subTask}/>
                    </div>
                </div>
            )
        });
        return <div>{calTodo}</div>
    }
}