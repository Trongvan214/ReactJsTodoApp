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
    }
    //default set to next hour
    componentWillMount(){
        window.addEventListener('touchstart', this.pageClick, false);
        window.addEventListener('click', this.pageClick, false);
    }
    pageClick(e){
            console.log('click');
            this.setState({
                showTime: false
            });
    } 
    showTime(e){
        e.stopPropagation();
        this.setState({showTime: true});
    }
    getTime(time){
        this.setState({
            pickedTime: "At " + time,
        })
    }
    render(){
        return (
            <div className="due-time" onClick={(e)=>this.showTime(e)}>
                <span className="due-time-symbol" role="img" aria-label="due-time">&#x1F550;</span>
                <span className="due-time-text">{this.state.pickedTime}</span>
                <Time showTime={this.state.showTime} getTime={this.getTime} />
            </div>
        )
    }
}