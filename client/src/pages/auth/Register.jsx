import { useForm } from "react-hook-form";


function Register() {
    
  return (
    <div className="bg-cyan-950 p-8 rounded-xl w-full md:w-96">
        <h4 className="text-white font-bold text-5xl text-center">JAC</h4>
        <h4 className="text-white text-1xl text-center p-3">Instant Messaging Service</h4>
      <div className="flex items-center justify-center w-full p-3">
        <img className="w-20" src="./jac-logo-white.png" alt="" />
      </div>
      <div className="mb-10">
        <h1 className="text-white text-4xl p-2 uppercase font-bold text-center">login</h1>
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
        <div className="text-right">
          <Link
            to="recover-password"
            className="text-x.5 text-white hover:text-zinc-400 hover:underline transition-colors"
          >
            Did you forget your password?
          </Link>
        </div>
        <div>
          <button
            type="submit"
            className="font-bold text-1xl mt-3 bg-white text-black w-full py-2 px-x6 rounded-lg hover:bg-cyan-100 transition-colors-transform transform hover:scale-110"
          >
            SIGN IN
          </button>
        </div>
      </form>
    
    </div>
  );
  
}


export default Register;
