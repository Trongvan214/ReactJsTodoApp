import React, {Component} from 'react';

export default class CalSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: this.props.curr,
            switch: false,
        }
    }
    switchEle(){
        this.setState({switch: true})
    }
    changeText(){
        this.setState({text: this.refs.search.value});
        this.props.onChange(this.state.text);
    }
    render(){
        //a way to bypass and use both controlled and uncontrolled input
        let curr = this.props.date.date+"/"+(this.props.date.month+1)+"/"+this.props.date.year;
        if(this.state.switch){
            return <input className="calendar-search" defaultValue={curr} value={this.state.text} type="text" ref="search" onChange={()=>this.changeText()}/>
        }
        else {
            return <div onClick={()=>this.switchEle()}>{curr}</div>
        }
    }
}
