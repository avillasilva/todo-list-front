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
                    {(display === "Notes") ? <NoteForm user={user} Refresh={setDisplayNotes} /> : "" }
                    <div className="notes">                     
                        {(display === "Notes") ? (
                            user.getNotes().map(e => <Note key={e.id} user={user} note={e} Refresh={setDisplayNotes} />)
                        ) : (
                            console.log("eeee")
                        )}
                    </div>                        
                </div>                
            </section>
        </div>
    )
}

export default Dashboard;