import React, {Component} from 'react';

export default class FormatMenu extends Component {
    render(){
        //filter out those which won't have a special layout design
        if(this.props.currFormat==="all"||this.props.currFormat==="upcoming") return null;
        return <span onClick={this.props.onClick}>Format</span>
    }
}