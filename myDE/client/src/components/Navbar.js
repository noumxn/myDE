import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const handleLanguageChange = (language) => {
        navigate(`/lang/${language}`);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
    return (
        <nav>
            {location.pathname.startsWith('/lang') && (
                <>
                    <select onChange={(e) => handleLanguageChange(e.target.value)} defaultValue="python">
                        <option value="python">Python</option>
                        <option value="node">Node</option>
                        <option value="java">Java</option>
                        <option value="cpp">Cpp</option>
                        <option value="rust">Rust</option>
                    </select>
                    <button onClick={handleLogout}>Logout</button>
                </>
            )}
        </nav>
    );
}

export default Navbar;

