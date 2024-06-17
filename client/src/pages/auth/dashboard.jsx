import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">

      <div className="w-96 bg-cyan-950 p-6">
        <div className="text-white font-bold text-xl mb-4 "></div>
          <div className='w-40 h-40 flex justify-center p-4 bg-cyan-100 rounded-full'>
            <img className='w-20 h-20 object-cover rounded-full' src="./public/user4.png" alt="" />
            <h1 className=''>USERNAME</h1>
          </div>
        <ul className="space-y-4">
          <li>
            <a href="#" className="text-white hover:text-cyan-100">Contactos</a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-cyan-100">Mensajes</a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-cyan-100">Reportes</a>
          </li>
        </ul>
      </div>

      
      <div className="flex-1 bg-cyan-100 p-4">
        <h1 className="text-2xl font-bold mb-4">Contenido</h1>
        {}
      </div>
    </div>
  );
};

export default Dashboard;
