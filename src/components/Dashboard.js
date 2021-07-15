import React, { useState, useContext } from 'react';
import Note from './Note.js'
import './Dashboard.css';


function Dashboard({user, Logout}) {

    const [display, setDisplay] = useState("Notes");
    const [notas, setDisplayNotes] = useState(user.getNotes());
    const [details, setDetailsNote] = useState({ title: "", content: "", tasklist: "1" });

    const submitHandler = e => {
        e.preventDefault();

        user.postNote(details)
    }
       
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
                    <div>
                        <form onSubmit={submitHandler}>
                            <div className='form-inner'>
                                <h2>Create new note</h2>
                                <div className="form-group">
                                    <label htmlFor="title">Title:</label>
                                    <input type="text" name="title" id="title" onChange={e => setDetailsNote({ ...details, title: e.target.value })} value={details.title} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="content">Content:</label>
                                    <input type="textarea" name="content" id="content" onChange={e => setDetailsNote({ ...details, content: e.target.value })} value={details.content} />
                                </div>
                                <select>
                                    <option value="1">tasklist 1</option>
                                    <option value="2">tasklist 2</option>
                                </select>
                                <input type="submit" value="Create note" />
                            </div>
                        </form>
                    </div>
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