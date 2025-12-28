import React from 'react'
import{ BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home, About, Skills, Projects, Contact } from './pages';
import Navbar from './components/Navbar';


const App = () => {
  return (
    <main className="bg-slate-950">
      <Navbar />
          <section id ="home" >
            <Home />
          </section>

          <section id ="about" >
            <About />
          </section>

          <section id ="skills" >
            <Skills />
          </section>

          <section id ="projects" >
            <Projects />
          </section>

          <section id ="contact" >
            <Contact />
          </section>

    </main>
  );
};


export default App
