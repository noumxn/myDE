import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Interpreter() {
    const [userCode, setCode] = useState({ code: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        // Currently just checking if token exists. Should validate the token on the backend later
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const handleChange = (e) => {
        setCode({ ...userCode, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const res = await axios.post('http://localhost:4000/interpreter', userCode, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Python Interpreter</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="code"
                    placeholder="Code..."
                    value={userCode.code}
                    onChange={handleChange}
                />
                <button type="submit">Run</button>
            </form>
        </div>
    );
}

export default Interpreter;

