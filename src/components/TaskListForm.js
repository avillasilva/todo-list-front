import React, { useState } from 'react'
// import React from 'react'
import './Forms.css'

function TaskListForm({ user, Refresh }) {

  const [detailsTaskList, setDetailsTaskList] = useState({ title: "" });

  const submitHandler = e => {
    e.preventDefault();

    user.postTaskList(detailsTaskList).then(() => { Refresh(user.getTaskLists()) });
  }

  return (
    <div className="box-form">
      <form onSubmit={submitHandler}>
        <div className='form-inner'>
          <h2>Create new tasklist</h2>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input type="text" name="title" id="title" onChange={e => setDetailsTaskList({ ...detailsTaskList, title: e.target.value })} value={detailsTaskList.title} />
          </div>
          <input type="submit" value="Create TaskList" />
        </div>
      </form>
    </div>
  )
}

export default TaskListForm;