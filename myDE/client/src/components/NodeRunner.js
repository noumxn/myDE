import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';

function NodeRunner() {
    const [userCode, setCode] = useState('// Write your javascript code here...\n');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const handleEditorChange = (value, event) => {
        setCode(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        setOutput(''); 
        setError('');
        try {
            const res = await axios.post('http://localhost:4000/lang/node', { code: userCode }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setOutput(res.data.result); 
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred');
        }
    };

    return (
        <div>
            <h2>Javascript(Node) Compiler</h2>
            <form onSubmit={handleSubmit}>
                <Editor
                    height="65vh"
                    defaultLanguage="javascript"
                    theme='vs-dark'
                    defaultValue={userCode}
                    onChange={handleEditorChange}
                />
                <button type="submit">Run</button>
            </form>
            <div className="output-container">
                OUTPUT:
                {output && (
                        <pre>{output}</pre>
                )}
                {error && (
                        <pre>{error}</pre>
                )}
            </div>
        </div>
    );
}

export default NodeRunner;
