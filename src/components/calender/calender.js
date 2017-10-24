import React, {Component} from 'react';
import BackToMenu from '.././backtomenu/backtomenu';
export default class Calender extends Component {
    render(){
        if(this.props.show === "cal")
        {
            return (
                <BackToMenu onClick={this.props.return}/>
            )
        }
        else
        {
            return null;
        }
    }
}
