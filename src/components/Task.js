// import React, { useState } from 'react'
import React from 'react'
import './Task.css'

function Task({ user, task, Refresh }) {

  function deleteTask() {
    // alert("Are you sure you want to delete the note?")
    user.deleteTask(task.id).then(() => { Refresh(user.getTasks()) });
  }


  return (
    <div className="task">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>{task.deadline}</p>
      <button onClick={e => deleteTask()}>Delete task</button>
    </div>
  )
}

export default Task;