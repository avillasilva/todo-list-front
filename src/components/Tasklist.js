// import React, { useState } from 'react'
import React from 'react'
import Task from './Task'
import "./Task.css"

function Tasklist({user, tasklist, Refresh}) {

    function deleteTasklist () {
        // alert("Are you sure you want to delete the note?")
        user.deleteTasklist(tasklist.id).then(() => {Refresh(user.getTaskLists())});
    }

    
    return (
        <div className="task tasklist">
           <h3>{tasklist.title}</h3>
           <button className="del-button" onClick={e => deleteTasklist()}>Delete Tasklist</button>
            <div className="tasklist-container">{
                (user.getTaskListsTasks(tasklist).map(e => <Task key={e.id} user={user} task={e} Refresh={Refresh} />))
            }</div>
           {/* (tasklist.task.map(e => <Task key={e.id} user={user} task={e} Refresh={setDisplayTasks} />)) */}
        </div>
    )
}

export default Tasklist;