
const Login = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl md:flex">
                <div className="relative min-h-[250px] w-full bg-[url('https://cdn.pixabay.com/photo/2014/03/10/18/46/clouds-284688_960_720.jpg')] bg-cover bg-center bg-no-repeat md:min-h-[600px] md:w-1/2">
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-white">
                        <h1 className="text-3xl font-bold text-center md:text-4xl">Welcome Back</h1>
                        <p className="mt-2 text-center text-sm md:text-base">Login to continue to your account</p>
                    </div>
                </div>
                <div className="w-full px-6 py-8 sm:px-10 md:w-1/2 md:px-12 lg:px-16">
                    <div className="mx-auto w-full max-w-md">
                        <h1 className="text-3xl font-bold text-gray-900">Login</h1>
                        <h2 className="mt-2 text-sm text-gray-500">Welcome back! Please enter your details</h2>
                        <div className="mt-8">
                            <label htmlFor="username" className="mb-2 block text-sm font-medium text-gray-700">Username</label>
                            <input className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" id="username" type="text" placeholder="Enter your username" />
                        </div>
                        <div className="mt-5">
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                className="
                            w-full
                            rounded-lg
                            border border-gray-300
                            px-4 py-3
                            text-sm
                            outline-none
                            transition
                            focus:border-blue-500
                            focus:ring-2
                            focus:ring-blue-500/20
                        "
                            />
                        </div>

                        {/* Forgot Password */}
                        <div className="mt-3 flex justify-end">
                            <button
                                type="button"
                                className="text-sm font-medium text-blue-600 hover:text-blue-700"
                            >
                                Forgot password?
                            </button>
                        </div>

                        {/* Login Button */}
                        <button
                            type="button"
                            className="
                        mt-6
                        w-full
                        rounded-lg
                        bg-blue-600
                        px-4 py-3
                        font-semibold
                        text-white
                        transition
                        hover:bg-blue-700
                        active:scale-[0.99]
                    "
                        >
                            Login
                        </button>

                        {/* Divider */}
                        <div className="my-6 flex items-center gap-3">
                            <div className="h-px flex-1 bg-gray-300"></div>

                            <span className="text-sm font-medium text-gray-500">
                                OR
                            </span>

                            <div className="h-px flex-1 bg-gray-300"></div>
                        </div>

                        {/* Google Login */}
                        <button
                            type="button"
                            className="
                        flex
                        w-full
                        items-center
                        justify-center
                        rounded-lg
                        border border-gray-300
                        px-4 py-3
                        font-medium
                        text-gray-700
                        transition
                        hover:bg-gray-50
                    "
                        >
                            Login with Google
                        </button>

                        {/* Sign Up */}
                        <p className="mt-6 text-center text-sm text-gray-600">
                            Don't have an account?{" "}
                            <button
                                type="button"
                                className="font-semibold text-blue-600 hover:text-blue-700"
                            >
                                Sign up
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
