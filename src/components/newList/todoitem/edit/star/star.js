import React, {Component} from 'react';

export default class Star extends Component {
    render(){
        if(this.props.active){
            return(
                <span className="star active" onClick={this.props.onClick}></span>
            );
        }
        else {
            return(
                <span className="star" onClick={this.props.onClick}></span>
            );
        }
    }
}