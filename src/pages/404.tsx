import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => (
    <div className="h-screen flex flex-col items-center justify-center">
        <h2 className="font-semibold text-2xl mb-3">Page not found.</h2>
        <h4 className="font-bold text-base mb-5">The page you're looking for does not exist or has moved</h4>
        <Link className="hover:underline text-lime-600" to="/">Go back home</Link>
    </div>
)