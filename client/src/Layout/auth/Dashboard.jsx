import React from 'react'
import {Outlet} from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cyan-100 p-6">
        <Outlet/>
    </div>
  );
};

export default Dashboard;