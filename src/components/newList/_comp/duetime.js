import React, {Component} from 'react';
import Time from './time';
import './duetime.css';

export default class DueTime extends Component {
    constructor(props){
        super(props);
        this.state = {
            showTime: false,
            pickedTime: 'Set Time',
            showDeleteTime: false,
        }
        this.pageClick = this.pageClick.bind(this);
        this.displayTime = this.displayTime.bind(this);
        this.mouseDownHandler = this.mouseDownHandler.bind(this);
        this.mouseUpHandler = this.mouseUpHandler.bind(this);
    }
    //default set to next hour
    componentDidMount(){
        //set to true first to avoid set State before mounting component (warning)
        this.clickOnTarget = true;
        window.addEventListener('touchstart', this.pageClick, false);
        window.addEventListener('mousedown', this.pageClick, false);
    }
    pageClick(e){
        if(this.clickOnTarget){
            return;
        }
        this.setState({
            showTime: false
        });
    } 
    mouseDownHandler(){
        this.clickOnTarget = true;
    }
    mouseUpHandler(){
        this.clickOnTarget = false;
    }
    showTime(){
        this.setState({showTime: true});
    }
    displayTime(time){
        this.setState({
            pickedTime: "At " + time,
            showDeleteTime: true,
        });
        //give back to edit commponent 
        this.props.getTime(time);
    }
    clearTime(e){
        e.stopPropagation();
        this.setState({
            showTime: false,
            pickedTime: 'Set Time',
            showDeleteTime: false,
        });
    }
    render(){
        return (
            <div className="due-time"onClick={()=>this.showTime()} onTouchStart={this.mouseDownHandler} onTouchEnd={this.mouseUpHandler} onMouseDown={this.mouseDownHandler} onMouseUp={this.mouseUpHandler}>
                <span className="due-time-symbol" role="img" aria-label="due-time">&#x1F550;</span>
                <span className="due-time-text">{this.state.pickedTime}</span>
                <Time showTime={this.state.showTime} getTime={this.displayTime} />
                <span className={this.state.showDeleteTime ? "date-del" : " "} onClick={(e)=>this.clearTime(e)}></span>
            </div>
        )
    }
}