import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './backtomenu.css';

export default class BackToMenu extends Component {
    render(){
        return (
            <div className="back-to-menu">
                <button type="text" className="home-button"><Link to="/">Home</Link></button>
            </div>
        )
    }
}