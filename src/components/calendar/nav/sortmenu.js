import React, {Component} from 'react';
import './sortmenu.css';

export default class SortMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            showMenu: false,
        }
        this.pageClick = this.pageClick.bind(this);
        this.mouseDownHandler = this.mouseDownHandler.bind(this);
        this.mouseUpHandler = this.mouseUpHandler.bind(this);
        this.sortTodo = this.sortTodo.bind(this);
    }
    //set the state before mounting
    componentDidMount(){
        window.addEventListener('mousedown', this.pageClick, false);
        window.addEventListener('touchstart', this.pageClick, false);
    }
    //prevent warning when reemount
    componentWillUnmount(){
        window.removeEventListener('touchstart', this.pageClick, false);
        window.removeEventListener('mousedown', this.pageClick, false);
    }
    mouseDownHandler(){
        this.clickOnTarget = true;
    }
    mouseUpHandler(){
        this.clickOnTarget = false;
    }
    pageClick(){
        if(!this.clickOnTarget){
            this.setState({
                showMenu: false
            });
        }
    }
    showMenu(e){
        e.stopPropagation();
        this.setState({
            showMenu: !this.state.showMenu,
        });
    }
    sortTodo(choice){
        this.props.choice(choice);
    }
    render(){
        return (
            <div className={this.state.showMenu?"calendar-sort-menu active":"calendar-sort-menu"}  onClick={(e)=>this.showMenu(e)} onTouchStart={this.mouseDownHandler} onTouchEnd={this.mouseUpHandler} onMouseDown={this.mouseDownHandler} onMouseUp={this.mouseUpHandler}>
                <div className="toggle-button">
                    <div className="toggle">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <nav>
                    <ul>
                        <li onClick={()=>this.sortTodo("all")}><span>All Todos</span></li>
                        <li onClick={()=>this.sortTodo("dateless")}><span>Dateless Todos</span></li>
                        <li onClick={()=>this.sortTodo("star")}><span>Starred</span></li>
                        <li onClick={()=>this.sortTodo("today")}><span>Today</span></li>
                        <li onClick={()=>this.sortTodo("week")}><span>Week</span></li>
                        <li onClick={()=>this.sortTodo("upcoming")}><span>Upcoming</span></li>
                    </ul>
                </nav>
            </div>
        )
    }
}