import React, {Component} from 'react';
import PickedFormat from './formats/pickedformat';
// import CalBody from './_comp/calbody';
import BackToMenu from '.././backtomenu/backtomenu';
import SortMenu from './nav/sortmenu';
import './calendar.css';

export default class Calendar extends Component {
    constructor(props){
        super(props);
        this.state = {
            todoFormat: 'all',
            todo: [],
        }
        this.todoSortChoice = this.todoSortChoice.bind(this);
        this.timeSortTodo = this.timeSortTodo.bind(this);
        this.formatActive = this.formatActive.bind(this);
    }
    componentWillUpdate(nextProps){
        //update the todo
        if(nextProps.show === "cal" && nextProps !== this.props){
            let parseTodo = JSON.parse(localStorage.getItem('todo')); 
            let sortedTodo = this.timeSortTodo(parseTodo);
            this.setState({
                todo: sortedTodo,
            });
        }
    }
    //remember to figure how to update without setting up first
    componentWillMount(){    
        this.format = "";
        let parseTodo = JSON.parse(localStorage.getItem('todo')); 
        let sortedTodo = this.timeSortTodo(parseTodo);
        this.setState({
            todo: sortedTodo,
        });
    }
    //share function 
    getUTCTime(obj){
        let arr = [];
        //merge the objects together
        let data = Object.assign({}, obj.edit.date, obj.edit.time);
        //delete the color object
        delete data.color;
        //if no time given than return 0
        if(Object.keys(data).length !== 0 && data.year){
            for(let prop in data){
                arr.push(data[prop]);
            }
            return new Date(...arr).getTime();
        }
        return 0;
    };
    timeSortTodo(a){
        let temp, swap, currData, nextData, noTimeArr = [];
        //bubble sort modify
        if(!a){
            return [];
        }
        do {
            swap = false;
            for(let i=0;i<a.length-1;i++){
                currData = this.getUTCTime(a[i]);
                nextData = this.getUTCTime(a[i+1]);
                //take out of array and put in timeless arr
                if(currData === 0){
                    noTimeArr.push(a[i]);
                    a.splice(i, 1);
                    swap = true;
                }
                //take out of array and in timeless arr
                else if(nextData === 0){
                    noTimeArr.push(a[i+1]);
                    a.splice(i+1, 1);
                    swap = true;
                }
                else if(currData > nextData){
                    temp = a[i];
                    a[i] = a[i+1];
                    a[i+1] = temp;
                    swap = true;
                }
            }
        } while(swap);
        this.dateless = noTimeArr;
        return a.concat(noTimeArr);
    }
    todoSortChoice(choice){
        this.setState({
            todoFormat: choice,
        });
    }
    formatActive(){
        this.setState({
            formatActive: !this.state.formatActive,
        })
    }
    render(){
        return (
            <div className="calendar">
                <BackToMenu/>
                <SortMenu choice={this.todoSortChoice} />
                <PickedFormat todos={this.state.todo} choose={this.state.todoFormat} shareFunction={this.getUTCTime} dateless={this.dateless}/>
            </div>
        )
    }
}
