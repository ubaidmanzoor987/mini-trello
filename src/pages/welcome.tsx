import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/kanban');
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <h1 className="text-6xl text-white font-bold mb-8">Welcome to Mini Kanban Board</h1>
      <button
        className="bg-white text-purple-700 py-3 px-6 rounded-lg text-xl font-semibold shadow-md"
        onClick={handleStart}
      >
        Get Started
      </button>
    </div>
  );
};

export default WelcomeScreen;
