import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/login-style.css';

const Login = () => {
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Cambia la URL por la de tu backend
        const response = await fetch(import.meta.env.VITE_APP_API_URL + '/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password }),
        });
        if (response.ok) {
            localStorage.setItem('clave', password);
            navigate('/home');
        } else {
            alert('Acceso denegado');
        }
    };

    return (
        <div className='body-login'>
            <div className="form-container">
                <p className="title">Clave</p>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="sign" type="submit">Ingresar</button>
                </form>
            </div>
        </div>
    );
};

export default Login;