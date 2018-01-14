import React from 'react';

const ArrowDown = (props) => {
    const showValue =  props.show ? "block" : "none";
    const scrollStyles = {
        "display": showValue,
    }
    return (
        <div className="scroll-down" key="scroll-down">
            <div className="arrow-down" style={scrollStyles} onClick={props.update}></div>
        </div>         
    )
}

export default ArrowDown;