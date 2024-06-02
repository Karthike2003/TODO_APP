import React, { createContext, ReactNode, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface User {
    username: string;
    email: string;
    password: string;
    todos: string[]; 
}

interface AuthContextProps {
    loggedIn: boolean;
    user: User | null;
    login: (username: string, password: string) => void;
    signup: (username: string, email: string, password: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
    loggedIn: false,
    user: null,
    login: () => {},  
    signup: () => {}, 
    logout: () => {}, 
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    
    const [users, setUsers] = useLocalStorage<User[]>('users', []);
    const [loggedIn, setLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    
    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser);
            setCurrentUser(user);
            setLoggedIn(true);
        }
    }, []);

    const login = (username: string, password: string) => {
        const user = users.find((u: User) => u.username === username && u.password === password);
        if (user) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            setCurrentUser(user);
            setLoggedIn(true);
        }
    };

    const signup = (username: string, email: string, password: string) => {
        const newUser: User = {
            username,
            email,
            password,
            todos: [] 
        };
        setUsers([...users, newUser]);
        localStorage.setItem('loggedInUser', JSON.stringify(newUser));
        setCurrentUser(newUser);
        setLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('loggedInUser');
        setCurrentUser(null);
        setLoggedIn(false);
        

    };

    return (
        <AuthContext.Provider value={{ loggedIn, user: currentUser, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
