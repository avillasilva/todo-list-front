import React, { useState } from 'react'
// import React from 'react'
// import './NoteForm.css'

function NoteForm({user, Refresh}) {

    // function deleteNote () {
    //     alert("Are you sure you want to delete the note?")
    //     user.deleteNote(note.id).then(() => {Refresh(user.getNotes())});
    // }

    const [details, setDetailsNote] = useState({ title: "", content: "", tasklist: "1" });

    const submitHandler = e => {
        e.preventDefault();

        user.postNote(details).then(() => {Refresh(user.getNotes())});
    }
    
    return (
        <form onSubmit={submitHandler}>
            <div className='form-inner'>
                <h2>Create new note</h2>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input type="text" name="title" id="title" onChange={e => setDetailsNote({ ...details, title: e.target.value })} value={details.title} />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content:</label>
                    <input type="textarea" name="content" id="content" onChange={e => setDetailsNote({ ...details, content: e.target.value })} value={details.content} />
                </div>
                <select>
                    <option value="1">tasklist 1</option>
                    <option value="2">tasklist 2</option>
                </select>
                <input type="submit" value="Create note" />
            </div>
        </form>
    )
}

export default NoteForm;