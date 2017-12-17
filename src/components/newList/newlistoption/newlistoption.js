import React, {Component} from 'react';

export default class NewListOption extends Component {
    deleteAllPastDue(){
        let parseTodo = JSON.parse(localStorage.getItem('todo'));
        for(let i=0;i<parseTodo.length;i++){
            let todo = parseTodo[i];
            let pastDue = this.getPastDue(todo.date,todo.time);
            if(pastDue < 0){
                parseTodo.splice(i, 1);
            }
        }
    }
    getPastDue(date,time){
        let arr = [];
        //merge the objects together
        let data = Object.assign({}, date, time);
        //delete the color object
        delete data.color;
        let timeUTC;
        //if no time given than return 0
        if(Object.keys(data).length !== 0 && data.year){
            for(let prop in data){
                arr.push(data[prop]);
            }
            timeUTC = new Date(...arr).getTime();
        }
        else {
            return 0;
        }
        let curr = new Date().getTime();
        return timeUTC-curr;
    };
    edit(e){
        console.log(this.refs);
    }
    render(){
        return (
            <div className="newlist-menu">
                <span className="newlist-sort" onClick={()=>this.deleteAllPastDue()}>Sort</span>
                <span className="newlist-edit" onClick={()=>this.edit}>Edit</span>
            </div>
        )
    }
}