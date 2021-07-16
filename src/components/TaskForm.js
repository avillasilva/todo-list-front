import React, { useState } from 'react'
// import React from 'react'
import './Forms.css'

function TaskForm({ user, Refresh }) {

    // function deleteNote () {
    //     alert("Are you sure you want to delete the note?")
    //     user.deleteNote(note.id).then(() => {Refresh(user.getNotes())});
    // }

    const [details, setDetailsTask] = useState({ title: "", finished:"", tasklist: "", category:user.getCategories()[0].id, description:"", deadline:""  });

    const submitHandler = e => {
        e.preventDefault();

        user.postTask(details).then(() => { Refresh(user.getTasks()) });
    }

    console.log(user.getTaskLists())

    return (
        <div className="box-form">
            <form onSubmit={submitHandler}>
                <div className='form-inner'>
                    <h2>Create new task</h2>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input type="text" name="title" id="title" onChange={e => setDetailsTask({ ...details, title: e.target.value })} value={details.title} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <input type="textarea" name="description" id="description" onChange={e => setDetailsTask({ ...details, description: e.target.value })} value={details.description} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="deadline">Deadline:</label>
                        <input type="date" name="deadline" id="deadline" onChange={e => setDetailsTask({ ...details, deadline: e.target.value })} value={details.deadline} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Tasklist:</label>
                        <select onChange={e => setDetailsTask({ ...details, tasklist: e.target.value })}>
                            <option>Select One Tasklist</option>
                            {
                                user.getTaskLists().map(e => <option key={e.id} value={e.id}>{e.title}</option>)
                            }

                        </select>
                    </div>
                    <input type="submit" value="Create task" />
                </div>
            </form>
        </div>
    )
}

export default TaskForm;