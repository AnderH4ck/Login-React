import React from "react";
import { RiMailLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { requestPasswordResetRequest } from "../../api/auth";

function RecoveryPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

 
  const onSubmit = async (data) => {
    try {
      const response = await requestPasswordResetRequest(data.email);
      console.log(response.data);

      toast.success(
        "Reset email sent. Please check your inbox.",
        {
          theme:"dark",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } catch (error) {
      console.error(error.response.data);

      toast.error("Error sending email. Please try again.", {
        theme:"dark",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const navigate = useNavigate();
  try {
    
    // Redirige al login luego del envio del correo
    navigate("/login");
  } catch (error) {
    console.log(error)
  }


  return (
    <div className="bg-cyan-950 p-8 rounded-xl w-full md:w-96">
      <h4 className="text-white font-bold text-5xl text-center">JAC</h4>
      <h4 className="text-white text-1xl text-center p-3">
        Instant Messaging Service
      </h4>
      <div className="flex items-center justify-center w-full p-3">
        <img className="w-20 mr-6" src="./jac-logo-white.png" alt="Logo" />
      </div>
      <div className="mb-10">
        <h1 className="text-white text-4xl p-2 uppercase font-bold text-center">
          Recovery Password
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
            {...register("email")}
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
            SEND
          </button>
          
        </div>
        <div className="text-center mt-4">
          <Link
            to="/login"
            className="text-white hover:text-zinc-400 hover:underline transition-colors"
          >
            Do you already have an account? Log in
          </Link>
        </div>
      </form>
    </div>
  );
}

export default RecoveryPassword;
