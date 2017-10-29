import React, {Component} from 'react';

export default class Time extends Component {
    render(){
        //array with 00 05 10 ++ multiple of 5
        let min =  Array(12).fill(0).map((v,i)=>("0"+(v+5*i)).slice(-2));
        //array with time with am and pm 1-12
        let hour = Array(24).fill().map((v,i)=>i<11||i===23?(i%12)+1+"AM":(i%12)+1+"PM");
        hour.unshift(hour.pop());
        return <span>{min}</span>
    }
}