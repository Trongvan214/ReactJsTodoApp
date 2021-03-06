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
            color: "black",
        }
        this.pageClick = this.pageClick.bind(this);
        this.displayDate = this.displayDate.bind(this);
        this.mouseDownHandler = this.mouseDownHandler.bind(this);
        this.mouseUpHandler = this.mouseUpHandler.bind(this);
    }
    //set the state before mounting
    componentDidMount(){
        window.addEventListener('mousedown', this.pageClick, false);
        window.addEventListener('touchstart', this.pageClick, false);
    }
    //prevent warning when reemount
    componentWillUnmount(){
        window.removeEventListener('touchstart', this.pageClick, false);
        window.removeEventListener('mousedown', this.pageClick, false);
    }
    pageClick(){
        if(!this.clickOnTarget){
            this.setState({
                showCal: false
            });
        }
    }
    mouseDownHandler(){
        this.clickOnTarget = true;
    }
    mouseUpHandler(){
        this.clickOnTarget = false;
    }
    displayDate(formattedDate,dateColor,rawDate){
        this.setState({
            pickedDate: "Due "+formattedDate,
            showDeleteDate: true,
            color: dateColor,
        });
        //give back to the edit component
        this.props.getDate(rawDate,formattedDate);
    }
    showCal(){
        this.setState({
            showCal: true,
        });
    }
    clearDate(e){
        e.stopPropagation();
        this.setState({
            showCal: false,
            pickedDate: 'Set due date',
            showDeleteDate: false,
            color: "black",
        });
        this.props.getDate(null);
    }
    render(){
        let chosenDateColor = {
            "color": this.state.color,
        }
        return (
            <div className="due-date"  onClick={()=>this.showCal()} onTouchStart={this.mouseDownHandler} onTouchEnd={this.mouseUpHandler} onMouseDown={this.mouseDownHandler} onMouseUp={this.mouseUpHandler}>
                <div className="due-date-text-container">
                    <span className="due-date-symbol" role="img" aria-label="due-date">&#x1F4C5;</span>
                    <span style={chosenDateColor} className="due-date-text">{this.state.pickedDate}</span>
                    <span className={this.state.showDeleteDate ? "date-del" : " "} onClick={(e)=>this.clearDate(e)}></span>
                </div>
                <Calendar showCal={this.state.showCal} getDate={this.displayDate} setDate={this.props.setDate}/>
            </div>
        );
    }
}