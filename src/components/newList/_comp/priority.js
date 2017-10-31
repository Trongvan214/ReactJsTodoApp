import React, {Component} from 'react';
import './priority.css';

export default class Priority extends Component {
    constructor(props){
        super(props);
        this.state = {
            color: "black",
        }
    }
    setPriority(i){
        let chosenColor = i===0?"red":i===1?"#f4d942":"green";
        this.setState({
            color: chosenColor,
        })
    }
    render(){
        let style = {
            "color": this.state.color,
        }
        let choices = Array(3).fill().map((v,i)=>{
            return <span key={i} className={"priority-choices"+i} onClick={()=>this.setPriority(i)}></span>
        });
        return (
            <div className="priority">
                <span style={style} className="priority-text">Priority: </span>
                {choices}
            </div>
        )
    }
}