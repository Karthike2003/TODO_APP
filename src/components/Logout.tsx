import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const Logout: React.FC = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); 
        navigate('/');
    };

    return (
        <button onClick={handleLogout} className="text-sm w-14 h-8 rounded-sm text-white bg-red-500 mt-4">Logout</button>
    );
};

export default Logout;
