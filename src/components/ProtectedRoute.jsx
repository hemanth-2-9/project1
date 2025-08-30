import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * This component acts as a guard for your routes.
 * It checks if a 'jwt_token' exists in localStorage.
 * If the token exists, it renders the child component (the page you want to show).
 * If the token does NOT exist, it redirects the user to the /login page.
 */
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('jwt_token');

    if (!token) {
        // User is not authenticated, redirect to the login page
        return <Navigate to="/login" replace />;
    }

    // User is authenticated, so render the requested page
    return children;
};

export default ProtectedRoute;
