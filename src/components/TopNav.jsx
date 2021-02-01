import React, { useEffect, useState } from 'react';
import '../stylesheets/TopNav.css';

function TopNav() {

    const [show, handleShow] = useState(false);

    // Check window scroll
    useEffect(() => {
        window.addEventListener("scroll", () => {
            // If a scroll greater than 5px is detected:
            if(window.scrollY > 5) {
                handleShow(true);
            } else {
                handleShow(false);
            }
        });
        return () => {
            // Remove listener everytime useEffect is called, this prevent us from stacking
            // multiple eventListener
            window.removeEventListener("scroll");
        }
    }, [])

    return (
        <div className={`topnav ${show && "topnav-onscroll"}`}>
            <img 
                className="topnav-logo"
                src="//upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png" 
                alt="Netflix Logo"
            />

            <ul className="primary-navigation">
                <li className="navigation-tab">
                    <a className="current active" href="">Browse</a>
                    <a href="#">TV Shows</a>
                    <a href="#">Movie</a>
                    <a href="#">New &amp; Popular</a>
                    <a href="#">My List</a>
                </li>
            </ul>
        </div>
    )
}

export default TopNav
