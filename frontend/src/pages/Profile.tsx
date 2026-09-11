import { useState } from "react"
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import { Pencil, X } from "lucide-react"

countries.registerLocale(en);


const Profile = () => {
  const [edit, setEdit] = useState<null | number>(null)
  const [country, setCountry] = useState("");

    const countryList = countries.getNames("en", {
    select: "official",
  });


  function handleEdit(index: number) {
    setEdit((prev) => prev === index ? null : index)
  }



  return (
    <div className="flex flex-col justify-center px-20 py-5" id="/profile">
      <div className="mx-auto max-w-7xl w-full flex flex-col px-5 h-170">
        <div className="relative flex flex-col">
          <img className='w-full h-60 rounded-2xl object-cover object-center' src={"https://cdn.pixabay.com/photo/2019/11/30/18/18/course-4663835_1280.jpg"} alt="background-image" />
          <div className="absolute top-40 left-5 rounded-full bg-gray-300 w-40 h-40"></div>
          <button type="button" className="flex justify-end pr-5 mt-5" onClick={() => handleEdit(1)}>
            <Pencil aria-label="Pencil-Edit" className="cursor-pointer" size={25} />
          </button>
        </div>
        {
          edit === 1 &&
          <div className="text-black fixed inset-0 w-screen h-screen z-50 bg-black/50 flex justify-center px-20 py-20">
            <div className="bg-white max-w-4xl border w-full h-170 rounded-lg">
              <div className="flex justify-between items-center px-5 py-3 border-b border-b-gray-300">
                <h1 className="font-semibold text-xl">Edit Info</h1>
                <button>
                  <X className="text-black cursor-pointer" onClick={() => setEdit(null)} />
                </button>
              </div>
              <form className="px-5 py-3 mx-7">
                <div className="flex gap-5 justify-between items-center mx-auto mb-3">
                  <div className="flex flex-col">
                    <label className="text-sm" htmlFor="firstName">First name</label>
                    <input type="text" id="firstName" className="border border-gray-300 rounded-md py-1 w-60 sm:w-70 md:w-80 lg:w-90 placeholder:text-sm px-2 hover:border-2 hover:border-blue-500" />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm" htmlFor="lastName">Lastname</label>
                    <input type="text" id="lastName" className="border border-gray-300 rounded-md py-1 w-60 sm:w-70 md:w-80 lg:w-90 placeholder:text-sm px-2 hover:border-2 hover:border-blue-500" />
                  </div>
                </div>
                <div className="relative flex flex-col mb-4">
                  <label className="text-sm" htmlFor="country/region">Country/Region</label>
                  <select value={country} onChange={(e) => setCountry(e.target.value)} className="border border-gray-300 rounded-md p-2 w-full">
                    <option  >Select a country</option>
                    {Object.entries(countryList).map(([code, name]) => (
                      <option className="text-sm" key={code} value={code}>{name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col mb-4">
                  <label className="text-sm" htmlFor="organization">Organization</label>
                  <input type="text" id="organization" className="border border-gray-300 rounded-md py-1 w-full px-2 hover:border-2 hover:border-blue-500" />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="text-sm" htmlFor="education">Education</label>
                  <input type="text" id="education" className="border border-gray-300 rounded-md py-1 w-full px-2 hover:border-2 hover:border-blue-500" />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="text-sm" htmlFor="industry">Industry</label>
                  <input type="text" id="industry" className="border border-gray-300 rounded-md py-1 w-full px-2 hover:border-2 hover:border-blue-500" />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="text-sm" htmlFor="phone">Phone number</label>
                  <input type="text" id="phone" className="border border-gray-300 rounded-md py-1 w-full px-2 hover:border-2 hover:border-blue-500" />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="text-sm" htmlFor="website">Website URL</label>
                  <input type="text" id="website" className="border border-gray-300 rounded-md py-1 w-full px-2 hover:border-2 hover:border-blue-500" />
                </div>
                <div className="mt-10 flex justify-end">
                  <button type="submit" className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">Submit</button>
                </div>
              </form>
            </div>
          </div>
        }
      </div>


    </div>
  )
}

export default Profile
