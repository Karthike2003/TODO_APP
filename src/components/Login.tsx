import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const id = `${username}${password}`;
        const isSignedUp = localStorage.getItem(`signed_${id}`) === 'true';

        if (isSignedUp) {
            login(username, password);
            const isLoggedIn = localStorage.getItem(`loggedIn_${id}`) === 'true';
            if (isLoggedIn) {
                navigate('/todos');
            } else {
                alert('Invalid username or password.');
            }
        } else {
            alert('Please sign up before logging in.');
        }
    };

    return (
        <div className="flex justify-center items-center h-auto">
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
