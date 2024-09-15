import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate here
import Login from './components/Login';
import Navbar from './components/Navbar';
import IAMCredentials from './components/IAMCredentials';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar /> {/* Navbar will automatically hide the logout button if not logged in */}
        
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/iam-credentials" element={<PrivateRoute element={<IAMCredentials />} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
