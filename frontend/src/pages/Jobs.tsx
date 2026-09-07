import { useState, useMemo, useEffect } from "react"
import { Search, X, ChevronDown, ChevronUp, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useJobs, useJob } from "../authContext/useAuth1"
import { ClipLoader } from "react-spinners";

interface QueryValue {
  text: string
}

const Jobs = () => {
  const { data: jobs, isLoading, isError, error } = useJobs()
  const [selectedJob, setSelectedJob] = useState<string | null>(null)
  const { data: job, isLoading: isJobLoading } = useJob(selectedJob)
  const { register, watch, reset } = useForm<QueryValue>()
  const query = watch("text", "")
  const [open, setOpen] = useState<number | null>(null)
  const [page, setPage] = useState<number>(1)
  const [employmentType, setEmploymentType] = useState<string>("")
  const [experienceLevel, setExperienceLevel] = useState<string>("")
  const navigate = useNavigate()
  const jobsPerPage = 5



  function handleClick(index: number) {
    setOpen((prev) => prev === index ? null : index)
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

<<<<<<< HEAD
  useEffect(() => {
  if (jobs && jobs.length > 0 && !selectedJob) {
    setSelectedJob(jobs[0]._id)
  }
}, [jobs, selectedJob])

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage)
=======
  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / jobsPerPage))
