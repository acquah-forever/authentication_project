import { useState } from "react"
import { useForm } from "react-hook-form"
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import { Pencil, X, OctagonMinus } from "lucide-react"
import { useProfile, useCreateProfile, useUpdateProfile } from "../authContext/useAuth2";

countries.registerLocale(en);

interface FormData {
  firstName: string;
  lastName: string;
  country: string;
  organization: string;
  education: string;
  industry: string;
  phoneNumber: string;
  website: string;
}


const Profile = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>()
  const [edit, setEdit] = useState<null | number>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const { data: profile, isLoading, isError } = useProfile()
  const { mutate: createProfile, isPending: isCreating } = useCreateProfile()
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile()
  const isSaving = isCreating || isUpdating


  const countryList = countries.getNames("en", {
    select: "official",
  });


  /** Toggle the requested profile section's edit dialog. */
  function handleEdit(index: number) {
    if (edit === index) {
      setEdit(null)
      return
    }
    reset()
    setSubmitError(null)
    setEdit(index)
  }

  function onSubmit(data: FormData) {
    setSubmitError(null)

    if (profile) {
      updateProfile(data, {
        onSuccess: () => {
          setEdit(null)
        },
        onError: () => {
          setSubmitError("We couldn't update your profile. Try again later")
        },
      })
    } else {
      createProfile(data, {
        onSuccess: () => {
          setEdit(null)
        },
        onError: () => {
          setSubmitError("We couldn't create your profile. Try again later")
        },
      })
    }
  }

  return (
    <div className="flex flex-col justify-center px-4 py-5 sm:px-8 lg:px-20" id="profile">
      <div className="mx-auto flex w-full max-w-7xl flex-col px-0 sm:px-5">
        <div className="relative flex flex-col">
          <img className='w-full h-60 rounded-2xl object-cover object-center' src={"https://cdn.pixabay.com/photo/2019/11/30/18/18/course-4663835_1280.jpg"} alt="background-image" />
          <div className="absolute top-40 left-5 rounded-full bg-gray-300 w-40 h-40"></div>
          <button type="button" aria-label="Pencil-Edit" onClick={() => handleEdit(1)} disabled={isLoading}>
            <Pencil className="cursor-pointer" size={25} />
          </button>
        </div>
        {
          edit === 1 &&
          <div className="fixed inset-0 z-50 flex min-h-screen items-start justify-center overflow-y-auto bg-black/50 p-4 text-black sm:items-center sm:p-8">
            <div className="my-auto w-full max-w-4xl rounded-lg border bg-white">
              <div className="flex justify-between items-center px-5 py-3 border-b border-b-gray-300">
                <h1 className="font-semibold text-xl">Edit Info</h1>
                <button type="button" aria-label="Close edit profile dialog" onClick={() => setEdit(null)}>
                  <X className="cursor-pointer text-black" />
                </button>
              </div>
              <form className="mx-0 max-h-[calc(100vh-4rem)] overflow-y-auto px-5 py-3 sm:mx-7" onSubmit={handleSubmit(onSubmit)}>
                <div className="mx-auto mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
                  <div className="flex flex-col">
                    <label className="text-sm" htmlFor="firstName">First name</label>
                    <input type="text" id="firstName" className="border border-gray-300 rounded-md py-1 w-60 sm:w-70 md:w-80 lg:w-90 placeholder:text-sm px-2 hover:border-2 hover:border-blue-500" {...register("firstName", { required: "Firstname is required" })} />

                    {errors.firstName && <span className="text-red-500 text-sm font-semibold flex gap-1 items-center">
                      <OctagonMinus size={15} />
                      {errors.firstName.message}
                    </span>
                    }
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm" htmlFor="lastName">Lastname</label>
                    <input type="text" id="lastName" className="border border-gray-300 rounded-md py-1 w-60 sm:w-70 md:w-80 lg:w-90 placeholder:text-sm px-2 hover:border-2 hover:border-blue-500"{...register("lastName", { required: "Lastname is required" })} />
                    {errors.lastName && <span className="text-red-500 text-sm font-semibold flex gap-1 items-center">
                      <OctagonMinus size={15} />
                      {errors.lastName.message}
                    </span>
                    }
                  </div>
                </div>
                <div className="relative flex flex-col mb-4">
                  <label className="text-sm" htmlFor="country">Country/Region</label>
                  <select id="country" className="w-full rounded-md border border-gray-300 p-2" {...register("country", { required: "Country is required" })}>
                    <option value="">Select a country</option>
                    {Object.entries(countryList).map(([code, name]) => (
                      <option className="text-sm" key={code} value={code}>{name}</option>
                    ))}
                  </select>
                  {errors.country && <span className="flex items-center gap-1 text-sm font-semibold text-red-500"><OctagonMinus size={15} />{errors.country.message}</span>}
                </div>
                <div className="flex flex-col mb-4">
                  <label className="text-sm" htmlFor="organization">Organization</label>
                  <input type="text" id="organization" className="border border-gray-300 rounded-md py-1 w-full px-2 hover:border-2 hover:border-blue-500"{...register("organization", { required: "Organization is required" })} />
                  {errors.organization && <span className="text-red-500 text-sm font-semibold flex gap-1 items-center">
                    <OctagonMinus size={15} />
                    {errors.organization.message}
                  </span>}
                </div>
                <div className="flex flex-col mb-4">
                  <label className="text-sm" htmlFor="education">Education</label>
                  <input type="text" id="education" className="border border-gray-300 rounded-md py-1 w-full px-2 hover:border-2 hover:border-blue-500"{...register("education", { required: "Education is required" })} />
                  {errors.education && <span className="text-red-500 text-sm font-semibold flex gap-1 items-center">
                    <OctagonMinus size={15} />
                    {errors.education.message}
                  </span>}
                </div>
                <div className="flex flex-col mb-4">
                  <label className="text-sm" htmlFor="industry">Industry</label>
                  <input type="text" id="industry" className="border border-gray-300 rounded-md py-1 w-full px-2 hover:border-2 hover:border-blue-500"{...register("industry", { required: "Industry is required" })} />
                  {errors.industry && <span className="text-red-500 text-sm font-semibold flex gap-1 items-center">
                    <OctagonMinus size={15} />
                    {errors.industry.message}
                  </span>}
                </div>
                <div className="flex flex-col mb-4">
                  <label className="text-sm" htmlFor="phone">Phone number</label>
                  <input type="tel" id="phone" className="border border-gray-300 rounded-md py-1 w-full px-2 hover:border-2 hover:border-blue-500" {...register("phoneNumber", { required: "Phone number is required", pattern: { value: /^[+()\d\s-]{7,}$/, message: "Enter a valid phone number" } })} />
                  {errors.phoneNumber && <span className="text-red-500 text-sm font-semibold flex gap-1 items-center">
                    <OctagonMinus size={15} />
                    {errors.phoneNumber.message}
                  </span>}
                </div>
                <div className="flex flex-col mb-4">
                  <label className="text-sm" htmlFor="website">Website URL</label>
                  <input type="url" id="website" className="border border-gray-300 rounded-md py-1 w-full px-2 hover:border-2 hover:border-blue-500" {...register("website", { required: "Website URL is required", pattern: { value: /^https?:\/\/.+/, message: "Enter a URL starting with http:// or https://" } })} />
                  {errors.website && <span className="text-red-500 text-sm font-semibold flex gap-1 items-center">
                    <OctagonMinus size={15} />
                    {errors.website.message}
                  </span>}
                </div>
                {submitError && <p className="mt-3 text-sm font-semibold text-red-500" role="alert">{submitError}</p>}
                <div className="mt-10 flex justify-end">
                  <button type="submit" disabled={isSaving} className="cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60">{isSaving ? "Saving…" : "Submit"}</button>
                </div>
              </form>
            </div>
          </div>
        }
        <div className="mt-15 rounded-lg p-5">
          <h2 className="text-lg font-semibold">Profile Information</h2>
          {isLoading && <p className="mt-3 text-white">Loading profile…</p>}
          {!isLoading && !isError && !profile && <p className="mt-3 text-gray-600">No profile information yet. Select the edit button to add it.</p>}
          {profile && <>
            <div className="mt-3 flex gap-1">
              <p className="font-semibold">Name:</p>
              <p>{profile.firstName} {profile.lastName}</p>
            </div>
            <div className="mt-3 flex flex-col gap-2">
              <p className="font-semibold">Country:</p>
              <p>{countryList[profile.country] ?? profile.country}</p>
              <p className="font-semibold">Organization:</p>
              <p>{profile.organization}</p>
              <p className="font-semibold">Education:</p>
              <p>{profile.education}</p>
              <p className="font-semibold">Industry:</p>
              <p>{profile.industry}</p>
            </div>
          </>}
        </div>

      </div>


    </div>
  )
}

export default Profile
