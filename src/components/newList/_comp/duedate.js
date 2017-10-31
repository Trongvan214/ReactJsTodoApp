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
        window.addEventListener('click', this.pageClick, false);
        window.addEventListener('touchstart', this.pageClick, false);
    }
    pageClick(){
        this.setState({
            showCal: false
        });
    }

    getDate(date){
        this.setState({
            pickedDate: date,
            showDeleteDate: true,
        });
    }
    showCal(e){
        e.stopPropagation();
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
            <div className="due-date"  onClick={(e)=>this.showCal(e)}>
                <div className="due-date-text-container">
                    <span className="due-date-symbol" role="img" aria-label="due-date">&#x1F4C5;</span>
                    <span className="due-date-text">{this.state.pickedDate}</span>
                    <span className={this.state.showDeleteDate ? "due-date-del" : " "} onClick={()=>this.clearDate()}></span>
                </div>
                <Calendar showCal={this.state.showCal} getDate={this.getDate}/>
            </div>
        );
    }
}