import { NavLink } from "react-router-dom"

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center px-5 py-3">
            <NavLink to="/" className="cursor-pointer text-lg">
                Home
            </NavLink>
            <ul className="flex space-x-5">
                <li className="text-md cursor-pointer">About</li>
                <li className="text-md cursor-pointer">Services</li>
                <li className="text-md cursor-pointer">Contact</li>
            </ul>
            <NavLink className="cursor-pointer bg-linear-to-br from-sky-400 to-sky-800 px-5 py-2 rounded-sm border-2 border-white" to="/login">
                    Log In
            </NavLink>
        </nav>
    )
}

export default Navbar
