import React, {Component} from 'react';
import CalBody from './_comp/calbody';
import BackToMenu from '.././backtomenu/backtomenu';
import './calendar.css';

export default class Calendar extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: {
                month: '',
                year: '',
            }
        }
    }
    componentWillMount(){
        let d = new Date();
        this.setState({date: {
                month: d.getMonth(),
                year: d.getFullYear(), 
            }});
    }
    setMonth(newMonth, newYear){
        this.setState({date: {month: newMonth, year: newYear}});
    }
    render(){;
        if(this.props.show === "cal")
        {
            return (
                <div className="calendar">
                    <BackToMenu onClick={this.props.return}/>
                    <CalBody date={this.state.date} changeMonth={this.setMonth.bind(this)}/>
               </div>
            )
        }
        else
        {
            return null;
        }
    }
}
