import React from 'react';

const CalNote = ({note}) => {
    //if empty string in the note
    if(!note){
        return null;
    }
    return (
        <div className="todo-cal-note">
            <span className="todo-cal-note-symbol">&#9998;</span>
            <span className="todo-cal-note-value">{note}</span>
        </div>
    );
}
export default CalNote