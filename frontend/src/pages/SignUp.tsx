import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { CircleAlert } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useSignup } from "../hooks/useAuth";


interface FormBody {
  username: string,
  email: string,
  password: string
}

const SignUp = () => {
  const { handleSubmit, register, formState: { errors } } = useForm<FormBody>()

  const navigate = useNavigate()

  const signupMutation = useSignup();

  function onsubmit(data: FormBody) {
    signupMutation.mutate(data, {
      onSuccess: () => {
        navigate("/");
      },
    });
  }

  return (
    <div id="/signup" className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-5xl overflow-hidden rounded-2xl bg-white md:flex">
        <div className="relative min-h-62.5 w-full bg-[url('https://cdn.pixabay.com/photo/2014/03/10/18/46/clouds-284688_960_720.jpg')] bg-cover bg-center bg-no-repeat  md:w-1/2">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10  h-full flex flex-col items-center justify-center px-6 text-white">
            <h1 className="text-3xl font-bold text-center md:text-4xl">Welcome!</h1>
            <p className="mt-2 text-center text-sm md:text-base">Sign up to create an account</p>
          </div>
        </div>
        <div className="w-full px-6 py-8 sm:px-10 md:w-1/2 md:px-12 lg:px-16">
          <form onSubmit={handleSubmit(onsubmit)} className="mx-auto w-full max-w-md">
            <h1 className="text-3xl font-bold text-gray-900">SignUp</h1>
            <h2 className="mt-2 text-sm text-gray-500">Welcome! Please enter your details</h2>
            <div className="mt-8">
              <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="username">Username</label>
              <input className="text-gray-700 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" id="username" type="text" placeholder="Enter your username"{...register("username", { required: "Enter your username" })} />
            </div>
            {errors.username && <span className="text-red-500 text-sm font-semibold flex items-center my-2">
              <CircleAlert className="mr-1" size={15} />
              {errors.username.message} </span>}
            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
              <input className="text-gray-700 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" id="email" type="text" placeholder="Enter your email"{...register("email", { required: "Enter your email" })} />
            </div>
            {errors.email && <span className="text-red-500 text-sm font-semibold flex items-center my-2">
              <CircleAlert className="mr-1" size={15} />
              {errors.email.message} </span>}
            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
              <input className="text-gray-700 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" id="password" type="password" placeholder="Enter your password"{...register("password", { required: "Enter your password" })} />
            </div>
            {errors.password && <span className="text-red-500 text-sm font-semibold flex items-center mt-2">
              <CircleAlert className="mr-1" size={15} />
              {errors.password.message}</span>}
            <button className="cursor-pointer mt-6 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transitionhover:bg-blue-700 active:scale-[0.99]" type="submit">Sign Up</button>
            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <NavLink to="/login" className="cursor-pointer font-semibold text-blue-600 hover:text-blue-700" type="button">Log In</NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
