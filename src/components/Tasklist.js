import React, { useState } from 'react'
import Task from './Task'

import "./Task.css"
import "./Note.css"
import TaskListForm from './TaskListForm';

function Tasklist({user, tasklist, Refresh}) {

    const [edit, setEdit] = useState(false)


    function deleteTasklist () {
        // alert("Are you sure you want to delete the note?")
        user.deleteTasklist(tasklist.id).then(() => {Refresh(user.getTaskLists())});
    }

    
    return (
        (edit) ? <TaskListForm user={user} Refresh={Refresh} tasklist={tasklist} editRefresh={setEdit}/> 
            :
        ( 
        <div className="task">
           <h3>{tasklist.title}</h3>
           <button className="del-button" onClick={e => deleteTasklist()}>Delete Tasklist</button>
           <button className="edit-button" onClick={e => setEdit(true)}>Edit Tasklist</button>
          <div className="tasklist-container">{
                (user.getTaskListsTasks(tasklist).map(e => <Task key={e.id} user={user} task={e} Refresh={Refresh} />))
            }</div>
        </div>
        )
    )
}

export default Tasklist;