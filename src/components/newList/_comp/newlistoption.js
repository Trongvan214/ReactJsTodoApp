import React, {Component} from 'react';

export default class NewListOption extends Component {
    edit(e){
        console.log(this.refs);
    }
    render(){
        return (
            <div className="newlist-menu">
                <span className="newlist-sort">Sort</span>
                <span className="newlist-edit" onClick={()=>this.edit}>Edit</span>
            </div>
        )
    }
}