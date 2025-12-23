import React from 'react'
import{ BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home, About, Projects, Contact } from './pages';
import Navbar from './components/Navbar';


const App = () => {
  return (
    <main className="bg-slate-300/20">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>  
      </Router> 
    </main>
  )
}


export default App
