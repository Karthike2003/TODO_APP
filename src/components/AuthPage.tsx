import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

const AuthPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

    const handleTabClick = (tab: 'login' | 'signup') => {
        setActiveTab(tab);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-80">
                <div className="border rounded">
                    <div className="flex">
                        <button
                            className={`flex-1 py-2 ${
                                activeTab === 'login' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                            }`}
                            onClick={() => handleTabClick('login')}
                        >
                            Login
                        </button>
                        <button
                            className={`flex-1 py-2 ${
                                activeTab === 'signup' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                            }`}
                            onClick={() => handleTabClick('signup')}
                        >
                            Signup
                        </button>
                    </div>
                    <div className="p-4">
                        {activeTab === 'login' ? <Login /> : <Signup />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;