import React, {Component} from 'react';
import './priority.css';

export default class Priority extends Component {
    setPriority(i){
        
    }
    render(){
        let choices = Array(3).fill().map((v,i)=>{
            return <span key={i} className="priority-choices" onClick={()=>this.setPriority(i)}></span>
        });
        return (
            <div className="priority">
                <span className="priority-text">Priority: </span>
                {choices}
            </div>
        )
    }
}