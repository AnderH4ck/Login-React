// RecoveryPassword.js

import React from "react";
import { RiMailLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

function RecoveryPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/recovery", data);
      toast.success("📧 Revisa tu correo para restablecer tu contraseña", {
        theme: "dark",
      });
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error("🚨 Error al enviar el correo de recuperación", {
        theme: "dark",
      });
    }
  };

  return (
    <div className="bg-cyan-950 p-8 rounded-xl w-full md:w-96">
      <h4 className="text-white font-bold text-5xl text-center">JAC</h4>
      <h4 className="text-white text-1xl text-center p-3">
        Instant Messaging Service
      </h4>
      <div className="flex items-center justify-center w-full p-3">
        <img className="w-20 mr-6" src="./jac-logo-white.png" alt="" />
      </div>
      <div className="mb-10">
        <h1 className="text-white text-4xl p-2 uppercase font-bold text-center">
          Recuperar Contraseña
        </h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mb-4"
      >
        <div className="relative">
          <RiMailLine className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="email"
            {...register("email", { required: "El email es obligatorio" })}
            className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg"
            placeholder="Email"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="font-bold text-1xl mt-3 bg-white text-black w-full py-2 px-x6 rounded-lg hover:bg-cyan-100 transition-colors-transform transform hover:scale-110"
          >
            ENVIAR
          </button>
        </div>
        <div className="text-center mt-4">
          <Link
            to="/login"
            className="text-white hover:text-zinc-400 hover:underline transition-colors"
          >
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </div>
      </form>
    </div>
  );
}

export default RecoveryPassword;
