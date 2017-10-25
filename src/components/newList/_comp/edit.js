import React, {Component} from 'react';

export default class Edit extends Component {
    constructor(props){
        super(props);
        this.state = {
            active: false,
        }
        this.active = this.active.bind(this);
    }
    //toggle active
    active(){
        this.setState({active: !this.state.active});
    }
    render(){
        if(this.state.active){
            return (
                <div className="edit-menu">
                    <div className="sub-task">
                        <span className="sub-task-symbol">&#43;</span>
                        <input type="text" className="sub-task-textbox" placeholder="Add a subtask" />
                    </div>
                    <div className="add-note">
                        <span className="add-note-symbol">&#9998;</span>
                        <input type="text" className="add-note-textbox" placeholder="Add a note.." />
                    </div>
                    <span className="edit-exit" onClick={this.active}>&#10006;</span>
                </div>
            )
        }
        else {
            return <span className="edit" onClick={this.active}>&#9998;</span>;
        }
    }
}