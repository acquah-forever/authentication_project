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

    function handleClick(index: number) {
        setOpen((prev) => (prev === index ? null : index))
    }
    return (
        <motion.section id='faq' variants={parent} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} className='flex min-h-screen w-full flex-col items-center px-4 py-16 sm:px-6 sm:py-24'>
            <div className='mb-10 max-w-3xl space-y-3 text-center sm:mb-16 sm:space-y-4'>
                <motion.h1 variants={children} className='text-3xl font-bold sm:text-4xl'>FAQ</motion.h1>
                <motion.p variants={children} className='text-lg font-semibold sm:text-2xl'>Questions about how TechJob Finder works and what we offer.</motion.p>
            </div>

            <motion.div variants={parent} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} whileHover={{scale:1.02}} className='mb-5 w-full max-w-5xl border p-4 sm:mb-7 sm:p-7'>
                <motion.div variants={children} className='mb-4 flex items-center justify-between gap-4'>
                    <h3>How often are jobs posted ?</h3>
                    <button type="button" aria-expanded={open === 1} aria-label="Toggle answer: How often are jobs posted?" className="shrink-0" onClick={() => handleClick(1)}>
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

            <motion.div variants={parent} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} whileHover={{scale:1.02}} className='mb-5 w-full max-w-5xl border p-4 sm:mb-7 sm:p-7'>
                <motion.div variants={children} className='mb-4 flex items-center justify-between gap-4'>
                    <h3>Can I filter by location ?</h3>
                    <button type="button" aria-expanded={open === 2} aria-label="Toggle answer: Can I filter by location?" className="shrink-0" onClick={() => handleClick(2)}>
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

            <motion.div variants={parent} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} whileHover={{scale:1.02}} className='mb-5 w-full max-w-5xl border p-4 sm:mb-7 sm:p-7'>
                <motion.div variants={children} className='mb-4 flex items-center justify-between gap-4'>
                    <h3>Is there a cost to use this ?</h3>
                    <button type="button" aria-expanded={open === 3} aria-label="Toggle answer: Is there a cost to use this?" className="shrink-0" onClick={() => handleClick(3)}>
                        {open === 3 ? <ChevronUp /> : <ChevronDown />}
                    </button>
                </motion.div>

                {open === 3 && (
                    <motion.div variants={parent} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                        <motion.p variants={children} >This is free for job seekers. Browse, search and apply without paying anything. We make
                            money from employers, not from you
                        </motion.p>
                    </motion.div>
                )}
            </motion.div>

            <motion.div variants={parent} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} whileHover={{scale:1.02}} className='mb-5 w-full max-w-5xl border p-4 sm:mb-7 sm:p-7'>
                <motion.div variants={children} className='mb-4 flex items-center justify-between gap-4'>
                    <h3>How do you curate jobs?</h3>
                    <button type="button" aria-expanded={open === 4} aria-label="Toggle answer: How do you curate jobs?" className="shrink-0" onClick={() => handleClick(4)}>
                        {open === 4 ? <ChevronUp /> : <ChevronDown />}
                    </button>
                </motion.div>

                {open === 4 && (
                    <motion.div variants={parent} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                        <motion.p variants={children}>We review every position to ensure quality. No spam, no dead ends, no companies with bad
                            reputations. We show you positions from places worth your time.
                        </motion.p>
                    </motion.div>
                )}

            </motion.div>

            <motion.div variants={parent} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} whileHover={{scale:1.02}} className='mb-5 w-full max-w-5xl border p-4 sm:mb-7 sm:p-7'>
                <motion.div variants={children} className='mb-4 flex items-center justify-between gap-4'>
                    <h3>Can I set job alerts ?</h3>
                    <button type="button" aria-expanded={open === 5} aria-label="Toggle answer: Can I set job alerts?" className="shrink-0" onClick={() => handleClick(5)}>
                        {open === 5 ? <ChevronUp /> : <ChevronDown />}
                    </button>
                </motion.div>

                {open === 5 && (
                    <motion.div variants={parent} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                        <motion.p variants={children}>Not yet, but it is coming soon. For now, check back daily or use our search to find roles matching your
                            criteria. New listings arrive consistently.
                        </motion.p>
                    </motion.div>
                )}
            </motion.div>

            <motion.div variants={parent} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className='mt-8 space-y-3 pb-4 text-center sm:mt-10'>
                <motion.h1 variants={children} className='text-2xl font-semibold sm:text-3xl'>Need more Help?</motion.h1>
                <motion.p variants={children} className='text-lg font-semibold sm:text-xl'>Reach out to us directly with your questions.</motion.p>
                <motion.div variants={children} whileHover={{ scale:1.08 }} whileTap={{ scale: 0.8 }}  transition={{type:spring, stiffness: 120, damping: 7 }} className='mt-7'>
                    <button  className='cursor-pointer bg-linear-to-br  from-emerald-400  to-sky-400 p-4 text-black rounded-md'>Contact</button>
                </motion.div>
            </motion.div>
        </motion.section>
    )
}

export default Faq
