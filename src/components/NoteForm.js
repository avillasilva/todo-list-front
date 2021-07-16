import React, { useState } from 'react'
// import React from 'react'
import './Forms.css'

function NoteForm({user, Refresh}) {

    // function deleteNote () {
    //     alert("Are you sure you want to delete the note?")
    //     user.deleteNote(note.id).then(() => {Refresh(user.getNotes())});
    // }

    const [details, setDetailsNote] = useState({ title: "", content: "", tasklist: "" });

    const submitHandler = e => {
        e.preventDefault();

        user.postNote(details).then(() => {Refresh(user.getNotes())});
    }

    console.log(user.getTaskLists())
    
    return (
        <div className="box-form">
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
                    <div className="form-group">
                    <label htmlFor="content">Tasklist:</label>
                        <select onChange={e => setDetailsNote({ ...details, tasklist: e.target.value })}>
                            <option>Select One Tasklist</option>
                            {
                                user.getTaskLists().map(e => <option value= {e.id}>{e.title}</option>)
                            }
                            
                            
                        </select>
                    </div>
                    <input type="submit" value="Create note" />
                </div>
            </form>
        </div>
    )
}

export default NoteForm;