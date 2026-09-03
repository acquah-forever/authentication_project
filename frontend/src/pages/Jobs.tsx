import { Search, X, ChevronDown, ChevronUp } from "lucide-react"
import { useState, useMemo } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useJobs } from "../authContext/useAuth1"
import { ClipLoader } from "react-spinners";

interface QueryValue {
  text: string
}

const Jobs = () => {
  const { data: jobs, isLoading, isError, error } = useJobs()
  const { register, formState: { errors },watch,reset } = useForm<QueryValue>()
  const query = watch("text", "")
  const [open, setOpen] = useState<number | null>(null)
  const [page, setPage] = useState(1)
  const navigate = useNavigate()
  const jobsPerPage = 5



  function handleClick(index: number) {
    setOpen((prev) => (prev === index ? null : index))
  }

  function handleHome() {
    navigate('/')
  }


  const filteredJobs = useMemo(() => {
    if (!jobs) return []
    if (query.trim() === "") return jobs

    return jobs?.filter((job) =>
      job.jobTitle.toLowerCase().includes(query.toLowerCase()) ||
      job.company.toLowerCase().includes(query.toLowerCase()) ||
      job.location.toLowerCase().includes(query.toLowerCase()) ||
      job.employmentType.toLowerCase().includes(query.toLowerCase()) ||
      job.experienceLevel.toLowerCase().includes(query.toLowerCase())
    )
  }, [jobs, query])

  function handlePrevious() {
    setPage((prev) => Math.max(prev - 1, 1))
  }

  function handleNext() {
    setPage((prev) => Math.min(prev + 1, totalPages))
  }

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage)
  const startIndex = (page - 1) * jobsPerPage
  const endIndex = startIndex + jobsPerPage

  const paginatedJobs = filteredJobs.slice(startIndex, endIndex)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color="#123abc" loading={isLoading} />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>{error.message}</p>
        <button className="cursor-pointer mt-4 bg-blue-500 text-white py-2 px-4 rounded" onClick={handleHome}>Back Home</button>
      </div>
    )
  }

  return (
    <div className="px-5 py-4 sm:px-10 sm:py-5 lg:px-15" id="/jobs">
      <form className="flex items-center gap-2 border border-slate-400 max-w-xl w-full px-4 py-2 rounded-2xl"  >
        <Search size={20} />
        <input className="w-full outline-none" type="text" placeholder="Describe the job you want..." {...register("text")} />
        <button className="cursor-pointer" type="button" onClick={() => reset({text: ""})}>
        <X size={17} />
        </button>
      </form>
      {errors.text && <p>{errors.text.message}</p>}

      <div className="flex gap-3 mt-5 items-center">
        <button className="cursor-pointer flex items-center gap-2 border rounded-full px-3 py-2 hover:bg-slate-500/50" onClick={() => handleClick(1)}>
          <h1 className="font-semibold">Employment Type</h1>
          {open === 1 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        <div>
          {open === 1 &&
            <div className='max-w-sm w-full absolute left-16 top-53 p-5 mt-2 bg-white/90 text-black text-sm font-semibold rounded max-h-75 overflow-auto z-10 space-y-3'>
              <label className="flex items-center gap-1">
                <input type="radio" name='employment' value="part-time" />
                <p>Part-time</p>
              </label>
              <label className="flex -items-center gap-1">
                <input type="radio" name='employment' value="Full-time" />
                <p>Full-time</p>
              </label>
              <label className="flex items-center gap-1">
                <input type="radio" name='employment' value="Contract" />
                <p>Contract</p>
              </label>
              <label className="flex items-center gap-1">
                <input type="radio" name='employment' value="Volunteer" />
                <p>Volunteer</p>
              </label>
              <div className='border w-full border-slate-500/50'></div>
              <div className='flex  justify-end gap-3'>
                <button className='cursor-pointer bg-gray-300 text-md px-4 py-1 rounded-full' onClick={() => setOpen(null)} >Reset</button>
                <button className='cursor-pointer border-2 text-white border-black bg-linear-to-br from-sky-300 to-sky-700 text-md px-4 py-2 rounded-full'>Show Results</button>
              </div>
            </div>
          }
        </div>


        <button className="cursor-pointer flex items-center gap-2 border rounded-full px-3 py-2 hover:bg-slate-500/50" onClick={() => handleClick(2)}>
          <h1 className="font-semibold">Experience Level</h1>
          {open === 2 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        <div>
          {open === 2 &&
            <div className='max-w-sm w-full absolute left-16 top-53 p-5 mt-2 bg-white/90 text-black text-sm font-semibold rounded max-h-75 overflow-auto z-10 space-y-3'>
              <label className="flex items-center gap-1">
                <input type="radio" name='experience' value="entry-level" />
                <p>Entry-Level</p>
              </label>
              <label className="flex -items-center gap-1">
                <input type="radio" name='experience' value="junior" />
                <p>Junior</p>
              </label>
              <label className="flex items-center gap-1">
                <input type="radio" name='experience' value="senior" />
                <p>Senior</p>
              </label>
              <label className="flex items-center gap-1">
                <input type="radio" name='experience' value="manager" />
                <p>Manager</p>
              </label>
              <div className='border w-full border-slate-500/50'></div>
              <div className='flex  justify-end gap-3'>
                <button className='cursor-pointer bg-gray-300 text-md px-4 py-1 rounded-full' onClick={() => setOpen(null)} >Reset</button>
                <button className='cursor-pointer border-2 text-white border-black bg-linear-to-br from-sky-300 to-sky-700 text-md px-4 py-2 rounded-full'>Show Results</button>
              </div>
            </div>
          }
        </div>
      </div>

      <div className='mt-5 border border-slate-400/50 rounded-lg p-5 max-w-md w-full'>
        <h2 className='text-lg font-semibold'>Job Listings</h2>
        {paginatedJobs?.length === 0 ?
          (<p>Jobs not found</p>)
          :
          (
            paginatedJobs?.map((item) => (
              <NavLink to="/" key={item.id}>
                <h1>{item.jobTitle}</h1>
                {/* <h1>{item.company}</h1>
                <h1>{item.location}</h1> */}
              </NavLink>
            ))
          )}
        <div className='flex flex-row space-x-3 mt-4'>
          <button type='button' className='px-5 py-2 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105' onClick={handlePrevious} >Previous Page</button>
          <button type='button' className='px-5 py-2 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105' onClick={handleNext} >Next Page</button>
        </div>

      </div>



    </div>
  )
}

export default Jobs
