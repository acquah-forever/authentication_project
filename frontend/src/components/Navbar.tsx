import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLogout, useAuthenticatedUser } from "../hooks/useAuth";
import { ChevronDown, House, TableOfContents, Handshake, Menu, X, BriefcaseBusiness, UserRoundArrowLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'


const Navbar = () => {

    let parent = {
        hidden: { opacity: 0, y: -70 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.25, duration: 0.7 } }
    }

    let children = {
        hidden: { opacity: 0, y: -70 },
        visible: { opacity: 1, y: 0 }
    }
    const { mutate } = useLogout()
    const { data: user, isLoading, isPending } = useAuthenticatedUser();
    const navigate = useNavigate()

    const [open, setOpen] = useState<boolean>(false)

    function handleClick() {
        mutate(undefined, {
            onSuccess: () => {
                navigate("/login");
            },
        });
    }

    function handleOpen(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        setOpen(prev => !prev)
    }

    return (
        <header>
            <nav className="flex justify-between items-center px-15 py-5">
                <NavLink to="/" className="cursor-pointer text-lg">
                    <House className="cursor-pointer flex justify-center items-center transition-all hover:scale-125 hover:underline duration-300" size={34} />
                </NavLink>
                <ul className="flex space-x-5">
                    <li className="text-md cursor-pointer cursor-pointer flex justify-center items-center transition-all hover:scale-125 hover:underline duration-300">About</li>
                    <li className="text-md cursor-pointer cursor-pointer flex justify-center items-center transition-all hover:scale-125 hover:underline duration-300">Jobs</li>
                    <button className="text-md cursor-pointer gap-0.5 flex justify-center items-center transition-all hover:scale-125 hover:underline duration-300" onClick={handleOpen}>
                        More
                        <ChevronDown className="mt-1" size={18} />
                    </button>
                </ul>
                {
                    !isLoading && user ?
                        <button className="cursor-pointer bg-linear-to-br from-sky-400 to-sky-800 px-5 py-2 rounded-sm border-2 border-white" onClick={handleClick} disabled={isPending}>
                            {isPending ? "Logging out..." : "Log Out"}
                        </button>
                        :
                        <NavLink className="flex justify-center items-center gap-2 px-5 py-2 rounded-sm border-2 border-white cursor-pointer transition-all hover:scale-110 hover:underline duration-300" to="/login">
                            <UserRoundArrowLeft className='border bg-gray-500 rounded-full px-1' size={27} />
                            Log In
                        </NavLink>
                }
            </nav>
            {
                open && (

                )
            }
        </header>
    )
}

export default Navbar
