import React, { Component } from 'react';
import NewList from './newList/newlist';
import ExistingList from './existingList/existinglist';
import Calender from './calender/calender';
import Menu from './menu/menu.js';
import './app.css';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      userInput: '',
      hideMenu: "no"
    }
    this.choice = this.choice.bind(this);
    this.returnToMenu = this.returnToMenu.bind(this);
  }
  returnToMenu(bool){
    this.setState({userInput: '',hideMenu: "no"})
  }
  choice(a){
    this.setState({userInput: a, hideMenu: "yes"});
  }
  render() {
    return (
      <div className="App">
        <Menu choice={this.choice} hide={this.state.hideMenu}/>
        <NewList show={this.state.userInput} return={this.returnToMenu}/>
        <ExistingList show={this.state.userInput} return={this.returnToMenu}/>
        <Calender show={this.state.userInput} return={this.returnToMenu}/>
      </div>
    );
  }
}

