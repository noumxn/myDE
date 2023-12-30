import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CsharpRunner() {
    const [userCode, setCode] = useState({ code: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
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
            const res = await axios.post('http://localhost:4000/lang/csharp', userCode, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h2>C# Compiler</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    type="text"
                    name="code"
                    placeholder="Write your C# code here..."
                    value={userCode.code}
                    onChange={handleChange}
                ></textarea>
                <button type="submit">Run</button>
            </form>
        </div>
    );
}

export default CsharpRunner;
