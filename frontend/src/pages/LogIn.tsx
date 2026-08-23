
const Login = () => {
    return (
        <div>
            <div className="bg-[url('https://cdn.pixabay.com/photo/2014/03/10/18/46/clouds-284688_960_720.jpg')]">
                <h1>Welcome Back</h1>
                <h2>Login to continue to your account</h2>
            </div> 
            <h1>Login</h1>
            <h2>Welcome back! Please enter your details</h2>
            <label htmlFor="email">Username</label>
            <input type="text" placeholder="Enter your username" />
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Enter your password" />
            <span>Forgot password?</span>
            <button>Login</button>
            <div className="flex">
                <div className="border-t border-white"></div>
                <h1>OR</h1>
                <div className="border-t border-white"></div>
            </div>
            <button>Login with Google</button>
            <h1>Don't have an account? <span>Sign up</span></h1>

        </div>
    )
}

export default Login
