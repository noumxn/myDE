import React, { useState } from 'react';
import axios from 'axios';

function Interpreter() {
    const [userCode, setCode] = useState({
        code: '',
    });

    const handleChange = (e) => {
        setCode({...userCode, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:4000/interpreter', userCode, {
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
