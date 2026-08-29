import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { motion, spring } from 'motion/react'

const Faq = () => {

    const parent = {
        hidden: { opacity: 0, y: -70 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.25, duration: 0.8 } }
    }

    const children = {
        hidden: { opacity: 0, y: -70 },
        visible: { opacity: 1, y: 0 }
    }

    const [open, setOpen] = useState<number | null>(null)

    function handleClick(index) {
        setOpen((prev) => (prev === index ? null : index))
    }
    return (
        <motion.section id='faq' variants={parent} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.7 }} className='min-h-screen flex flex-col items-center'>
            <div className='space-y-4 text-center mb-20'>
                <motion.h1 variants={children} className='text-4xl font-bold'>FAQ</motion.h1>
                <motion.p variants={children} className='text-2xl font-semibold'>Questions about how TechJob Finder works and what we offer.</motion.p>
            </div>

            <motion.div variants={parent} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.7 }} whileHover={{scale:1.06}} className='border p-7 max-w-5xl w-full mb-7'>
                <motion.div variants={children} className='flex items-center justify-between mb-4'>
                    <h3>How often are jobs posted ?</h3>
                    <button onClick={() => handleClick(1)}>
                        {open === 1 ? <ChevronUp /> : <ChevronDown />}
                    </button>
                </motion.div>

                {open === 1 && (
                    <motion.div variants={parent} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.7 }}>
                        <motion.p variants={children}>New positions arrive daily from companies actively hiring. We refresh listings regularly so
                            you never miss an opportunity. The best jobs move fast, and we make sure you see them first.
                        </motion.p>
                    </motion.div>
                )}

            </motion.div>

            <motion.div variants={parent} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.7 }} whileHover={{scale:1.06}} className='border p-7 max-w-5xl w-full mb-7'>
                <motion.div variants={children} className='flex items-center justify-between mb-4'>
                    <h3>Can I filter by location ?</h3>
                    <button onClick={() => handleClick(2)}>
                        {open === 2 ? <ChevronUp /> : <ChevronDown />}
                    </button>
                </motion.div>

                {open === 2 && (
                    <motion.div variants={parent} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.7 }}>
                        <motion.p variants={children}>Yes. Filter by remote, on-site or specific cities. You can also combine location with the role type and
                            experience level. Our search understands what you want and shows only what matches.
                        </motion.p>
                    </motion.div>
                )}
            </motion.div>

            <motion.div variants={parent} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.7 }} whileHover={{scale:1.06}} className='border p-7 max-w-5xl w-full mb-7'>
                <motion.div variants={children} className='flex items-center justify-between mb-4'>
                    <h3>Is there a cost to use this ?</h3>
                    <button onClick={() => handleClick(3)}>
                        {open === 3 ? <ChevronUp /> : <ChevronDown />}
                    </button>
                </motion.div>

                {open === 3 && (
                    <motion.div variants={parent} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.7 }}>
                        <motion.p variants={children} >This is free for job seekers. Browse, search and apply without paying anything. We make
                            money from employers, not from you
                        </motion.p>
                    </motion.div>
                )}
            </motion.div>

            <motion.div variants={parent} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.7 }} whileHover={{scale:1.06}} className='border p-7 max-w-5xl w-full mb-7'>
                <motion.div variants={children} className='flex items-center justify-between mb-4'>
                    <h3>How do you curate jobs?</h3>
                    <button onClick={() => handleClick(4)}>
                        {open === 4 ? <ChevronUp /> : <ChevronDown />}
                    </button>
                </motion.div>

                {open === 4 && (
                    <motion.div variants={parent} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.7 }}>
                        <motion.p variants={children}>We review every position to ensure quality. No spam, no dead ends, no companies with bad
                            reputations. We show you positions from places worth your time.
                        </motion.p>
                    </motion.div>
                )}

            </motion.div>

            <motion.div variants={parent} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.7 }} whileHover={{scale:1.06}} className='border p-7 max-w-5xl w-full mb-7'>
                <motion.div variants={children} className='flex items-center justify-between mb-4'>
                    <h3>Can I set job alerts ?</h3>
                    <button onClick={() => handleClick(5)}>
                        {open === 5 ? <ChevronUp /> : <ChevronDown />}
                    </button>
                </motion.div>

                {open === 5 && (
                    <motion.div variants={parent} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.7 }}>
                        <motion.p variants={children}>Not yet, but it is coming soon. For now, check back daily or use our search to find roles matching your
                            criteria. New listings arrive consistently.
                        </motion.p>
                    </motion.div>
                )}
            </motion.div>

            <motion.div variants={parent} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.7 }} className='mt-10 space-y-3 text-center'>
                <motion.h1 variants={children} className='text-3xl font-semibold'>Need more Help?</motion.h1>
                <motion.p variants={children} className='text-xl font-semibold'>Reach out to us directly with your questions.</motion.p>
                <motion.div variants={children} whileHover={{ scale:1.08 }} whileTap={{ scale: 0.8 }}  transition={{type:spring, stiffness: 120, damping: 7 }} className='mt-7'>
                    <button  className='cursor-pointer bg-linear-to-br  from-emerald-400  to-sky-400 p-4 text-black rounded-md'>Contact</button>
                </motion.div>
            </motion.div>
        </motion.section>
    )
}

export default Faq