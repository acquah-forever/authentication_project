import { useState, useMemo, useEffect } from "react"
import { Search, X, ChevronDown, ChevronUp } from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useJobs } from "../authContext/useAuth1"
import { ClipLoader } from "react-spinners";

interface QueryValue {
  text: string
}

const Jobs = () => {
  const { data: jobs, isLoading, isError, error } = useJobs()
  const { register, formState: { errors }, watch, reset } = useForm<QueryValue>()
  const query = watch("text", "")
  const [open, setOpen] = useState<number | null>(null)
  const [page, setPage] = useState<number>(1)
  const [employmentType, setEmploymentType] = useState<string>("")
  const [experienceLevel, setExperienceLevel] = useState<string>("")
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

    const searchTerm = query.trim().toLowerCase()

    return jobs.filter((job) => {
      const matchesSearch =
        searchTerm === "" ||
        job.jobTitle.toLowerCase().includes(searchTerm) ||
        job.company.toLowerCase().includes(searchTerm) ||
        job.jobLocation.toLowerCase().includes(searchTerm) ||
        job.employmentType.toLowerCase().includes(searchTerm) ||
        job.experienceLevel.toLowerCase().includes(searchTerm)

      const matchesEmployment =
        employmentType === "" ||
        job.employmentType.toLowerCase() === employmentType.toLowerCase()

      const matchesExperience =
        experienceLevel === "" ||
        job.experienceLevel.toLowerCase() === experienceLevel.toLowerCase()

      return (
        matchesSearch &&
        matchesEmployment &&
        matchesExperience
      )
    })
  }, [jobs, query, employmentType, experienceLevel])

  function handlePrevious() {
    setPage((prev) => Math.max(prev - 1, 1))
  }

  function handleNext() {
    setPage((prev) => Math.min(prev + 1, totalPages))
  }

  useEffect(() => {
    setPage(1)
  }, [query, employmentType, experienceLevel])

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / jobsPerPage))
  const startIndex = (page - 1) * jobsPerPage
  const endIndex = startIndex + jobsPerPage
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex)

  function handleEmploymentType(e: React.ChangeEvent<HTMLInputElement>) {
    setEmploymentType(e.target.value)
  }

  function handleExperienceLevel(e: React.ChangeEvent<HTMLInputElement>) {
    setExperienceLevel(e.target.value)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color="#123abc" />
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
      <form className="flex items-center gap-2 border border-slate-400 max-w-xl w-full px-4 py-2 rounded-2xl"
        onSubmit={(event) => event.preventDefault()}  >
        <Search size={20} />
        <input className="w-full outline-none" type="text" placeholder="Describe the job you want..." {...register("text")} />
        <button className="cursor-pointer" type="button" onClick={() => reset({ text: "" })}>
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
                <input type="radio" name='employment' value="part-time"
                  checked={employmentType === "part-time"} onChange={handleEmploymentType} />
                <p>Part-time</p>
              </label>
              <label className="flex -items-center gap-1">
                <input type="radio" name='employment' value="Full-time"
                  checked={employmentType === "Full-time"} onChange={handleEmploymentType} />
                <p>Full-time</p>
              </label>
              <label className="flex items-center gap-1">
                <input type="radio" name='employment' value="Contract"
                  checked={employmentType === "Contract"} onChange={handleEmploymentType} />
                <p>Contract</p>
              </label>
              <label className="flex items-center gap-1">
                <input type="radio" name='employment' value="Volunteer"
                  checked={employmentType === "Volunteer"} onChange={handleEmploymentType} />
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
                <input type="radio" name='experience' value="entry-level"
                  checked={experienceLevel === "entry-level"} onChange={handleExperienceLevel} />
                <p>Entry-Level</p>
              </label>
              <label className="flex -items-center gap-1">
                <input type="radio" name='experience' value="junior"
                  checked={experienceLevel === "junior"} onChange={handleExperienceLevel} />
                <p>Junior</p>
              </label>
              <label className="flex items-center gap-1">
                <input type="radio" name='experience' value="senior"
                  checked={experienceLevel === "senior"} onChange={handleExperienceLevel} />
                <p>Senior</p>
              </label>
              <label className="flex items-center gap-1">
                <input type="radio" name='experience' value="manager"
                  checked={experienceLevel === "manager"} onChange={handleExperienceLevel} />
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
        <h1 className='text-xl font-semibold text-center mb-4'>Job Listings</h1>
        {paginatedJobs?.length === 0 ?
          (<p>Jobs not found</p>)
          :
          (
            paginatedJobs?.map((item) => (
              <div className="bg-linear-to-br from-amber-300 to-teal-700 p-3 rounded-lg cursor-pointer mb-4 text-slate-800 border-2 border-white">
                <NavLink to="/" key={item.id}>
                  <h1 className="text-xl">{item.jobTitle}</h1>
                  <p className="text-sm">{item.company}</p>
                  <p className="text-sm">{item.jobLocation}</p>
                </NavLink>
              </div>
            ))
          )}

        <div className='flex flex-row space-x-3 mt-4'>
          <button type='button' className='px-5 py-2 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 disabled:opacity-50'
            disabled={page === 1}
            onClick={handlePrevious} >Previous Page</button>

          <button type='button' className='px-5 py-2 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 disabled:opacity-50'
            disabled={page === totalPages}
            onClick={handleNext} >Next Page</button>
        </div>

      </div>



    </div>
  )
}

export default Jobs
