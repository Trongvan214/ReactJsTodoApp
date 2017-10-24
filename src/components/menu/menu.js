import React, {Component} from 'react';
import './menu.css';

export default class Menu extends Component {
    constructor(props){
        super(props)
        this.submit = this.submit.bind(this);
        this.state = {
            userInput: ''
        }
    }
    submit(e){
        let choice;
        console.log(e.target.parentNode.childNodes);
        if(e.target.classList.value === "calander"){
            choice = "cal";
        }
        else if (e.target.classList.value === "existing-list"){
            choice = "exist";
        }
        else {
            choice = "new";
        }
        this.setState({userInput: choice},()=>this.props.choice(this.state.userInput));
    }
    render(){
        if(this.props.hide === "no"){
            return (
                <div className="menu">
                    <div className="calander" onClick={this.submit}>Calander</div>
                    <div className="existing-list" onClick={this.submit}>Lists</div>
                    <div className="new-list" onClick={this.submit}>New List</div>
                </div>
            )
        }
        else {
            return null;
        }
    }
}