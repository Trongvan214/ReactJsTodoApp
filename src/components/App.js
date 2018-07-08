import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'; 
import NewList from './newList/newlist';
import Calendar from './calendar/calendar.js';
import Menu from './menu/menu.js';
import './App.css';

export default class App extends Component {
  // componentDidMount(){
  //   window.addEventListener('scroll', noscroll);
  // }
  // componentWillMount(){
  //   window.removeEventListener('scroll', noscroll);
  // }
  render() {
    return (
      <Router basename="ReactJsTodoApp">
          <Route exact path="/" component={NewList} />
      </Router>
    );
  }
}
// function noscroll() {
//   window.scrollTo( 0, 0 );
// }