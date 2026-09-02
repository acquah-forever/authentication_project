import { Search, X, ChevronDown, ChevronUp } from "lucide-react"
import { useState, useMemo } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useJobs } from "../authContext/useAuth1"
import { ClipLoader } from "react-spinners";


interface Query {
  text: string
}

const Jobs = () => {
  const { data: jobs, isLoading, isError, error } = useJobs()
  const { register, formState: { errors } } = useForm<Query>()
  const [open, setOpen] = useState<number | null>(null)
  const [query, setQuery] = useState<string>('')
  const navigate = useNavigate()
  const jobsPerPage = 5



  function handleClick(index: number) {
    setOpen((prev) => (prev === index ? null : index))
  }

  function handleHome() {
    navigate('/')
  }


  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <ClipLoader color="#36d7b7" size={100} />
      </div>
    )
  }

  if (isError) {
    return (
      <div className='flex flex-col justify-center items-center min-h-screen'>
        <p className='text-red-500 font-semibold'>
          {error.message}
        </p>
        <button className='cursor-pointer mt-4 bg-blue-500 text-white py-2 px-4 rounded' onClick={handleHome}>Back Home</button>
      </div>
    )
  }

  const filteredJobs = useMemo(() => {

    if (!query) return jobs
    if (query.trim() === "") return jobs

    return jobs?.filter((job) =>
      job.jobTitle.toLowerCase().includes(query.toLowerCase()) ||
      job.company.toLowerCase().includes(query.toLowerCase()) ||
      job.location.toLowerCase().includes(query.toLowerCase()) ||
      job.employmentType.toLowerCase().includes(query.toLowerCase()) ||
      job.experienceLevel.toLowerCase().includes(query.toLowerCase())
    )
  }, [jobs, query])


  return (
    <div className="px-5 py-4 sm:px-10 sm:py-5 lg:px-15" id="/jobs">
      <form className="flex items-center gap-2 border border-slate-400 max-w-xl w-full px-4 py-2 rounded-2xl"  >
        <Search size={20} />
        <input className="w-full outline-none" type="text" placeholder="Describe the job you want..." {...register("text", { required: "Enter job search" })} />
        <X size={17} />
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
      <div className='mt-20 border w-full border-white/50 max-w-lg h-140'>
        <div className='mt-5'>
          <h2 className='text-lg font-semibold'>Job Listings</h2>
          {jobs?.length === 0 ?
            (<p>Jobs not found</p>)
            :
            (
              jobs?.map((item) => (
                <NavLink className="flex flex-col" key={item.id} to={`/jobs/${item.id}`}>
                  {item.jobTitle}
                  {item.company}
                  {item.location}
                  {item.employmentType}
                  {item.experienceLevel}
                </NavLink>
              ))
            )}

        </div>
      </div>


    </div>
  )
}

export default Jobs
