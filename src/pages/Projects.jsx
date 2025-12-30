import { motion } from 'framer-motion';
import SectionWrapper from "../components/SectionWrapper";
import { textVariant } from '../motion';


const Projects = () => {
  return (
    <section id="projects" className="min-h-screen px-6 py-16">
      <motion.div variants={textVariant()}> 
        <p className="p-lead">
          Featured work
        </p>
        <h2 className="flex justify-center">
          Projects
        </h2>
      </motion.div>

      <div className="mt-20 flex flex-col">
        {/* Project content will go here */}
        <p className="text-center text-white">Projects coming soon...</p>
      </div>
    </section>
  );
}

export default SectionWrapper(Projects, "projects")