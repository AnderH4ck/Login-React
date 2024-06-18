import React, { useState } from "react";
import {
  RiMailLine,
  RiLockLine,
  RiEyeLine,
  RiEyeOffLine,
  RiUserLine,
} from "react-icons/ri";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import axios from "axios";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const postRegister = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/register", data);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = (data) => {
    const { user, email, password } = data;

    if ([user, email, password].includes("")) {
      toast.error("😢 Todos los campos son obligatorios", {
        theme: "dark",
      });
      return;
    }

    if (password.length < 6) {
      toast.error("😢 El password debe tener al menos 6 caracteres", {
        theme: "dark",
      });
      return;
    }

    postRegister(data);

    // console.log(data);
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
          REGISTER
        </h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mb-4"
      >
        <div className="relative">
          <RiUserLine className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            {...register("username")}
            className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg"
            placeholder="Username"
          />
          {errors.user && (
            <span className="text-red-500">{errors.user.message}</span>
          )}
        </div>
        <div className="relative">
          <RiMailLine className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="email"
            {...register("email")}
            className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg"
            placeholder="Email"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="relative">
          <RiLockLine className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg"
            placeholder="Password"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
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
        <button
          type="submit"
          className="font-bold text-1xl mt-3 bg-white text-black w-full py-2 px-x6 rounded-lg hover:bg-cyan-100 transition-colors-transform transform hover:scale-110"
        >
          SAVE
        </button>
      </form>
    </div>
  );
}

export default Register;
