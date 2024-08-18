import React from 'react'
import logo from '../assets/1802979.png'
import './header.css'
export default function Header() {
    return <header className="App-header">
        <div className="item-aligner">
        <img src={logo} className="logoStyle" width={'120px'} alt={'logo'}/>
        <h1>
            Worker Management
        </h1>
        </div>
    </header>
}