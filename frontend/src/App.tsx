import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import SignUp from './pages/SignUp'

import { Routes, Route } from "react-router-dom"


const App = () => {
  return (
    <div className="relative min-h-screen flex flex-col bg-[url('https://images.unsplash.com/photo-1786415886005-bc08f359b7b8?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center bg-no-repeat bg-fixed text-black">
      <div className='pointer-events-none absolute inset-0 z-0 bg-black/20'>
        <div className='relative z-10 flex flex-1 flex-col'>
          <Navbar />
          <main className='flex-1'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/" element={<SignUp />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
