import React, { useState, useEffect,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { loggedIn, login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(username, password);
        setUsername('');
        setPassword('');
    };

    useEffect(() => {
        if (loggedIn) {
            navigate('/todos');
        }
    }, [loggedIn, navigate]);

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
            </form>
        </div>
    );
};

export default Login;