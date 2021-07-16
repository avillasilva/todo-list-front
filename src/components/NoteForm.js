import React, { useState } from 'react'
// import React from 'react'
import './Forms.css'

function NoteForm({ user, Refresh, note, editRefresh }) {

    const [detailsNote, setDetailsNote] = useState({
        title: (note === undefined) ? "" : note.title,
        content: (note === undefined) ? "" : note.content,
        tasklist: (note === undefined) ? "" : note.tasklist.id
    });

    const submitHandler = e => {
        e.preventDefault();

        if (note === undefined) {
            user.postNote(detailsNote).then(() => { Refresh(user.getNotes()) });
        }
        else {
            user.putNote(note.id, detailsNote).then(() => { Refresh(user.getNotes()) });
            editRefresh(false)
        }
    }

    return (
        <div className="box-form">
            <form onSubmit={submitHandler}>
                <div className='form-inner'>
                    {(note === undefined) ? <h2>Create new Note</h2> : <h2>Edit Note</h2>}
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input type="text" name="title" id="title" onChange={e => setDetailsNote({ ...detailsNote, title: e.target.value })} value={(note === undefined) ? "" : detailsNote.title} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content:</label>
                        <input type="textarea" name="content" id="content" onChange={e => setDetailsNote({ ...detailsNote, content: e.target.value })} value={(note === undefined) ? "" : detailsNote.content} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Tasklist:</label>
                        <select onChange={e => setDetailsNote({ ...detailsNote, tasklist: e.target.value })} required>
                            <option value="">Select One Tasklist</option>
                            {
                                user.getTaskLists().map(e => <option key={e.id} value={e.id}>{e.title}</option>)
                            }

                        </select>
                    </div>
                    <input type="submit" value={(note === undefined) ? "Create" : "Save"} onClick={submitHandler} />
                </div>
            </form>
        </div>
    )
}

export default NoteForm;