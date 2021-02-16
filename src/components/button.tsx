import React from 'react';

interface IButtonProps {
    canClick: boolean;
    loading: boolean;
    actionText: string;
}

export const Button: React.FC<IButtonProps> = ({ canClick, loading, actionText }) => (
    <button
        className={` ${canClick ? 'bg-green-600 hover:bg-green-500' : 'bg-gray-300'} 
    py-3 text-white font-semibold rounded text-lg focus:outline-none
    hover:opacity-90 pointer-events-none`}
    >
        {loading ? 'Loading...' : actionText}
    </button>
);
