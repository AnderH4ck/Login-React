import React, { useState } from "react";
import { RiLockLine, RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { resetPasswordRequest } from "../../api/auth";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const onSubmit = async (data) => {
    try {
      await resetPasswordRequest(token, data.newPassword);
      toast.success("🔑 Contraseña restablecida con éxito", { theme: "dark" });
      navigate("/login");
    } catch (error) {
      toast.error("🚨 Error al restablecer la contraseña", { theme: "dark" });
    }
  };

  return (
    <div className="bg-cyan-950 p-8 rounded-xl w-full md:w-96">
      <h4 className="text-white font-bold text-5xl text-center">JAC</h4>
      <h4 className="text-white text-1xl text-center p-3">
        Instant Messaging Service
      </h4>
      <div className="flex items-center justify-center w-full p-3">
        <img className="w-20 mr-3" src="./jac-logo-white.png" alt="logo" />
      </div>
      <div className="mb-10">
        <h1 className="text-white text-4xl p-2 uppercase font-bold text-center">
          Restablecer Contraseña
        </h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mb-4"
      >
        <div className="relative">
          <RiLockLine className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type={showPassword ? "text" : "password"}
            {...register("newPassword", {
              required: "La contraseña es obligatoria",
              minLength: { value: 6, message: "Al menos 6 caracteres" },
            })}
            className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg"
            placeholder="Nueva Contraseña"
          />
          {errors.newPassword && (
            <span className="text-red-500 absolute top-full left-0">
              {errors.newPassword.message}
            </span>
          )}
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
          <button
            type="submit"
            className="font-bold text-1xl mt-3 bg-white text-black w-full py-2 px-6 rounded-lg hover:bg-cyan-100 transition-colors-transform transform hover:scale-110"
          >
            Restablecer Contraseña
          </button>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
