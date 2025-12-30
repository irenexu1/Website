import profile from '../assets/website.png';
import {motion} from 'framer-motion';
import { fadeIn, textVariant } from '../motion';
import SectionWrapper from "../components/SectionWrapper";


const About = () => {
  return (
    <section
      id="about" className="mx-16 max-w-[1100px] flex flex-col md:flex-row gap-8 md:gap-16">
      <div className="w-full md:w-1/2 flex justify-start">
        <motion.img 
          src={profile} 
          alt="Irene Xu" 
          className="w-full max-w-[450px] h-auto"
          variants={fadeIn("left", "tween", 0.2, 1)}
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center -mt-30">
        <motion.div variants={textVariant()}> 
          <p className="p-lead">
            Introduction
          </p>
          <h2>
            About me 
          </h2>
        </motion.div>

        <motion.p variants={fadeIn("", "", 0.1, 1)} className="mt-4">
          Hi! My name is Irene.

        </motion.p>
      </div>
    </section>
  );
}

export default SectionWrapper(About, "about")