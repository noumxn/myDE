import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PythonRunner() {
    const [userCode, setCode] = useState({ code: '' });
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
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
        setOutput(''); 
        setError('');
        try {
            const res = await axios.post('http://localhost:4000/lang/python', userCode, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setOutput(res.data.result); 
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred');
        }
    };

    return (
        <div>
            <h2>Python Interpreter</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    name="code"
                    placeholder="Write your python code here..."
                    value={userCode.code}
                    onChange={handleChange}
                ></textarea>
                <button type="submit">Run</button>
            </form>
            {output && <div><strong>Output:</strong> <pre>{output}</pre></div>}
            {error && <div><strong>Error:</strong> <pre>{error}</pre></div>}
        </div>
    );
}

export default PythonRunner;
