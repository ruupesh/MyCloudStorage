import React from 'react';
import Logout from './Logout'; // Import the Logout component

function Dashboard() {
  const handleLogoutSuccess = () => {
    // Redirect to login or homepage after logout
    window.location.href = '/login';
  };

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <Logout onLogout={handleLogoutSuccess} /> {/* Include the Logout component */}
    </div>
  );
}

export default Dashboard;
