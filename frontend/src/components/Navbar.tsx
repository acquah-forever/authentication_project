import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLogout, useAuthenticatedUser } from "../hooks/useAuth";
import { ChevronDown, House, TableOfContents, Handshake, Menu, X, UserRoundArrowLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

const Navbar = () => {

    const parent = {
        hidden: { opacity: 0, y: -70 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.25, duration: 0.7 } }
    }

    const children = {
        hidden: { opacity: 0, y: -70 },
        visible: { opacity: 1, y: 0 }
    }

    const { mutate } = useLogout();
    const { data: user, isLoading } = useAuthenticatedUser();
    const navigate = useNavigate();

    const [open, setOpen] = useState<boolean>(false);
    const [menu, setMenu] = useState<boolean>(false);


    function handleClick() {
        mutate(undefined, {
            onSuccess: () => {
                navigate("/login");
            },
        });
    }

    const toggle = (prev: boolean) => !prev;

    function handleOpen() {
        setOpen(toggle)
    };

    function handleMenu() {
        setMenu(toggle)
    };

    function handleClose() {
        setMenu(false)
    };


    return (
        <header>
            <nav className="flex items-center justify-between px-5 py-4 sm:px-10 sm:py-5 lg:px-15">
                <NavLink to="/" className="cursor-pointer text-lg flex items-center gap-2">
                    <House className="cursor-pointer flex justify-center items-center transition-all hover:scale-125 hover:underline duration-300" size={33} />
                    <h1>TechJob Finder</h1>
                </NavLink>
                <ul className="space-x-5 hidden md:flex">
                    <li className="text-md cursor-pointer flex justify-center items-center transition-all hover:scale-125 hover:underline duration-300">About</li>
                    <NavLink to="/jobs" className="text-md cursor-pointer flex justify-center items-center transition-all hover:scale-125 hover:underline duration-300">Jobs</NavLink>
                    <button type="button" className="text-md cursor-pointer gap-0.5 flex justify-center items-center transition-all hover:scale-125 hover:underline duration-300" onClick={handleOpen}>
                        More
                        <ChevronDown className="mt-1" size={18} />
                    </button>
                </ul>
                <div className="flex justify-center items-center ">
                    {
                        !isLoading && user ? (
                            <div className="border rounded-lg hidden md:flex gap-2 px-4 py-2 items-center">
                                <NavLink to="/profile" className="cursor-pointer transition-all hover:scale-107 hover:underline duration-300 bg-linear-to-tr from-slate-100 to-cyan-400 text-transparent bg-clip-text">{user.username}</NavLink>
                                <div>|</div>
                                <button type="button" className="cursor-pointer transition-all hover:scale-107 hover:underline duration-300" onClick={handleClick}>Log Out</button>
                            </div>
                        ) : (
                            <NavLink className="hidden md:flex justify-center items-center gap-2 px-5 py-2 rounded-sm border-2 border-white cursor-pointer transition-all hover:scale-110 hover:underline duration-300" to="/login">
                                <UserRoundArrowLeft className="border bg-gray-500 rounded-full px-1" size={27} />
                                Log In
                            </NavLink>
                        )
                    }
                </div>
                <motion.button type="button" variants={children} whileHover={{ scale: 1.25 }} className="cursor-pointer flex md:hidden" onClick={handleMenu}>
                    {menu ? (<X size={22} />) : (<Menu size={22} />)}
                </motion.button>
            </nav>

            <AnimatePresence>
                {
                    menu && (
                        <motion.nav className=" px-10 py-3 mx-10" variants={parent} initial="hidden" animate="visible" exit={{ opacity: 0, y: 50 }}>
                            <ul className="flex flex-col space-y-2 justify-start md:hidden">
                                <li className="text-md cursor-pointer flex justify-center items-center transition-all hover:scale-125 hover:underline duration-300" onClick={handleClose}>About</li>
                                <NavLink to="/jobs" className="text-md cursor-pointer flex justify-center items-center transition-all hover:scale-125 hover:underline duration-300" onClick={handleClose}>Jobs</NavLink>
                                {
                                    !isLoading && user ?
                                        <div className="rounded-lg flex md:hidden gap-2 p-2 justify-center items-center">
                                            <NavLink to="/profile" className="cursor-pointer transition-all hover:scale-107 hover:underline duration-300 bg-linear-to-tr from-slate-100 to-cyan-400 text-transparent bg-clip-text text-md">{user.username}</NavLink>
                                            <div className="text-3xl text-emerald-500">|</div>
                                            <button type="button" className="text-md transition-all hover:scale-107 hover:underline duration-300 cursor-pointer border px-2 py-1" onClick={handleClick}>Log Out</button>
                                        </div>
                                        :
                                        <NavLink className="flex md:hidden justify-center items-center gap-2 px-5 py-2cursor-pointer transition-all hover:scale-110 hover:underline duration-300" to="/login">
                                            <UserRoundArrowLeft className='border bg-gray-500 rounded-full px-' size={22} />
                                            <h1 className="text-md">Log In</h1>
                                        </NavLink>
                                }
                            </ul>
                        </motion.nav>
                    )
                }
            </AnimatePresence>

            <AnimatePresence>
                {open && (
                    <motion.nav variants={parent} initial="hidden" animate="visible" exit={{ opacity: 0, y: 50 }} className='px-5'>
                        <section className='px-5 hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 justify-items-center mt-3'>
                            <motion.div variants={children} className='space-y-4 mb-7'>
                                <h2 className='text-md font-bold tracking-tighter' >Resources</h2>
                                <div className='mt-3 flex space-x-4'>
                                    <House size={20} />
                                    <motion.div variants={children} whileHover={{ scale: 1.05 }}>
                                        <NavLink to="/" className='text-sm font-semibold underline' >Blog</NavLink>
                                        <h2 className='text-sm'>Read Industry Insights.</h2>
                                    </motion.div>
                                </div>

                                <div className='mt-2 flex space-x-4'>
                                    <TableOfContents size={20} />
                                    <motion.div variants={children} whileHover={{ scale: 1.05 }}>
                                        <a href='/#faq' className='text-sm font-semibold underline' >FAQ</a>
                                        <h2 className='text-sm'>Common Questions Asked.</h2>
                                    </motion.div>
                                </div>

                                <div className='mt-2 flex space-x-4'>
                                    <Handshake />
                                    <motion.div variants={children} whileHover={{ scale: 1.05 }}>
                                        <NavLink to="/" className='text-sm font-semibold underline' >Support</NavLink>
                                        <h2 className='text-sm'>We are here to help.</h2>
                                    </motion.div>
                                </div>
                            </motion.div>

                            <motion.div variants={children} className='space-y-4'>
                                <h2 className='text-md font-bold tracking-tighter' >Latest Insights</h2>
                                <div className='mt-3 flex space-x-3'>
                                    <motion.div variants={children} whileHover={{ scale: 1.05 }} className='p-10 w-50 rounded-xl bg-[url("https://cdn.pixabay.com/photo/2019/07/14/16/27/pen-4337521_1280.jpg")] bg-cover bg-center bg-no-repeat'>
                                    </motion.div>
                                    <div>
                                        <h1 className='text-sm font-semibold'>Finding Your Next Role</h1>
                                        <h2 className='text-sm'>Tips for landing positions.</h2>
                                        <motion.div variants={children} whileHover={{ scale: 1.05 }}>
                                            <NavLink to='/blogpost' className='text-sm underline' >Read More</NavLink>
                                        </motion.div>
                                    </div>
                                </div>


                            </motion.div>

                            <motion.div variants={children} className='space-y-4 sm:space-y-2'>
                                <h2 className='text-md font-bold tracking-tighter sm:pr-12' >Contact</h2>
                                <div>
                                    <h2 className='text-sm'>Get In touch with us.</h2>
                                </div>

                                <div className=' text-sm flex flex-col'>
                                    <p>Email</p>
                                    <motion.a variants={children} whileHover={{ scale: 1.05 }} className='font-semibold' href="nothtekayjay@icloud.com<">nothtekayjay@icloud.com</motion.a>
                                </div>

                                <div className=' text-sm flex flex-col'>
                                    <p>Telephone</p>
                                    <motion.a variants={children} whileHover={{ scale: 1.05 }} className='font-semibold' href="tel:+447931558921">+44 (0)7931 55 8921</motion.a>
                                </div>
                            </motion.div>
                        </section>
                    </motion.nav>

                )}
            </AnimatePresence>
        </header>
    )
}
export default Navbar
