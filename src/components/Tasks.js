// import React, { useState } from 'react'
import React from 'react'
import './Tasks.css'

function Tasks({ user, task, Refresh }) {

  function deleteNote() {
    // alert("Are you sure you want to delete the note?")
    user.deleteNote(task.id).then(() => { Refresh(user.getNotes()) });
  }


  return (
    <div className="tasks">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>{task.deadline}</p>
      <button onClick={e => deleteNote()}>Delete task</button>
    </div>
  )
}

export default Tasks;