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
        window.addEventListener('touchstart', this.pageClick, false);
        window.addEventListener('mousedown', this.pageClick, false);
    }
    componentWillUnmount(){
        window.removeEventListener('touchstart', this.pageClick, false);
        window.removeEventListener('mousedown', this.pageClick, false);
    }
    pageClick(){
        if(!this.clickOnTarget){
            this.setState({
                showTime: false
            });
        }
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
    displayTime(formattedTime,rawTime){
        this.setState({
            pickedTime: "At " + formattedTime,
            showDeleteTime: true,
        });
        //give back to edit commponent 
        this.props.getTime(rawTime,formattedTime);
    }
    clearTime(e){
        e.stopPropagation();
        this.setState({
            showTime: false,
            pickedTime: 'Set Time',
            showDeleteTime: false,
        });
        this.props.getTime(null);
    }
    render(){
        return (
            <div className="due-time"onClick={()=>this.showTime()} onTouchStart={this.mouseDownHandler} onTouchEnd={this.mouseUpHandler} onMouseDown={this.mouseDownHandler} onMouseUp={this.mouseUpHandler}>
                <span className="due-time-symbol" role="img" aria-label="due-time">&#x1F550;</span>
                <span className="due-time-text">{this.state.pickedTime}</span>
                <Time showTime={this.state.showTime} getTime={this.displayTime} setTime={this.props.setTime}/>
                <span className={this.state.showDeleteTime ? "date-del" : " "} onClick={(e)=>this.clearTime(e)}></span>
            </div>
        )
    }
}