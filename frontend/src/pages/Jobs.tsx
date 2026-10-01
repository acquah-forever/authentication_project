import { useState, useMemo, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Search, X, ChevronDown, ChevronUp, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAuthenticatedUser } from "../authContext/useAuth"
import { useJobs, useJob } from "../authContext/useAuth1"
import { useCreateApplication } from "../authContext/useAuth3"
import { ClipLoader } from "react-spinners";

interface QueryValue {
  text: string
}

type SkillLevel = "" | "beginner" | "intermediate" | "advanced" | "expert"

interface ApplicationForm {

  name: string,
  email: string,
  phone: string,
  location: string,
  linkedin: string,
  github: string,
  portfolio: string,
  resume: string,
  experience: string,
  strongest: string,
  projectLink: string,
  llm: string,
  frontend: SkillLevel,
  backend: SkillLevel,
  databases: SkillLevel,
  aiCodingTools: SkillLevel,
  systems: string,
  interest: string,
  aiTools: string,
  confirm1: boolean,
  confirm2: boolean,


}
const resetAll: ApplicationForm = {

  name: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  github: "",
  portfolio: "",
  resume: "",
  experience: "",
  strongest: "",
  projectLink: "",
  llm: "",
  frontend: "",
  backend: "",
  databases: "",
  aiCodingTools: "",
  systems: "",
  interest: "",
  aiTools: "",
  confirm1: false,
  confirm2: false
}

