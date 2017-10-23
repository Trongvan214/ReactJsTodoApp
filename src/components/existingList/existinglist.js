import React, {Component} from 'react';
import BackToMenu from '.././backtomenu/backtomenu';
export default class ExistingList extends Component {
    render(){
        if(this.props.show === "exist"){
            return <BackToMenu onClick={this.props.return}/>
        }
        else {
            return <h1 style={{display: "none"}}>.</h1>
        }
    }
}
