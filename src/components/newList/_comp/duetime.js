import React, {Component} from 'react';
import Time from './time';
import './duetime.css';

export default class DueTime extends Component {
    render(){
        return (
            <div className="due-time">
                <span role="img" aria-label="due-time">&#x1F550;</span>
                <span className="due-time-text"></span>
                <Time />
            </div>
        )
    }
}