import React, { Component } from 'react';
import NewList from './newList/newlist';
import ExistingList from './existingList/existinglist.js';
import Calendar from './calendar/calendar.js';
import Menu from './menu/menu.js';

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
    this.setState({userInput: "cal", hideMenu: true});
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
        <NewList show={this.state.userInput} return={this.returnToMenu} />
        <ExistingList show={this.state.userInput} return={this.returnToMenu} />
        <Calendar show={this.state.userInput} return={this.returnToMenu}/>
      </div>
    );
  }
}

