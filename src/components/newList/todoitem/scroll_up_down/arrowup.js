import React from 'react';

const ArrowUp = ({show, update}) => {
    const showValue = show ? "block" : "none";
    const scrollStyles = {
        "display": showValue,
    }
    return (
        <div className="scroll-up" key="scroll-up">
            <div className="arrow-up" style={scrollStyles} onClick={update}></div>
        </div>
    )
}

export default ArrowUp;