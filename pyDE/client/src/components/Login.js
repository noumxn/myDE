import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setLoginData({...loginData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Replace with your API endpoint
            const res = await axios.post('http://localhost:5000/login', loginData);
            console.log(res.data);
            // Handle login logic (e.g., storing tokens, redirecting)
        } catch (err) {
            console.error(err);
            // Handle errors (e.g., display error message)
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={loginData.email}
                    onChange={handleChange}
                />
                <br/>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={handleChange}
                />
                <br/>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;

