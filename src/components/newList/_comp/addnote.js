import React from 'react';

const AddNote = ({setNote, getNote}) => (
    <div className="add-note">
        <span className="add-note-symbol">&#9998;</span>
        <textarea rows="7" 
            type="textarea" 
            className="add-note-textbox" 
            placeholder="Add a note.."
            value={setNote}
            onChange={(e)=>getNote(e.target.value)} />
    </div>
)
export default AddNote;