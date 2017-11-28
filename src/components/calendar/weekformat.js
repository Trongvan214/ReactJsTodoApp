import React, {Component} from 'react';

export default class WeekFormat extends Component {
    render(){
        if(this.props.format !== "week") return null;
        return <h1>Week Format</h1>
    }
}