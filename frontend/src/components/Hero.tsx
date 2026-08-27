import { motion,spring } from 'motion/react'


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
        <motion.div variants={parent} initial="hidden" animate="visible" className="flex flex-col justify-center items-center px-5 mt-35">
            <motion.span variants={children} className="border rounded-full px-4 py-2 text-sm bg-linear-to-br from-cyan-400 to-green-800">2000+ jobs available</motion.span>
            <motion.h1 variants={children} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-center mt-4 mb-4 font-semibold">Finding Your Dream <br /><span className="bg-linear-to-tr from-emerald-400 to-sky-400 text-transparent bg-clip-text">Software Engineering</span><br />Role Today</motion.h1>
            <motion.h2 variants={children} className="text-xl sm:text-2xl md:text-3xl text-center mb-5 mt-5">Search through the latest opportunities in software engineering. Get hired fast with positions updated daily</motion.h2>
            <div className='flex gap-3'>
                <motion.button variants={children} whileHover={{scale: 1.20}} whileTap={{scale: 0.9}} transition={{ type: spring, stiffness: 120, damping: 7 }} className="bg-linear-to-br from-emerald-400 to-emerald-700 px-4 py-2 rounded border-2 border-slate-500 cursor-pointer text-lg sm:text-xl">Browse</motion.button>
            </div>
        </motion.div>
    )
}

export default Hero
