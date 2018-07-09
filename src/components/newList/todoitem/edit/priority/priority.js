import React, {Component} from 'react';
import './priority.css';

export default class Priority extends Component {
    state = { 
        activeIndex: -1,
    }
    setPriority(index){
        let chosenColor = index===0?"red":index===1?"yellow":"green";
        this.props.getPriority(chosenColor);
        this.setState({activeIndex: index});
    }
    render(){
        let choices = Array(3).fill().map((v,index)=>{
            if(index === this.state.activeIndex) 
                return <span key={index} className={ "active priority-choices"+index } onClick={()=>this.setPriority(index)}></span>
            return <span key={index} className={ "priority-choices"+index } onClick={()=>this.setPriority(index)}></span>
        });
        return (
            <div className="priority">
                <h1 className="priority-text">Priority: </h1>
                <div className="priority-line">
                    {choices}
                </div>
            </div>
        )
    }
}