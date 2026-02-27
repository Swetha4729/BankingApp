// src/components/LoggedInLayout.jsx (New File - Create This)
import React from 'react';
import Sidebar from './Sidebar';

const LoggedInLayout = ({ children, user }) => (
  <div className="dashboard-container">
    <Sidebar user={user} />
    <div className="dashboard-main">
      {children}
    </div>
  </div>
);

export default LoggedInLayout;