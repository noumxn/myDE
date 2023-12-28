import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav>
            {location.pathname === '/interpreter' && (
                <button onClick={handleLogout}>Logout</button>
            )}
        </nav>
    );
}

export default Navbar;
