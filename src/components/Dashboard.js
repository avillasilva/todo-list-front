import React, { useState, useContext } from 'react';
import Note from './Note.js'
import Task from './Tasks'
import './Dashboard.css';


function Dashboard({ user, Logout }) {

    const [display, setDisplay] = useState("Notes");
    const [notas, setDisplayNotes] = useState(user.getNotes());
    const [tasks, setDisplayTasks] = useState(user.getTasks());
    const [details, setDetailsNote] = useState({ title: "", content: "", tasklist: "1" });
    const [detailsTask, setDetailsTask] = useState({ title: "", description: "", deadline: "", list_id: 1, category_id: 2 });

    const submitHandler = e => {
        e.preventDefault();

        user.postNote(details)
    }

    const taskSubmitHandler = e => {
        e.preventDefault();

        console.log(detailsTask)
        user.postTask(detailsTask)
    }

    return (
        <div>
            <header>
                <nav>
                    <div>
                        <button className={display === "Notes" ? 'active' : ''} onClick={e => setDisplay("Notes")}>Notes</button>
                        <button className={display === "Tasks" ? 'active' : ''} onClick={e => setDisplay("Tasks")}>Tasks</button>
                    </div>
                    <div>
                        <button className="right-btn" onClick={e => Logout()}>Logout</button>
                    </div>
                </nav>
            </header>
            <section>
                <div className="corpo-dash">
                    {(display === "Notes") ? <NoteForm user={user} Refresh={setDisplayNotes} /> : ""}
                    <div className="notes">
                        {(display === "Notes") ? (
                            user.getNotes().map(e => <Note key={e.id} user={user} note={e} Refresh={setDisplayNotes} />)
                        ) : (
                            user.getTasks().map(e => <Task key={e.id} user={user} task={e} Refresh={setDisplayTasks} />)
                        )}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Dashboard;