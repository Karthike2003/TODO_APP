import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

const CombinedAuthPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

    const handleTabClick = (tab: 'login' | 'signup') => {
        setActiveTab(tab);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <div className="flex justify-center mb-6">
                    <button
                        className={`py-2 px-6 text-lg font-semibold rounded-tl-lg rounded-bl-lg ${
                            activeTab === 'login' ? 'bg-blue-500 text-white' : 'text-blue-500'
                        }`}
                        onClick={() => handleTabClick('login')}
                    >
                        Login
                    </button>
                    <button
                        className={`py-2 px-6 text-lg font-semibold rounded-tr-lg rounded-br-lg ${
                            activeTab === 'signup' ? 'bg-blue-500 text-white' : 'text-blue-500'
                        }`}
                        onClick={() => handleTabClick('signup')}
                    >
                        Signup
                    </button>
                </div>
                <div className="bg-gray-100 rounded-b-lg p-6">
                    {activeTab === 'login' ? <Login /> : <Signup />}
                </div>
            </div>
        </div>
    );
};

export default CombinedAuthPage;
