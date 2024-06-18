import React from 'react'
import {Outlet} from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="grid grid-cols-6 min-h-screen bg-cyan-100 p-6">
        <Outlet/>
    </div>
  );
};

export default Dashboard;