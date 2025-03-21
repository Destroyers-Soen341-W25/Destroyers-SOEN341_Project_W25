import React from 'react';
const Header = ({setIsModalOpen}) => {
    return (
        <header className="header">
            <h2 className="Logo">Destroyers</h2>
            <nav className="navigation">
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">FAQ</a>
                <a href="#">Contact</a>
                <button className="LoginButton" onClick={() => setIsModalOpen(true)}>Login</button>
            </nav>
        </header>
    );
};
export default Header;