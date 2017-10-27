import React, { Component } from 'react';
import NewList from './newList/newlist';
import ExistingList from './existingList/existinglist';
import Calendar from './calendar/calendar';
import Menu from './menu/menu.js';
import './app.css';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      userInput: '',
      hideMenu: false
    }
    this.choice = this.choice.bind(this);
    this.returnToMenu = this.returnToMenu.bind(this);
  }
  componentWillMount(){
    this.setState({userInput: "new", hideMenu: true});
  }
  returnToMenu(){
    this.setState({userInput: '',hideMenu: false})
  }
  choice(a){
    this.setState({userInput: a, hideMenu: true});
  } 
  render() {
    return (
      <div className="App">
        <Menu choice={this.choice} hide={this.state.hideMenu}/>
        <NewList show={this.state.userInput} return={this.returnToMenu}/>
        <ExistingList show={this.state.userInput} return={this.returnToMenu}/>
        <Calendar show={this.state.userInput} return={this.returnToMenu}/>
      </div>
    );
  }
}

