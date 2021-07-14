import React, { useState } from 'react'
import './Dashboard.css';
import Card from './Card.js'

function Dashboard() {
    
    return (
        <div>
            <header>
                <nav>
                    <button className="active" >Notas</button>
                    <button>Tarefas</button>
                    <button className="right-btn">Logout</button>
                </nav>
            </header>
            <section>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </section>
        </div>
    )
}

export default Dashboard;