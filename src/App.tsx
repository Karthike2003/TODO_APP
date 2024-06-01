import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import Todo from './components/Todo';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Set the default route to the AuthPage */}
                    <Route path="/" element={<AuthPage />} />
                    <Route path="/todos" element={<Todo />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
