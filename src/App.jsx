import { Home, About, Experiences, Skills, Projects, Contact } from './pages';
import Navbar from './components/Navbar';


const App = () => {
  return (
    <main className="bg-slate-950">
      <Navbar />
          <section id ="home">
            <Home />
          </section>

          <section id ="about">
            <About />
          </section>

          <section id ="experiences" className="bg-black">
            <Experiences/>
          </section>

          <section id ="projects">
            <Projects/>
          </section>

          <section id ="skills">
            <Skills />
          </section>

          <section id ="contact">
            <Contact />
          </section>

    </main>
  );
}


export default App
