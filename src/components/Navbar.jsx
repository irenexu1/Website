import { NavLink } from "react-router-dom"

const Navbar = () => {
  return (
    <header className="header">
      <a
        href="#home"
        className="w-20 h-10 rounded-lg bg-slate-950 items-center justify-center flex font-bold shadow-md"
      >
        <p className="text-white">Irene Xu</p>
      </a>

      <nav className="flex text-lg gap-7 font-medium">
        <a href="#about" className="text-white hover:text-violet-300">
          About
        </a>
        <a href="#experiences" className="text-white hover:text-violet-300">
          Experiences
        </a>
        <a href="#skills" className="text-white hover:text-violet-300">
          Skills
        </a>
        <a href="#projects" className="text-white hover:text-violet-300">
          Projects
        </a>
        <a href="#contact" className="text-white hover:text-violet-300">
          Contact
        </a>
      </nav>
    </header>
  );
};


export default Navbar