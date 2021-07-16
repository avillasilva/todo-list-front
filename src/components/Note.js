import React, { useState } from 'react'
import './Note.css'
import NoteForm from './NoteForm';

function Note({ user, note, Refresh }) {

    const [edit, setEdit] = useState(false)

    function deleteNote() {
        // alert("Are you sure you want to delete the note?")
        user.deleteNote(note.id).then(() => { Refresh(user.getNotes()) });
    }

    return (
        (edit) ? <NoteForm user={user} Refresh={Refresh} note={note} editRefresh={setEdit} />
            :
            (
                <div className="note">
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                    <p>{note.date}</p>
                    <button className="del-button" onClick={e => deleteNote()}>Delete Note</button>
                    <button className="edit-button" onClick={e => setEdit(true)}>Edit Note</button>
                </div>
            )
    )
}

export default Note;