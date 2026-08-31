import { motion,spring } from 'motion/react'
import { NavLink } from 'react-router-dom'


const Hero = () => {
    const parent = {
        hidden: { opacity: 0, y: -70 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.25, duration: 0.7 } }
    }

    const children = {
        hidden: { opacity: 0, y: -70 },
        visible: { opacity: 1, y: 0 }
    }
    return (
        <motion.div variants={parent} initial="hidden" animate="visible" className="min-h-screen flex flex-col items-center justify-center px-4 pb-16 sm:px-5 sm:pb-24">
            <motion.span variants={children} className="border rounded-full px-4 py-2 text-sm bg-linear-to-br from-cyan-400 to-green-800">2000+ jobs available</motion.span>
            <motion.h1 variants={children} className="mt-4 mb-4 text-center text-4xl font-semibold sm:text-6xl md:text-7xl lg:text-8xl">Finding Your Dream <br /><span className="bg-linear-to-tr from-emerald-400 to-sky-400 text-transparent bg-clip-text">Software Engineering</span><br />Role Today</motion.h1>
            <motion.h2 variants={children} className="mt-5 mb-5 max-w-5xl text-center text-lg sm:text-2xl md:text-3xl">Search through the latest opportunities in software engineering. Get hired fast with positions updated daily</motion.h2>
            <motion.div  variants={children} whileHover={{scale: 1.20}} whileTap={{scale: 0.9}} transition={{ type: spring, stiffness: 120, damping: 7 }} className='flex gap-3'>
                <NavLink to="/jobs" className="bg-linear-to-br from-emerald-400 to-emerald-700 px-4 py-2 rounded border-2 border-slate-500 cursor-pointer text-lg sm:text-xl">Browse</NavLink>
            </motion.div>
        </motion.div>
    )
}

export default Hero
