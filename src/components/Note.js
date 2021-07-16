import React, { useState } from 'react'
// import React from 'react'
import './Note.css'

function Note({ user, note, Refresh }) {

    const [display, setDisplay] = useState("delete");
    const [detailsEditNote, setDetailsEditNote] = useState({ title: note.title, content: note.content, tasklist: note.tasklist });

    const submitEditHandler = e => {
        e.preventDefault();
        console.log('edit')
        user.editNote(note.id, detailsEditNote).then(() => { Refresh(user.getNotes()) });
        setDisplay("delete")
    }

    function deleteNote() {
        // alert("Are you sure you want to delete the note?")
        user.deleteNote(note.id).then(() => { Refresh(user.getNotes()) });
    }

    function editNote() {
        // alert("Are you sure you want to delete the note?")
        setDisplay("edit")
    }

    return (
        <div className="note">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <p>{note.date}</p>

            {
                (display === "edit") ?
                    <div className="box-form">
                        <form onSubmit={submitEditHandler}>
                            <div className='form-inner'>
                                <h2>Edit note</h2>
                                <div className="form-group">
                                    <label htmlFor="title-edit">Title:</label>
                                    <input type="text" name="title" id="title-edit" onChange={e => setDetailsEditNote({ ...detailsEditNote, title: e.target.value })} value={detailsEditNote.title} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="content">Content:</label>
                                    <input type="textarea" name="content" id="content" onChange={e => setDetailsEditNote({ ...detailsEditNote, content: e.target.value })} value={detailsEditNote.content} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="content">Tasklist:</label>
                                    <select onChange={e => setDetailsEditNote({ ...detailsEditNote, tasklist: e.target.value })}>
                                        <option>Select One Tasklist</option>
                                        {
                                            user.getTaskLists().map(e => <option key={e.id} value={e.id}>{e.title}</option>)
                                        }

                                    </select>
                                </div>
                                <input type="submit" value="save" />
                            </div>
                        </form>
                    </div> :
                    console.log('delete')
            }

            <button className="del-button" onClick={e => deleteNote()}>Delete note</button>

            <button className="edit-button" onClick={e => editNote(true)}>Edit note</button>
        </div>
    )
}

export default Note;