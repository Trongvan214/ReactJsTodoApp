import React from 'react';
import './addnote.css';

const AddNote = ({setNote, getNote}) => (
    <div className="add-note">
        <h1>Add Notes:</h1>
        <textarea rows="7" 
            type="textarea" 
            value={setNote}
            onChange={(e)=>getNote(e.target.value)} />
    </div>
)
export default AddNote;