const Jobs = () => {

  const { data: jobs, isLoading, isError, error } = useJobs()
  const [selectedJob, setSelectedJob] = useState<string | null>(null)
  const { data: user } = useAuthenticatedUser();
  const { data: job, isLoading: isJobLoading } = useJob(selectedJob)
  const { mutate: createApplication } = useCreateApplication()
  const { register, watch, reset } = useForm<QueryValue>()
  const { register: registerApply, handleSubmit: handleApplySubmit, formState: { errors: applyErrors }, reset: resetApply } = useForm<ApplicationForm>()
  const query = watch("text", "")
  const [open, setOpen] = useState<number | null>(null)
  const [page, setPage] = useState<number>(1)
  const [employmentType, setEmploymentType] = useState<string>("")
  const [experienceLevel, setExperienceLevel] = useState<string>("")
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
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


  useEffect(() => {
    if (jobs && jobs.length > 0 && window.innerWidth >= 640) {
      setSelectedJob(jobs[0]._id)
    }
  }, [jobs])

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

  function handleBack() {
    setSelectedJob(null)
  }

  function handleSelect(jobId: string) {
    setSelectedJob(jobId)

  }

  function handleClose() {
    setOpen(null)
    resetApply(resetAll)
  }

  function handleApply() {
    if (!user) {
      navigate("/login")
    }

    setOpen(3)
  }

  function onSubmit(data: ApplicationForm) {

    if (!selectedJob) {
      alert("Please select a job before applying")
      return
    }

    createApplication(
      { ...data, job: selectedJob },
      {
        onSuccess: () => {
          setShowSuccess(true)
        },
        onError: () => {
          alert("Application submission failed")
        }
      }
    )
  }

  if (isLoading) {
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
      <section className="flex flex-col px-5 py-4 sm:px-10 sm:py-5 lg:px-15" id="/jobs">
        <form className="flex items-center gap-2 border border-white max-w-xl w-full px-4 py-1 rounded-2xl"  >
          <Search size={20} />
          <input className="w-full outline-none" type="text" placeholder="Describe the job you want..." {...register("text")} />
          <button className="cursor-pointer" type="button" aria-label="Delete Text" onClick={() => reset({ text: "" })}>
            <X size={17} />
          </button>
        </form >

        <div className="flex flex-col justify-center sm:justify-start gap-3 mt-3 items-center">
          <div className="flex justify-start gap-3 items-center w-full">
            <button className="cursor-pointer flex items-center gap-3 border rounded-sm px-4 py-1 hover:bg-slate-500/50" onClick={() => handleClick(1)}>
              <h1 className="font-semibold text-xs sm:text-sm md:text-md">Employment Type</h1>
              {open === 1 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            <div>
              {open === 1 &&
                <div className='max-w-sm w-full absolute left-0 sm:left-12 top-41 p-5 bg-white/90 text-black text-sm font-semibold rounded max-h-75 overflow-auto z-10 space-y-3'>
                  <label className="flex items-center gap-1">
                    <input type="radio" name='employment' value="Part-time"
                      checked={employmentType === "Part-time"} onChange={handleEmploymentType} />
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
                    <button type="button" className="cursor-pointer" onClick={() => { setEmploymentType("") }}>Reset</button>
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
                    <button type="button" className="cursor-pointer" onClick={() => { setExperienceLevel(""); setOpen(null); }}>Reset</button>
                    <button type="button" className='cursor-pointer border-2 text-white border-black bg-linear-to-br from-sky-300 to-sky-700 text-md px-4 py-2 rounded-full' onClick={() => setOpen(null)}>Show Results</button>
                  </div>
                </div>
              }
            </div>

          </div>
          <button aria-label="Back to job list" className={`${selectedJob ? "flex" : "hidden"} py-2 px-3 rounded-md mt-3 items-center sm:hidden gap-2 cursor-pointer border`} onClick={handleBack} >
            <ArrowLeft />
          </button>
          <div className="max-w-8xl w-full mt-3 sm:border-2 rounded-lg flex">
            <div className={`${selectedJob ? "hidden sm:flex" : "flex"} flex-col items-center sm:items-start p-2 sm:p-3 md:p-4 lg:p-5 max-w-md w-full min-h-170`}>
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

              <div className=' space-x-2 mt-4 '>
                <button type='button' className='bg-slate-700 px-5 py-3 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 disabled:opacity-50 text-sm sm:text-md'
                  disabled={page === 1}
                  onClick={handlePrevious} >Previous Page</button>

                <button type='button' className='bg-slate-700 px-5 py-3 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 disabled:opacity-50 text-sm sm:text-md'
                  disabled={page === totalPages}
                  onClick={handleNext} >Next Page</button>
              </div>
            </div>

            {selectedJob &&
              <div>
                {isJobLoading && <div className="m-30 sm:m-40 md:m-50 lg:m-90 flex justify-center items-center"><ClipLoader size={50} color="#123abc" /></div>}
                <div className="bg-white/60 rounded-lg p-2 sm:p-3 md:p-4 lg:p-5 text-black min-h-210 mt-4 mb-4">
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
                  <button className="mb-4 border cursor-pointer rounded-full px-4 py-1 bg-sky-600 text-white" onClick={handleApply}>Apply</button>
                  <h1 className="font-semibold underline">Requirements</h1>
                  <p className="text-sm">{job?.requirements}</p>
                  <h1 className="font-semibold mt-4 underline">About This Job</h1>
                  <p className="text-sm">{job?.jobDescription}</p>
                </div>

              </div>
            }

            {open === 3 &&
              <div className="fixed inset-0 z-50 flex border items-start justify-center overflow-y-scroll bg-black/50 p-4 text-black sm:items-center sm:p-8 px-10">
                <form className="p-4 my-auto w-full max-w-4xl min-h-screen rounded-lg bg-white" onSubmit={handleApplySubmit(onSubmit)}>
                  <div className="flex justify-between mb-2">
                    <h1 className="text-lg sm:text-2xl md:text-3xl">Apply for {job?.jobTitle}</h1>
                    <button type="button" aria-label="Close job application" onClick={handleClose}>
                      <X className="cursor-pointer" size={22} />
                    </button>
                  </div>
                  <h2 className="text-gray-500 text-xs sm:text-sm border-b border-b-gray-400">This application is for the {job?.jobTitle} role in {job?.jobLocation}. Please complete every required field.</h2>
                  <div className="flex items-center gap-2 mt-4">
                    <p className="rounded-full bg-gray-300 w-5 h-5 text-center text-sm">1</p>
                    <p className="font-semibold text-sm sm:text-lg">Basic Infromation</p>
                  </div>
                  <div className="grid grid-coils-1 sm:grid-cols-2 gap-4 px-4 mt-2">
                    <div className="flex flex-col space-y-1">
                      <label htmlFor="fullName" className="text-gray-500 text-xs sm:text-sm">Full Name</label>
                      <input className="border border-gray-400  px-2 py-2 rounded-lg" type="text"{...registerApply("name", { required: "Enter your full name" })} />
                      {applyErrors.name && <p className="text-red-500 text-xs">{applyErrors.name.message}</p>}
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label htmlFor="email" className="text-gray-500 text-xs sm:text-sm">Email</label>
                      <input className="border border-gray-400 px-2 py-2 rounded-lg" type="email" {...registerApply("email", { required: "Email is required" })} />
                      {applyErrors.email && <p className="text-red-500 text-xs">{applyErrors.email.message}</p>}
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label htmlFor="phoneNumber" className="text-gray-500 text-xs sm:text-sm">Phone or WhatsApp Number</label>
                      <input className="border border-gray-400 px-2 py-2 rounded-lg" type="text" {...registerApply("phone", { required: "A phone or whatsapp number is required" })} />
                      {applyErrors.phone && <p className="text-red-500 text-xs">{applyErrors.phone.message}</p>}
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label htmlFor="location" className="text-gray-500 text-xs sm:text-sm">Current Location</label>
                      <input className="border border-gray-400 px-2 py-2 rounded-lg" type="text" {...registerApply("location", { required: "Please enter your current location" })} />
                      <p className="text-xs text-gray-500">City and country</p>
                      {applyErrors.location && <p className="text-red-500 text-xs">{applyErrors.location.message}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-10 sm:mt-5">
                    <p className="rounded-full bg-gray-300 w-5 h-5 text-center text-sm">2</p>
                    <p className="font-semibold text-sm sm:text-lg">Professional Links</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 mt-4">
                    <div className="flex flex-col space-y-1">
                      <label htmlFor="linkedin" className="text-xs sm:text-sm text-gray-500">LinkedIn URL</label>
                      <input className="border border-gray-400 not-first:px-2 px-2 py-2 rounded-lg placeholder:text-xs sm:text-sm" type="text" placeholder="https://linkedin.com/in/..." {...registerApply("linkedin", { required: "A linkedin URL is required" })} />
                      {applyErrors.linkedin && <p className="text-red-500 text-xs">{applyErrors.linkedin.message}</p>}
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label htmlFor="github" className="text-xs sm:text-sm text-gray-500">GitHub URL</label>
                      <input className="border border-gray-400 not-first:px-2 px-2 py-2 rounded-lg placeholder:text-xs sm:text-sm" type="text" placeholder="https://github.com/..." {...registerApply("github", { required: "A GitHub URL is required for this role" })} />
                      {applyErrors.github && <p className="text-red-500 text-xs">{applyErrors.github.message}</p>}
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label htmlFor="portfolio" className="text-xs sm:text-sm text-gray-500">Portfolio or Personal Website(optional)</label>
                      <input className="border border-gray-400 not-first:px-2 px-2 py-2 rounded-lg placeholder:text-xs sm:text-sm"{...registerApply("portfolio")} type="text" placeholder="https://..." />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label htmlFor="resume" className="text-xs sm:text-sm text-gray-500">Resume or CV Link</label>
                      <input className="border border-gray-400 not-first:px-2 px-2 py-2 rounded-lg placeholder:text-xs sm:text-sm" type="text" placeholder="https://..." {...registerApply("resume", { required: "A resume or CV is required" })} />
                      <p className="text-xs text-gray-500">A link to Google Drive, Dropbox, LinkedIn, your website or a PDF</p>
                      {applyErrors.resume && <p className="text-red-500 text-xs">{applyErrors.resume.message}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-10 sm:mt-0">
                    <p className="rounded-full bg-gray-300 w-5 h-5 text-center text-sm">3</p>
                    <p className="font-semibold text-sm sm:text-lg">Role-Specific Background</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 mt-4">
                    <div className="flex flex-col space-y-1">
                      <label htmlFor="experience" className="text-xs sm:text-sm text-gray-500">Years of Experience</label>
                      <input className="border border-gray-400 not-first:px-2 px-2 py-2 rounded-lg placeholder:text-xs sm:text-sm" type="text" placeholder="e.g. 4 years" {...registerApply("experience", { required: "Please share your years of experience" })} />
                      {applyErrors.experience && <p className="text-red-500 text-xs">{applyErrors.experience.message}</p>}
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label htmlFor="linkedin" className="text-xs sm:text-sm text-gray-500">Strongest Programming Language</label>
                      <input className="border border-gray-400 not-first:px-2 px-2 py-2 rounded-lg placeholder:text-xs sm:text-sm" {...registerApply("strongest", { required: "Please indicate your strongest programming language" })} type="text" placeholder="e.g TypeScript,Python" />
                      {applyErrors.strongest && <p className="text-red-500 text-xs">{applyErrors.strongest.message}</p>}
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label htmlFor="linkedin" className="text-xs sm:text-sm text-gray-500">Best Project Link</label>
                      <input className="border border-gray-400 not-first:px-2 px-2 py-2 rounded-lg placeholder:text-xs sm:text-sm"{...registerApply("projectLink", { required: "Please show you best project link" })} type="text" placeholder="https://..." />
                      {applyErrors.projectLink && <p className="text-red-500 text-xs">{applyErrors.projectLink.message}</p>}
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label htmlFor="linkedin" className="text-xs sm:text-sm text-gray-500">AI Tools You Use</label>
                      <input className="border border-gray-400 not-first:px-2 px-2 py-2 rounded-lg placeholder:text-xs sm:text-sm" {...registerApply("llm", { required: "Please indicate your preferred AI tool/tools to use" })} type="text" placeholder="e.g Cursor, Claude Code, Codex " />
                      {applyErrors.llm && <p className="text-red-500 text-xs">{applyErrors.llm.message}</p>}
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label className="text-gray-500 text-xs sm:text-sm" htmlFor="comfort">Comfort with frontend</label>
                      <select className="border border-gray-400 rounded-lg px-2 py-3 text-sm text-gray-500"{...registerApply("frontend")} name="frontend" id="frontend">
                        <option className="text-gray-500 text-xs sm:text-sm" value="">Select a level </option>
                        <option className="text-gray-500" value="beginner">Beginner</option>
                        <option className="text-gray-500" value="intermediate">Intermediate</option>
                        <option className="text-gray-500" value="advanced">Advanced</option>
                        <option className="text-gray-500" value="expert">Expert</option>
                      </select>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <label className="text-gray-400 text-xs sm:text-sm" htmlFor="comfort">Comfort with backend</label>
                      <select className="border border-gray-400 rounded-lg px-2 py-3 text-sm text-gray-500"{...registerApply("backend")} name="backend" id="backend">
                        <option className="text-gray-500" value="">Select a level </option>
                        <option className="text-gray-500" value="beginner">Beginner</option>
                        <option className="text-gray-500" value="intermediate">Intermediate</option>
                        <option className="text-gray-500" value="advanced">Advanced</option>
                        <option className="text-gray-500" value="expert">Expert</option>
                      </select>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <label className="text-gray-400 text-xs sm:text-sm" htmlFor="comfort">Comfort with databases</label>
                      <select className="border border-gray-400 rounded-lg px-2 py-3 text-sm text-gray-500"{...registerApply("databases")} name="databases" id="databases">
                        <option className="text-gray-500" value="">Select a level </option>
                        <option className="text-gray-500" value="beginner">Beginner</option>
                        <option className="text-gray-500" value="intermediate">Intermediate</option>
                        <option className="text-gray-500" value="advanced">Advanced</option>
                        <option className="text-gray-500" value="expert">Expert</option>
                      </select>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <label className="text-gray-400 text-xs sm:text-sm" htmlFor="comfort">Comfort with AI coding tools</label>
                      <select className="border border-gray-400 rounded-lg px-2 py-3 text-sm text-gray-500"{...registerApply("aiCodingTools")} name="aiCodingTools" id="ai">
                        <option className="text-gray-500" value="">Select a level </option>
                        <option className="text-gray-500" value="beginner">Beginner</option>
                        <option className="text-gray-500" value="intermediate">Intermediate</option>
                        <option className="text-gray-500" value="advanced">Advanced</option>
                        <option className="text-gray-500" value="expert">Expert</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4 max-w-4xl w-full flex flex-col p-3">
                    <label className="text-gray-400 text-xs sm:text-sm mb-1" htmlFor="systems/products">Systems or products you have worked on</label>
                    <textarea name="systems/products" id="system/products" className="rounded-lg border border-gray-400 h-50 p-2"{...registerApply("systems", { required: "Please confirm systems and products you have worked on" })}></textarea>
                    {applyErrors.systems && <p className="text-red-500 text-xs mt-2">{applyErrors.systems.message}</p>}
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <p className="rounded-full bg-gray-300 w-5 h-5 text-center text-sm">4</p>
                    <p className="font-semibold text-sm sm:text-lg">Written Responses</p>
                  </div>
                  <div className="mt-2 max-w-4xl w-full flex flex-col p-3">
                    <label className="text-gray-400 text-xs sm:text-sm mb-1" htmlFor="interested">Why are you intrested in this job posting?</label>
                    <textarea name="interested" id="interested" className="rounded-lg border border-gray-400 h-40 p-2"{...registerApply("interest", { required: `Please tell us why you are interested in the ${job?.jobTitle} role.` })}></textarea>
                    {applyErrors.interest && <p className="text-red-500 text-xs mt-2">{applyErrors.interest.message}</p>}
                  </div>
                  <div className="mt-2 max-w-4xl w-full flex flex-col p-3">
                    <label className="text-gray-400 text-xs sm:text-sm mb-1" htmlFor="tools">How do you currently use AI tools?</label>
                    <textarea name="tools" id="tools" className="rounded-lg border border-gray-400 h-40 p-2"{...registerApply("aiTools", { required: "Please describe how you use AI Tools." })}></textarea>
                    {applyErrors.aiTools && <p className="text-red-500 text-xs mt-2">{applyErrors.aiTools.message}</p>}
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <p className="rounded-full bg-gray-300 w-5 h-5 text-center text-sm">5</p>
                    <p className="font-semibold text-sm sm:text-lg">Final Confirmation</p>
                  </div>

                  <div className="flex flex-col mt-2 px-3">
                    <div className="flex gap-2">
                      <input className="ra" type="checkbox" {...registerApply("confirm1", { required: "Please confirm you understand this role is location-based" })} />
                      <p className="text-gray-400 text-xs sm:text-sm">I understand that this is a location-based role.</p>
                    </div>
                    {applyErrors.confirm1 && <p className="text-red-500 text-xs mt-1">{applyErrors.confirm1.message}</p>}
                  </div>

                  <div className="flex flex-col mt-2 px-3">
                    <div className="flex gap-2">
                      <input className="ra" type="checkbox" {...registerApply("confirm2", { required: "Please confirm the information you provided is accurate" })} />
                      <p className="text-gray-400 text-xs sm:text-sm mb-1 mt-1">I confirm that the information I have provided is accurate</p>
                    </div>
                    {applyErrors.confirm2 && <p className="text-red-500 text-xs">{applyErrors.confirm2.message}</p>}
                  </div>
                  <div className="p-3 flex justify-center sm:justify-start">
                    <button className="mt-5 btn bg-[#1A77F2] text-white border-[#005fd8] px-25 sm:px-7" type="submit">Submit Application</button>
                  </div>
                </form>
                {showSuccess && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-lg p-8 shadow-lg text-center">
                      <h2 className="text-2xl font-bold">
                        Application Sent!
                      </h2>

                      <p className="mt-2 text-gray-600">
                        Your application has been submitted successfully.
                      </p>

                      <button onClick={() => navigate("/jobs")} className="cursor-pointer mt-6 rounded bg-blue-600 px-6 py-2 text-white">Continue</button>
                    </div>
                  </div>
                )}
              </div>



            }
          </div>
        </div>
      </section>
    </>
  )
}
export default Jobs
