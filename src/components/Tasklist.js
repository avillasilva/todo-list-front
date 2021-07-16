// import React, { useState } from 'react'
import React from 'react'
import "./Task.css"

function Tasklist({user, tasklist, Refresh}) {

    function deleteTasklist () {
        // alert("Are you sure you want to delete the note?")
        //user.deleteNote(note.id).then(() => {Refresh(user.getTaskLists())});
    }

    
    return (
        <div className="task">
           <h3>{tasklist.title}</h3>
           <button className="del-button" onClick={e => deleteTasklist()}>Delete Tasklist</button>
           {/* (tasklist.task.map(e => <Task key={e.id} user={user} task={e} Refresh={setDisplayTasks} />)) */}
        </div>
    )
}

export default Tasklist;