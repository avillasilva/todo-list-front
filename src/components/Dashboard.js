import React, { useState } from 'react';
import './Dashboard.css';


function Dashboard({user, Logout}) {

    const [display, setDisplay] = useState({type:"Notes"});
    
    // function fetchNotes () {
    //     const notas = user.getNotes();
    //     array.forEach(element => {
            
    //     });
    // }

    function componentDidMount() {
        const notas = user.getNotes();
        console.log(user);
    }
    
    function fetchTasks () {
        
    }

    return (
        <div>
            <header>
                <nav>
                    <button className={display.type === "Notes" ? 'active' : ''} onClick={e => setDisplay("Notes")}>Notas</button>
                    <button className={display.type === "Tasks" ? 'active' : ''} onClick={e => setDisplay("Tasks")}>Tarefas</button>
                    <button className="right-btn" onClick={e => Logout()}>Logout</button>
                </nav>
            </header>
            <section>
                <div className="">
                    {(display.type === "Notes") ? (
                        componentDidMount()
                    ) : (
                        fetchTasks()
                    )}
                </div>
            </section>
        </div>
    )
}

export default Dashboard;