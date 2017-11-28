import React, {Component} from 'react';

export default class DateLessFormat extends Component {
    render(){
        if(this.props.format !== "dateless") return null;
        return <h1>Dateless Format</h1>;
    }
} 