
const Hero = () => {
    return (
        <div className="flex flex-col justify-center items-center px-5 mt-40">
            <span className="border rounded-full px-4 py-2 text-sm bg-linear-to-br from-cyan-400 to-green-800">2000+ jobs available</span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-center mt-4 mb-4 font-semibold">Finding Your Dream <br /><span className="bg-linear-to-tr from-emerald-400 to-sky-400 text-transparent bg-clip-text">Software Engineering</span><br />Role Today</h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl text-center mb-5 mt-5">Search through the latest opportunities in software engineering. Get hired fast with positions updated daily</h2>
            <div className='flex gap-2'>
                <button className="bg-linear-to-br from-sky-300 to-sky-700 px-4 py-2 rounded border-2 border-white cursor-pointer">Search</button>
                <button className="bg-linear-to-br from-emerald-400 to-emerald-700 px-4 py-2 rounded border-2 border-slate-500 cursor-pointer">Browse</button>
            </div>
        </div>
    )
}

export default Hero
