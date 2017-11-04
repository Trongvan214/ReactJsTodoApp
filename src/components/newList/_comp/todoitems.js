import React, {Component} from 'react';
import Edit from './edit';
import Delete from './delete';
import Star from './star';

export default class TodoItems extends Component {
    constructor(props){
        super(props);
        this.state = {
            color: 'none',
        }
        this.updateColor = this.updateColor.bind(this);
    }
    updateStar(e,index){
        //toggle active
        e.target.classList.toggle('active');
        //save it in localstorage and update it
        let todos = JSON.parse(localStorage.getItem('todo'));
        todos[index].star = !todos[index].star;
        localStorage.setItem('todo', JSON.stringify(todos));
        this.props.update(todos);
    }
    deleteTodoItem(e, index, len){
        //remove this element active class
        e.target.parentNode.childNodes[2].classList.remove('active');
        //take out todo at that index
        let todos = JSON.parse(localStorage.getItem('todo'));
        todos.splice(index, 1);
        localStorage.setItem('todo', JSON.stringify(todos));
        //update back to the parent
        this.props.update(todos);
    }
    updateColor(color, index){
        let target = "item"+index;
        this.refs[target].className = "todo-item "+ color;
        this.render();
    }
    render(){
        if(this.props.todo != null) {
            var todos = this.props.todo.map((eachTodo,index, arr) => {
                return (
                    <li key={index} className={"todo-item "+eachTodo.priority} ref={"item"+index}>
                        <Star onClick={(e)=>this.updateStar(e,index)} active={eachTodo.star}/>
                        <span className="name">{eachTodo.name}</span>
                        <Edit name={eachTodo.name} index={index} info={eachTodo.edit} updateColor={this.updateColor}/>
                        <Delete onClick={(e)=>this.deleteTodoItem(e,index,arr.length)}/>
                    </li>
                )
            });
            return (
                <ul>
                    {todos}
                </ul>
            );
        }
        else {
            return null;
        }
    }
}