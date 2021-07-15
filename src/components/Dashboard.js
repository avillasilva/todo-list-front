import React, { useState, useContext } from 'react';
import Note from './Note';
import NoteForm from './NoteForm';
import './Dashboard.css';


function Dashboard({user, Logout}) {

    const [display, setDisplay] = useState("Notes");
    const [notas, setDisplayNotes] = useState(user.getNotes());
    // const [details, setDetailsNote] = useState({ title: "", content: "", tasklist: "1" });

    // const submitHandler = e => {
    //     e.preventDefault();

    //     user.postNote(details)
    // }
       
    return (
        <div>
            <header>
                <nav>
                    <button className={display === "Notes" ? 'active' : ''} onClick={e => setDisplay("Notes")}>Notes</button>
                    <button className={display === "Tasks" ? 'active' : ''} onClick={e => setDisplay("Tasks")}>Tasks</button>
                    <button className="right-btn" onClick={e => Logout()}>Logout</button>
                </nav>
            </header>
            <section>
                <div className="">
                    {(display === "Notes") ? <NoteForm user={user} Refresh={setDisplayNotes} /> : "" }

                    {(display === "Notes") ? (
                        user.getNotes().map(e => <Note key={e.id} user={user} note={e} Refresh={setDisplayNotes} />)
                    ) : (
                        console.log("eeee")
                    )}
                </div>
            </section>
        </div>
    )
}

export default Dashboard;