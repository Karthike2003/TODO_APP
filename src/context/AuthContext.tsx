import React, { createContext, ReactNode, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface User {
    id: string; 
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
        } else {
            setLoggedIn(false);
        }
    }, []);

    const login = (username: string, password: string) => {
        const id = `${username}${password}`;
        const signedFlag = localStorage.getItem(`signed_${id}`);
        if (signedFlag) {
            const user = users.find((u: User) => u.username === username && u.password === password);
            if (user) {
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                setCurrentUser(user);
                setLoggedIn(true);
                localStorage.setItem(`loggedIn_${id}`, 'true'); 
            } else {
                alert('Invalid username or password.');
            }
        } else {
            alert('Please sign up before logging in.');
        }
    };

    const signup = (username: string, email: string, password: string) => {
        const id = `${username}${password}`;
        
    if (localStorage.getItem(`user_${id}`)) {
        alert('You are already registered. Please log in.');
        return false;
    }
  
        const newUser: User = {
            id,
            username,
            email,
            password,
            todos: [] 
        };
        
        setUsers([...users, newUser]);
        localStorage.setItem(`user_${id}`, JSON.stringify(newUser));
        localStorage.setItem(`signed_${id}`, 'true');
        localStorage.setItem('loggedInUser', JSON.stringify(newUser)); 
        setCurrentUser(newUser);
        setLoggedIn(true);
        localStorage.setItem(`loggedIn_${id}`, 'true'); 
        return true;
    
    };
    
    const logout = () => {
        const id = currentUser ? `${currentUser.username}${currentUser.password}` : '';
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem(`loggedIn_${id}`); 
        setCurrentUser(null);
        setLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ loggedIn, user: currentUser, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
    
};