>>>>>>> cb8f32483df2a452f560f7dadb7a434ecef8066f
  const startIndex = (page - 1) * jobsPerPage
  const endIndex = startIndex + jobsPerPage
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex)

  function handleEmploymentType(e: React.ChangeEvent<HTMLInputElement>) {
    setEmploymentType(e.target.value)
  }

  function handleExperienceLevel(e: React.ChangeEvent<HTMLInputElement>) {
    setExperienceLevel(e.target.value)
  }

  function handleSelect(jobId: string) {
    setSelectedJob(jobId)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader size={70} color="#123abc" />
      </div>
    )
  }

  if (isJobLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader size={70} color="#123abc" />
      </div>
    )

  }

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-2xl">404</h1>
        <p className="text-2xl">{error.message}</p>
        <button className="cursor-pointer mt-4 bg-blue-500 text-white py-2 px-4 rounded" onClick={handleHome}>Back Home</button>
      </div>
    )
  }

  return (
    <>
      <div className="px-5 py-4 sm:px-10 sm:py-5 lg:px-15" id="/jobs">
        <form className="flex items-center gap-2 border border-white max-w-xl w-full px-4 py-1 rounded-2xl"  >
          <Search size={20} />
          <input className="w-full outline-none" type="text" placeholder="Describe the job you want..." {...register("text")} />
          <button className="cursor-pointer" type="button" onClick={() => reset({ text: "" })}>
            <X size={17} />
          </button>
        </form>


        <div className="flex justify-center sm:justify-start gap-3 mt-3 items-center">
          <button className="cursor-pointer flex items-center gap-3 border rounded-sm px-4 py-1 hover:bg-slate-500/50" onClick={() => handleClick(1)}>
            <h1 className="font-semibold text-xs sm:text-sm md:text-md lg:text-lg">Employment Type</h1>
            {open === 1 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          <div>
            {open === 1 &&
              <div className='max-w-sm w-full absolute left-0 sm:left-12 top-41 p-5 bg-white/90 text-black text-sm font-semibold rounded max-h-75 overflow-auto z-10 space-y-3'>
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
                  <button
                    type="button"
                    onClick={() => {
                      setEmploymentType("")
                      setOpen(null)
                    }}
                  >
                    Reset
                  </button>
                  <button type="button" className='cursor-pointer border-2 text-white border-black bg-linear-to-br from-sky-300 to-sky-700 text-md px-4 py-2 rounded-full' onClick={() => setOpen(null)}>Show Results</button>
                </div>
              </div>
            }
          </div>


          <button className="cursor-pointer flex items-center gap-3 border rounded-sm px-3 py-1 hover:bg-slate-500/50" onClick={() => handleClick(2)}>
            <h1 className="font-semibold text-xs sm:text-sm md:text-md">Experience Level</h1>
            {open === 2 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          <div>
            {open === 2 &&
              <div className='max-w-sm w-full absolute left-0 sm:left-12 top-39 p-5 mt-2 bg-white/90 text-black text-sm font-semibold rounded max-h-75 overflow-auto z-10 space-y-3'>
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
                  <button
                    type="button"
                    onClick={() => {
                      setExperienceLevel("")
                      setOpen(null)
                    }}
                  >
                    Reset
                  </button>
                  <button type="button" className='cursor-pointer border-2 text-white border-black bg-linear-to-br from-sky-300 to-sky-700 text-md px-4 py-2 rounded-full' onClick={() => setOpen(null)}>Show Results</button>
                </div>
              </div>
            }
          </div>
        </div>

        <div className="max-w-8xl w-full mt-3 sm:border-2 rounded-lg flex">
          <div className='flex flex-col items-center sm:items-start p-2 sm:p-3 md:p-4 lg:p-5 max-w-md w-full min-h-170'>

            {/* <div className="flex items-center sm:hidden gap-2 cursor-pointer mb-2" >
              <ArrowLeft />
            </div> */}
            {paginatedJobs?.length === 0 ?
              (<p>Jobs not found</p>)
              :
              (
                paginatedJobs?.map((item) => (
                  <button key={item._id} className="cursor-pointer text-start bg-white/75  p-3 rounded-lg mb-4 hover:scale-105 duration-180 w-75 sm:w-70 md:w-80 lg-100" type="button" onClick={() => handleSelect(item._id)}>
                    <h1 className="text-lg sm:text-xl text-sky-800">{item.jobTitle}</h1>
                    <p className="text-sm text-black">{item.company}</p>
                    <p className="text-sm text-black">{item.jobLocation}</p>
                  </button>
                ))
              )}

            <div className='flex justify-center space-x-3 mt-4'>
              <button type='button' className='bg-slate-700 px-5 py-3 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 disabled:opacity-50 text-sm sm:text-md md:text-lg'
                disabled={page === 1}
                onClick={handlePrevious} >Previous Page</button>

              <button type='button' className='bg-slate-700 px-5 py-2 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 disabled:opacity-50 text-sm sm:text-md md:text-lg'
                disabled={page === totalPages}
                onClick={handleNext} >Next Page</button>
            </div>
          </div>

          {selectedJob && (
            <div className="max-w-7xl hidden sm:flex p-2 sm:p-3 md:p-4 lg:p-5 w-full">
              <div className="bg-white/60 rounded-lg p-2 sm:p-3 md:p-4 lg:p-5 text-black min-h-210">
                <div className='mb-5'>
                  <img className='w-full h-77 rounded-2xl object-cover object-center' src={"https://cdn.pixabay.com/photo/2024/09/18/16/40/business-9056542_1280.jpg"} alt="image" />
                </div>
                <h1 className="text-2xl font-semibold mb-3">
                  {job?.jobTitle}
                </h1>
                <p>{job?.company}</p>
                <p>{job?.jobLocation}</p>

                <div className="flex space-x-2 items-center mt-2 mb-2">
                  <span className="border px-4 py-1 rounded-full font-semibold text-sm">{job?.employmentType}</span>
                  <span className="border px-4 py-1 rounded-full font-semibold text-sm">{job?.experienceLevel}</span>
                </div>

                <button className="mb-4 border rounded-full px-4 py-1 bg-sky-600 text-white">Apply</button>

                <h1 className="font-semibold underline">Requirements</h1>
                <p className="text-sm">{job?.requirements}</p>

                <h1 className="font-semibold mt-4 underline">About This Job</h1>
                <p className="text-sm">{job?.jobDescription}</p>
              </div>
            </div>
          )}
        </div>
      </div>

    </>
  )
}

export default Jobs
