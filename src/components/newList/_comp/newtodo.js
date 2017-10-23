import React, {Component} from 'react';

export default class NewTodo extends Component {
    constructor(props){
        super(props);
        this.addTodo = this.addTodo.bind(this);
        this.state = {
            newTodo: ''
        }
    }
    //something like this
    /*$(document).ready(function()
{
    $('.options').on('click', function(){
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $(this).siblings().css("display", "none");
        }
        else {
            $(this).addClass('active');
            $(this).siblings().css("display", "inline-block");
        }
    });
    $('.delete').on('click', function(e){
        console.log(e.target);
        if(e.target != this)
        {
            $(e.target).toggleClass('active');
        }
        else {
            $(this).toggleClass('active');
        }
    })
});*/
    addTodo(e){
        e.preventDefault();
        if(this.refs.name.value){
            this.setState({newTodo: this.refs.name.value}, ()=>this.props.getTodo(this.state.newTodo));
        }
        e.target.reset();
    }
    render(){
        return (
            <div>
                <form onSubmit={this.addTodo}>
                    <div className="add-todo">
                        <span className="plus-sign">+</span>
                        <input type="text" ref="name" placeholder="Add a todo..."/>
                        <button type="submit">Add</button>
                        </div>
                </form>
            </div>
        );
    }
}