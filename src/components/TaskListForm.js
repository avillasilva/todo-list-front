import React, { useState } from 'react'
// import React from 'react'
import './Forms.css'

function TaskListForm({ user, Refresh, tasklist, editRefresh}) {

  const [detailsTaskList, setDetailsTaskList] = useState({ title: "" });

  const submitHandler = e => {
    e.preventDefault();

    if(tasklist === undefined) {
      user.postTaskList(detailsTaskList).then(() => { Refresh(user.getTaskLists()) });
      
    } else {
      user.putTaskList(tasklist.id, detailsTaskList).then(() => { Refresh(user.getTaskLists()) });
      editRefresh(false)
    }
   
  }

  return (
    <div className="box-form">
      <form onSubmit={submitHandler}>
        <div className='form-inner'>
          {(tasklist === undefined) ? <h2>Create new Tasklist</h2> : <h2>Edit Tasklist</h2>}
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input type="text" value={(tasklist === undefined) ? "" : tasklist.title} name="title" id="title" onChange={e => setDetailsTaskList({ ...detailsTaskList, title: e.target.value })} value={detailsTaskList.title} />
          </div>
          <input type="submit" value={(tasklist === undefined) ? "Create": "Save"} onClick={submitHandler} />
        </div>
      </form>
    </div>
  )
}

export default TaskListForm;