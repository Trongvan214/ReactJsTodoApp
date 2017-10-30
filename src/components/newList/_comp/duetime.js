import React, {Component} from 'react';
import Time from './time';
import './duetime.css';

export default class DueTime extends Component {
    constructor(props){
        super(props);
        this.state = {
            showTime: false,
            pickedTime: 'Set Time',
        }
        this.pageClick = this.pageClick.bind(this);
        this.getTime = this.getTime.bind(this);
        this.mouseDownHandler = this.mouseDownHandler.bind(this);
        this.mouseUpHandler = this.mouseUpHandler.bind(this);
    }
    //default set to next hour
    componentWillMount(){
        window.addEventListener('mousedown', this.pageClick, false);
    }
    pageClick(e){
        e.preventDefault();
        e.stopPropagation();
        if (!this.onTarget) {
            this.setState({
                showTime: false
            });
        }
    }
    mouseDownHandler() {
        this.onTarget = true;
        console.log("down");
    }
    mouseUpHandler(){
        this.onTarget = false;
        console.log("up");
    }
    showTime(){
        this.setState({showTime: true});
    }
    getTime(time){
        this.setState({
            pickedTime: "At " + time,
        })
    }
    render(){
        return (
            <div className="due-time" onClick={()=>this.showTime()}  onTouchStart={this.mouseDownHandler} onTouchEnd={this.mouseUpHandler} onMouseDown={this.mouseDownHandler} onMouseUp={this.mouseUpHandler}>
                <span className="due-time-symbol" role="img" aria-label="due-time">&#x1F550;</span>
                <span className="due-time-text">{this.state.pickedTime}</span>
                <Time showTime={this.state.showTime} getTime={this.getTime} />
            </div>
        )
    }
}