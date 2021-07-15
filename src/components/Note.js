// import React, { useState } from 'react'
import React from 'react'
import './Note.css'

function Note({user, note, Refresh}) {

    function deleteNote () {
        // alert("Are you sure you want to delete the note?")
        user.deleteNote(note.id).then(() => {Refresh(user.getNotes())});
    }

    
    return (
        <div className="note">
           <h3>{note.title}</h3>
           <p>{note.content}</p>
           <p>{note.date}</p>
           <button onClick={e => deleteNote()}>Delete note</button>
        </div>
    )
}

export default Note;