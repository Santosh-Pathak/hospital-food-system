// Code to render the app and set up the routes for the different pages of the application.

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ManagerDashboard from './pages/ManagerDashboard';
import PantryDashboard from './pages/PantryDashboard';
import DeliveryDashboard from './pages/DeliveryDashboard';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/manager" element={<ProtectedRoute><ManagerDashboard /></ProtectedRoute>} />
            <Route path="/pantry" element={<ProtectedRoute><PantryDashboard /></ProtectedRoute>} />
            <Route path="/delivery" element={<ProtectedRoute><DeliveryDashboard /></ProtectedRoute>} />
        </Routes>
    );
};

export default App;
