import React, { useState, useEffect } from 'react';

const AuthenticationModal = ({ isModalOpen, setIsModalOpen }) => {
    const [open, setOpen] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        setOpenModal(isModalOpen);
        setOpen(true)
    }, [isModalOpen]);

    const handleRegister = async (event) => {
        event.preventDefault();
        const role = 'member';

        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: username, password, role })
            });

            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: username, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(data.user));

                if (data.user.role === 'superadmin') {
                    alert('Welcome back, ' + data.user.name + '!');
                    setTimeout(() => {
                        window.location.href = '/superadmin';
                    }, 1000);
                } else if (data.user.role === 'admin' || data.user.role === 'member') {
                    alert('Welcome back, ' + data.user.name + '!');
                    setTimeout(() => {
                        window.location.href = 'http://localhost:3001/Chatpage';
                    }, 1000);
                }
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className={`container ${open ? 'active' : ''} ${openModal ? 'active-popup' : ''}`}>
            <span className="icon-close" onClick={() => {
                setOpenModal(false);
                setIsModalOpen(false);
            }}>
                <i className="fa-solid fa-circle-xmark"></i>
            </span>
            <div className="form-box-login">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-field">
                        <span className="fa-solid fa-user"></span>
                        <label>
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </label>
                    </div>
                    <div className="input-field">
                        <span className="fa-solid fa-lock"></span>
                        <label>
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </label>
                    </div>
                    <button type="submit" className="login-button">Login</button>
                    <div className="login-register">
                        <p>Don't have an account? <a href="#" onClick={() => setOpen(false)}>Register</a></p>
                    </div>
                </form>
            </div>
            <div className="form-box-register">
                <h2>Registration</h2>
                <form onSubmit={handleRegister}>
                    <div className="input-field">
                        <span className="fa-solid fa-user"></span>
                        <label>
                            <input type="text" placeholder="Username" value={username}
                                   onChange={(e) => setUsername(e.target.value)} required/>
                        </label>
                    </div>
                    <div className="input-field">
                        <span className="fa-solid fa-envelope"></span>
                        <label>
                            <input type="email" placeholder="Email" value={email}
                                   onChange={(e) => setEmail(e.target.value)} required/>
                        </label>
                    </div>
                    <div className="input-field">
                        <span className="fa-solid fa-lock"></span>
                        <label>
                            <input type="password" placeholder="Password" value={password}
                                   onChange={(e) => setPassword(e.target.value)} required/>
                        </label>
                    </div>
                    <div className="remember-forgot">
                        <label>
                            <input type="checkbox"/> I agree to the terms & conditions
                        </label>
                    </div>
                    <button type="submit" className="login-button">Register</button>
                    <div className="login-register">
                        <p>Already have an account? <a href="#" onClick={() => setOpen(true)}>Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AuthenticationModal;
