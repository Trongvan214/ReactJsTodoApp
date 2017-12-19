import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import NewList from './newList/newlist';
import ExistingList from './existingList/existinglist.js';
import Calendar from './calendar/calendar.js';
import Menu from './menu/menu.js';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Menu} />
          <Route path="/calendar" component={Calendar}/>
          <Route path="/exist" component={ExistingList}/>
          <Route path="/newlist" component={NewList}/>
        </div>
    </Router>
    );
  }
}

