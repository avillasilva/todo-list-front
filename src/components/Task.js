import React, { useState } from 'react'
//import React from 'react'
import './Task.css'
import TaskForm from './TaskForm';

function Task({ user, task, Refresh }) {

  const [edit, setEdit] = useState(false)

  function deleteTask() {
    // alert("Are you sure you want to delete the note?")
    user.deleteTask(task.id).then(() => { Refresh(user.getTasks()) });
  }


  return (
    (edit) ? <TaskForm user={user} Refresh={Refresh} task={task} editRefresh={setEdit}/>
        :
    (
    <div className="task">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>{task.deadline}</p>
      <button onClick={e => deleteTask()}>Delete task</button>
      <button onClick={e => setEdit(true)}>Edit task</button>
      <input type = "checkbox"/>
    </div>
    )
  )

 
}


export default Task;