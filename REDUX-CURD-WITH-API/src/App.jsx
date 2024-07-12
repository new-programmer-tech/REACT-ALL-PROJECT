import Navbar from "./components/navbar/Navbar"
import Form from "./components/Form/Form"
import Index from "./components/Index"

import { BrowserRouter, Route ,Routes } from "react-router-dom"
import UserDetails from "./components/Read/UserDetails"

function App() {

  return (
  <>
  <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path="/" element= {<Index/>}/>
    <Route path="/create" element= {<Form/>}/>
    <Route path="/read" element= {<UserDetails/>}/>
    </Routes>
  </BrowserRouter>
  </>
  )
}

export default App
