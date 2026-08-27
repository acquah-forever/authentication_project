import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
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

            <AnimatePresence>
                {open && (
                    <motion.nav variants={parent} initial="hidden" animate="visible" exit={{ opacity: 0, y: 50 }} className='px-5'>
                        <section className='px-5 hidden md:grid md:grid-cols-2 lg:grid-cols-3 justify-items-center mt-3'>
                            <motion.div variants={children} className='space-y-4'>
                                <label className='text-md font-bold tracking-tighter' htmlFor="resources">Resources</label>
                                <div className='mt-3 flex space-x-4'>
                                    <House size={20} />
                                    <motion.div variants={children} whileHover={{ scale: 1.05 }}>
                                        <NavLink to="/" className='text-sm font-semibold underline' onClick={close}>Blog</NavLink>
                                        <h2 className='text-sm'>Read Industry Insights.</h2>
                                    </motion.div>
                                </div>

                                <div className='mt-2 flex space-x-4'>
                                    <TableOfContents size={20} />
                                    <motion.div variants={children} whileHover={{ scale: 1.05 }}>
                                        <Link to='/#faq' className='text-sm font-semibold underline' onClick={close}>FAQ</Link>
                                        <h2 className='text-sm'>Common Questions Asked.</h2>
                                    </motion.div>
                                </div>

                                <div className='mt-2 flex space-x-4'>
                                    <Handshake />
                                    <motion.div variants={children} whileHover={{ scale: 1.05 }}>
                                        <NavLink to="/" className='text-sm font-semibold underline' onClick={close}>Support</NavLink>
                                        <h2 className='text-sm'>We are here to help.</h2>
                                    </motion.div>
                                </div>
                            </motion.div>

                            <motion.div variants={children} className='space-y-4'>
                                <label className='text-md font-bold tracking-tighter' htmlFor="insights">Latest Insights</label>
                                <div className='mt-3 flex space-x-3'>
                                    <motion.div variants={children} whileHover={{ scale: 1.05 }} className='p-10 w-50 rounded-xl bg-[url("https://cdn.pixabay.com/photo/2019/07/14/16/27/pen-4337521_1280.jpg")] bg-cover bg-center bg-no-repeat'>
                                    </motion.div>
                                    <div>
                                        <h1 className='text-sm font-semibold'>Finding Your Next Role</h1>
                                        <h2 className='text-sm'>Tips for landing positions.</h2>
                                        <motion.div variants={children} whileHover={{ scale: 1.05 }}>
                                            <NavLink to='/blogpost' className='text-sm underline' onClick={close}>Read More</NavLink>
                                        </motion.div>
                                    </div>
                                </div>


                            </motion.div>

                            <motion.div variants={children} className='space-y-4'>
                                <label className='text-md font-bold tracking-tighter' htmlFor="contact">Contact</label>
                                <div>
                                    <h2 className='text-sm'>Get In touch with us.</h2>
                                </div>

                                <div className=' text-sm flex flex-col'>
                                    <label htmlFor="email">Email</label>
                                    <motion.span variants={children} whileHover={{ scale: 1.05 }} className='font-semibold'>nothtekayjay@icloud.com</motion.span>
                                </div>

                                <div className=' text-sm flex flex-col'>
                                    <label htmlFor="mobile">Telephone</label>
                                    <motion.span variants={children} whileHover={{ scale: 1.05 }} className='font-semibold'>+44 (0)7931 55 8921</motion.span>
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
