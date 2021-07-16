import React, { useState, useContext } from 'react';
import './Dashboard.css';
import Tasklist from './Tasklist';
import Task from './Task'
import Note from './Note';
import TaskListForm from './TaskListForm';
import NoteForm from './NoteForm';
import TaskForm from './TaskForm';



function Dashboard({ user, Logout }) {

    const [display, setDisplay] = useState("Notes");
    const [notas, setDisplayNotes] = useState(user.getNotes());
    const [tasks, setDisplayTasks] = useState(user.getTasks());
    const [tasklist, setDisplayTasklists] = useState(user.getTaskLists());
    const [detailsNote, setDetailsNote] = useState({ title: "", content: "", tasklist: "" });
    const [detailsTask, setDetailsTask] = useState({ title: "", description: "", deadline: "", list_id: 1, category_id: 2 });


    return (
        <div>
            <header>
                <nav>
                    <div>
                    <button className={display === "Tasklists" ? 'active' : ''} onClick={e => setDisplay("Tasklists")}>Taskslists</button>
                        <button className={display === "Notes" ? 'active' : ''} onClick={e => setDisplay("Notes")}>Notes</button>
                        <button className={display === "Tasks" ? 'active' : ''} onClick={e => setDisplay("Tasks")}>Tasks</button>
                    </div>
                    <div>
                        <button className="right-btn" onClick={e => Logout()}>Logout</button>
                    </div>
                </nav>
            </header >
            <section>
                <div className="corpo-dash">
                    {
                    (display === "Tasklists") ? 
                        <TaskListForm user={user} Refresh={setDisplayTasklists}/>: 
                        ((display === "Notes") ? 
                            <NoteForm user={user} Refresh={setDisplayNotes} /> :
                            <TaskForm user={user} Refresh={setDisplayTasks} />)
                    }
                    <div className="notes">
                        {
                            (display === "Tasklists") ? (user.getTaskLists().map(e => <Tasklist key={e.id} user={user} tasklist={e} Refresh={setDisplayTasklists} />)) : 
                            (
                                (display === "Notes") ?
                                (user.getNotes().map(e => <Note key={e.id} user={user} note={e} Refresh={setDisplayNotes} />))
                                    : 
                                (user.getTasks().map(e => <Task key={e.id} user={user} task={e} Refresh={setDisplayTasks} />))
                            )
                        }
                    </div>
                </div>
            </section >
        </div >
    )
}

export default Dashboard;