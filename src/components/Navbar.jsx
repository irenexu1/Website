import { NavLink } from "react-router-dom"

const Navbar = () => {
  return (
    <header className="header">
      <a
        href="#home"
        className="w-10 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md"
      >
        <p className="blue-gradient_text">IX</p>
      </a>

      <nav className="flex text-lg gap-7 font-medium">
        <a href="#about" className="text-white hover:text-violet-300">
          About
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