import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import './menu.css';

export default class Menu extends Component {
    render(){
        return (
            <div className="menu">
                <div className="calander"><Link to="/ReactJsTodoApp/calendar">Calander</Link></div>
                <div className="new-list"><Link to="/ReactJsTodoApp/newlist">New list</Link></div>
            </div>
        )
    }
}