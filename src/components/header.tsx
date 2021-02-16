
import React from 'react';
import { useMe } from '../hooks/useMe';

export const Header: React.FC = () => {
    const { data } = useMe()
    return (
        < header className="py-6 flex" >
            <div className="w-full max-w-screen-xl mx-auto flex justify-between items-center">
                <div>Logo</div>
                <span className="text-xs">{data?.me.email}</span>
            </div>
        </header >
    )
}