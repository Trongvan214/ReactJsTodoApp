import React, {Component} from 'react';

export default class Option extends Component {
    optionActive(e){
        e.target.classList.toggle('active');
    }
    render(){
        return  <span className="options" onClick={this.optionActive}></span>
    }
}