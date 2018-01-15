import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'; 
import NewList from './newList/newlist';
import Calendar from './calendar/calendar.js';
import Menu from './menu/menu.js';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/ReactJsTodoApp" component={Menu} />
          <Route exact path="/ReactJsTodoApp/calendar" component={Calendar}/>
          <Route exact path="/ReactJsTodoApp/newlist" component={NewList}/>
        </div>
    </Router>
    );
  }
}