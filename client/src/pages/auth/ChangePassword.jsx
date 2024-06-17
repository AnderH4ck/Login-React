import React, { useState } from "react";
import {
  RiMailLine,
  RiLockLine,
  RiEyeLine,
  RiEyeOffLine,
} from "react-icons/ri";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const { token } = useParams();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([password, confirmPassword].includes("")) {
      toast.error("😢Todos los campos son obligatorios", {
        theme: "dark",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("😢 Las contraseñas no coinciden", {
        theme: "dark",
      });
      return;
    }

    if (password.length < 6) {
      toast.error("😢 La contraseña debe tener al menos 6 caracteres", {
        theme: "dark",
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        token,
        password,
      });

      if (response.data.success) {
        toast.success("Tu contraseña se cambió correctamente", {
          theme: "dark",
        });
        navigate("/login");
      } else {
        toast.error(response.data.message || "Error al cambiar la contraseña", {
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error("Error al conectar con el servidor", {
        theme: "dark",
      });
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg w-full md:w-96">
      <div className="flex items-center justify-center w-full p-3">
        <img className="w-10 " src="./jac-logo-dark.png" alt="" />
      </div>
      <div className="mb-10">
        <h1 className="text-3xl uppercase font-bold text-center">
          Change Password
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-4">
        <div className="relative">
          <RiLockLine className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type={showPassword ? "text" : "password"}
            className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {showPassword ? (
            <RiEyeOffLine
              onClick={handleShowPassword}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:cursor-pointer"
            />
          ) : (
            <RiEyeLine
              onClick={handleShowPassword}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:cursor-pointer"
            />
          )}
        </div>
        <div className="relative">
          <RiLockLine className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type={showPassword ? "text" : "password"}
            className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {showPassword ? (
            <RiEyeOffLine
              onClick={handleShowPassword}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:cursor-pointer"
            />
          ) : (
            <RiEyeLine
              onClick={handleShowPassword}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:cursor-pointer"
            />
          )}
        </div>
        <div>
          <button className="mt-2 bg-sky-600 text-white w-full py-2 px-6 rounded-lg hover:bg-sky-800 transition-colors">
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
