import React, { useState } from "react";
import {
  RiMailLine,
  RiLockLine,
  RiEyeLine,
  RiEyeOffLine,
} from "react-icons/ri";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function forgetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // const {signin} = useAuth();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmi = (e) => {
    e.preventDefault();

    if ([email].includes("")) {
      toast.error("😢El email es obligatorio", {
        theme: "dark",
      });
      return;
    }
    GiConsoleController.log("toda funcionalidad de login");
  };

  return (
    <div className="bg-white p-8 rounded-lg w-full md:w-96">
      <div className="flex items-center justify-center w-full p-3">
        <img className="w-10 " src="./jac-logo-dark.png" alt="" />
      </div>
      <div className="mb-10">
        <h1 className="text-3xl uppercase font-bold text-center">
          Recovery Password
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-4">
        <div className="relative">
          <RiMailLine className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <button className="mt-2 bg-sky-600 yexy-white w-full py-2 px-6 rounded-lg hover:bg-sky-800 transition-colors">
            Send Instructions
          </button>
        </div>
        <div className="flex item-center justify-between">
          Do you already have an account?{" "}
          <Link
            to="/"
            className="text-sky-600 font-medium hover:underline transition-all"
          >
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}

export default forgetPassword;
