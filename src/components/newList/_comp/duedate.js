import React, {Component} from 'react';
import Calendar from './calendar';
import './duedate.css';

export default class DueDate extends Component {
    constructor(props){
        super(props);
        this.state = {
            showCal: false,
            pickedDate: 'Set due date',
            showDeleteDate: false,
        }
        this.pageClick = this.pageClick.bind(this);
        this.getDate = this.getDate.bind(this);
    }
    //set the state before mounting
    componentWillMount(){
        window.addEventListener('mousedown', this.pageClick, false);
    }
    pageClick(){
    if (!this.mouseIsDownOnCalendar) {
        this.setState({
            showCal: false
        });
    }
    }
    mouseDownHandler() {
        this.mouseIsDownOnCalendar = true;
    }
    mouseUpHandler(){
        this.mouseIsDownOnCalendar = false;
    }
    getDate(date){
        this.setState({
            pickedDate: date,
            showDeleteDate: true,
        });
    }
    showCal(){
        if(!this.state.showDeleteDate){
            this.setState({
                showCal: true,
            });
        }
    }
    clearDate(){
        this.setState({
            showCal: false,
            pickedDate: 'Set due date',
            showDeleteDate: false,
        });
    }
    render(){
        return (
            <div className="due-date" onMouseDown={()=>this.mouseDownHandler()} onMouseUp={()=>this.mouseUpHandler()}>
                <div className="due-date-text-container" onClick={()=>this.showCal()}>
                    <span className="due-date-symbol" role="img" aria-label="due-date">&#x1F4C5;</span>
                    <span className="due-date-text">{this.state.pickedDate}</span>
                    <span className={this.state.showDeleteDate ? "due-date-del" : " "} onClick={()=>this.clearDate()}></span>
                </div>
                <Calendar showCal={this.state.showCal} getDate={this.getDate}/>
            </div>
        );
    }
}