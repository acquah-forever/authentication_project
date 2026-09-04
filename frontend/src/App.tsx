import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import SignUp from "./pages/SignUp"
import Login from "./pages/LogIn"
import Profile from "./pages/Profile"
import Jobs from "./pages/Jobs"
import JobDetails from "./pages/JobDetails"
import Footer from "./components/Footer"


import { Routes, Route } from "react-router-dom"


const App = () => {
  return (
    <div className="relative flex min-h-screen flex-col text-white bg-[url('https://images.unsplash.com/photo-1512429234305-12fe5b0b0f07?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center bg-no-repeat bg-scroll sm:bg-fixed">
      <div aria-hidden="true" className="absolute inset-0 z-0 bg-black/30" />
      <div className='relative z-10 flex flex-1 flex-col min-h-screen'>
        <Navbar />
        <main className='flex-1'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<SignUp />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/jobs" element={<Jobs />}/>
            <Route path="/jobs/:id" element={<JobDetails />}/>

          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
