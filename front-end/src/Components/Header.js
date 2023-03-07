import React from "react";
import { Link } from 'react-router-dom';
import './style/Header.css'



const Header = () => {

    return (
        <>
            <nav className="headerNav">
                <p className="title">Grase Shoper</p>
                <ul className="list">
                    <li><Link to='/' className="headerLink">HOME</Link></li>
                    <li><Link to='/about' className="headerLink">ABOUT</Link></li>
                    <li><Link to='/products' className="headerLink">PRODUCTS</Link></li>

                </ul>
                <ul className="list">
                    <li><Link to='/search' className="headerIcon"><img className="headerIcon" src="https://cdn-icons-png.flaticon.com/512/149/149852.png" alt="searchIcon" /></Link></li>
                    <li><Link to='/cart' className="headerIcon"><img className="headerIcon" src="https://cdn-icons-png.flaticon.com/512/2832/2832495.png" alt="searchIcon" /></Link></li>
                    <li><Link to='/cart' className="headerIcon"><img className="headerIcon" src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png" alt="searchIcon" /></Link></li>


                </ul>
            </nav>
        </>
    )
}

export default Header