import React, { createContext, ReactNode, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';


// Define user type for better type safety
interface User {
    username: string;
    email: string;
    password: string;
}

interface AuthContextProps {
    loggedIn: boolean;
    login: (username: string, password: string) => void;
    signup: (username: string, email: string, password: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
    loggedIn: false,
    login: () => {},  // Placeholder function
    signup: () => {}, // Placeholder function
    logout: () => {}, // Placeholder function
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [users, setUsers] = useLocalStorage<User[]>('users', []);
    const [loggedIn, setLoggedIn] = useState(false);

    const login = (username: string, password: string) => {
        const user = users.find((u: User) => u.username === username && u.password === password);
        if (user) {
            setLoggedIn(true);
        }
    };

    const signup = (username: string, email: string, password: string) => {
        setUsers([...users, { username, email, password }]);
    };

    const logout = () => {
        setLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ loggedIn, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
