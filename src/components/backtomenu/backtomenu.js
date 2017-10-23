import React, {Component} from 'react';
import './backtomenu.css';

export default class BackToMenu extends Component {
    render(){
        return (
            <div className="back-to-menu">
                <button type="text" onClick={this.props.onClick} className="home-button">Home</button>
            </div>
        )
    }
}