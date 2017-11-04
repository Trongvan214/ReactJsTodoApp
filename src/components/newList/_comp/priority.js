import React, {Component} from 'react';
import './priority.css';

export default class Priority extends Component {
    setPriority(e,i){
        let chosenColor = i===0?"red":i===1?"#f4d942":"green";
        this.props.getPriority(chosenColor);
        for(var j = 0; j < 3; j++){
            if(!(j===i)){
                //+1 since there 4 element 
                e.target.parentNode.childNodes[j+1].classList.remove('active');
            }
        }
        e.target.classList.toggle('active');
    }
    render(){
        let choices = Array(3).fill().map((v,i)=>{
            return <span key={i} className={"priority-choices"+i} onClick={(e)=>this.setPriority(e,i)}></span>
        });
        return (
            <div className="priority">
                <span className="priority-text">Priority: </span>
                {choices}
            </div>
        )
    }
}