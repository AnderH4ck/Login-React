import React from "react";
import { RiContactsBook3Line, RiMessage3Line } from "react-icons/ri";
import { TbReport } from "react-icons/tb";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Asegúrate de importar correctamente el contexto de autenticación

const Dashboard = () => {
  const { user, logout } = useAuth(); // Obtén el usuario y la función de logout del contexto de autenticación
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Llama a la función de logout para borrar el token y cambiar el estado de autenticación
    navigate("/login"); // Redirige al usuario a la página de inicio de sesión
  };

  return (
    <div className="flex min-h-screen bg-cyan-100">
      <div className="border border-black w-96 bg-cyan-950 p-6 rounded-3xl mt-5 mb-5 ml-5">
        <div className="flex flex-col items-center justify-center p-1 mb-4 ">
          <div className="border border-black w-36 h-36 flex justify-center items-center bg-cyan-100 rounded-full">
            <img
              className="w-15 h-16 object-cover rounded-full"
              src="./user4.png"
              alt=""
            />
          </div>
          <h1 className="text-2xl font-bold text-white p-4">Welcome</h1>
          <h2 className="border border-black bg-cyan-100 py-1 px-20 rounded-full text-1xl font-bold text-black">
            {user?.username}
          </h2>
        </div>

        {/* div para qr */}
        <div className="flex flex-col items-center ">
          <div className="border border-black flex flex-col items-center justify-center h-60 w-60 p-12 mb-6 bg-cyan-800 text-white rounded-3xl">
            <img src="" alt="" />
          </div>
        </div>

        {/* navegacion */}
        <div className="flex justify-center">
          <nav className="flex flex-col justify-center border border-black space-y-2 bg-cyan-800 p-8 rounded-3xl w-60 ">
            <a
              href="#"
              className=" flex items-center gap-4 text-white font-bold rounded-xl hover:bg-cyan-950 px-5 py-1"
            >
              <RiContactsBook3Line />
              Contact
            </a>

            <a
              href="#"
              className=" flex items-center gap-4 text-white font-bold rounded-xl hover:bg-cyan-950 px-5 py-1"
            >
              <RiMessage3Line />
              Message
            </a>

            <a
              href="#"
              className="flex items-center gap-4 text-white font-bold rounded-xl hover:bg-cyan-950 px-5 py-1"
            >
              <TbReport /> Report
            </a>

            <a
              href="#"
              className="flex items-center gap-4 text-white font-bold rounded-xl hover:bg-cyan-950 px-5 py-1"
              onClick={handleLogout}
            >
              <IoLogOutOutline />
              Log out
            </a>
          </nav>
        </div>

        {/* logo  */}
        <div className="flex flex-col mr-5 items-center justify-center mt-6">
          <img className="w-10 mr-3 h-10" src="./jac-logo-white.png" alt="" />
          <h4 className="text-white font-bold text-1xl text-center p-1">JAC</h4>
          <h4 className="text-white text-1xl text-center">
            Instant Messaging Service
          </h4>
        </div>
      </div>

      <div className="flex-1 bg-cyan-100 p-4">
        <h1 className="text-2xl font-bold mb-4">Contenido</h1>
        {/* Aquí va el contenido del dashboard */}
      </div>
    </div>
  );
};

export default Dashboard;
