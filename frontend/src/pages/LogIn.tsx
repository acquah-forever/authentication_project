import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CircleAlert } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useLogin } from "../hooks/useAuth";

interface FormBody {
    username: string,
    password: string
}

const Login = () => {

    const { handleSubmit, register, formState: { errors } } = useForm<FormBody>()

    const navigate = useNavigate()

    const { mutate, isPending, isError, error } = useLogin();

    function onsubmit(data: FormBody) {
        mutate(data, {
            onSuccess: () => {
                navigate("/");
            },
        });
    }

    return (
        <div id="/login" className="min-h-250 sm:min-h-screen flex items-center justify-center px-7">
            <div className="w-full max-w-5xl overflow-hidden rounded-2xl bg-white md:flex">
                <div className="relative min-h-62.5 w-full bg-[url('https://cdn.pixabay.com/photo/2014/03/10/18/46/clouds-284688_960_720.jpg')] bg-cover bg-center bg-no-repeat  md:w-1/2">
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
                        <div className="mt-20 md:mt-0">
                            <h1 className="text-3xl font-bold  md:text-4xl">Welcome Back!</h1>
                            <p className="mt-2 text-sm md:text-base">Login to continue to your account</p>
                        </div>
                    </div>
                </div>
                <div className="w-full px-6 py-8 sm:px-10 md:w-1/2 md:px-12 lg:px-16">
                    <form onSubmit={handleSubmit(onsubmit)} className="mx-auto w-full max-w-md">
                        <h1 className="text-3xl font-bold text-gray-900">Login</h1>
                        <h2 className="mt-2 text-sm text-gray-500">Welcome back! Please enter your details</h2>
                        {isError && <p className="text-red-500 text-sm font-semibold flex items-center my-2">{error.message}</p>}
                        <div className="mt-8">
                            <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="username">Username</label>
                            <input className="text-gray-700 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" id="username" type="text" placeholder="Enter your username"{...register("username", { required: "Enter your username" })} />
                        </div>
                        {errors.username && <span className="text-red-500 text-sm font-semibold flex items-center my-2">
                            <CircleAlert className="mr-1" size={15} />
                            {errors.username.message} </span>}
                        <div className="mt-5">
                            <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
                            <input className="text-gray-700 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" id="password" type="password" placeholder="Enter your password"{...register("password", { required: "Enter your password" })} />
                        </div>
                        {errors.password && <span className="text-red-500 text-sm font-semibold flex items-center mt-2">
                            <CircleAlert className="mr-1" size={15} />
                            {errors.password.message}</span>}
                        <div className="mt-3 flex justify-end">
                            <button className="text-sm font-medium text-blue-600 hover:text-blue-700" type="button">Forgot your password?</button>
                        </div>
                        <button className="cursor-pointer mt-6 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transitionhover:bg-blue-700 active:scale-[0.99]" type="submit" disabled={isPending}>{isPending ? "Logging in" : "Login"}</button>
                        <div className="my-6 flex items-center gap-3">
                            <div className="h-px flex-1 bg-gray-300"></div>
                            <span className="text-sm font-medium text-gray-500"> OR</span>
                            <div className="h-px flex-1 bg-gray-300"></div>
                        </div>
                        <div className="flex justify-center">
                            <button className="btn bg-white text-black border-[#e5e5e5] w-full py-6">
                                <svg aria-label="Google logo" width="23" height="23" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                Login with Google
                            </button>
                        </div>
                        <p className="mt-6 text-center text-sm text-gray-600">
                            Don't have an account?{" "}
                            <NavLink to="/signup" className="cursor-pointer font-semibold text-blue-600 hover:text-blue-700" type="button">Sign Up</NavLink>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
