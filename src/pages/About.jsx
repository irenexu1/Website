import profile from '../assets/website.png';
import {motion} from 'framer-motion';
import { fadeIn, textVariant } from '../motion';
import SectionWrapper from "../components/SectionWrapper";


const About = () => {
  return (
    <section
      id="about" className="mx-16  flex flex-col md:flex-row gap-8 md:gap-16">
      <div className="w-full md:w-2/5 flex justify-end flex-shrink-0">
        <motion.img 
          src={profile} 
          alt="Irene Xu" 
          className="w-full max-w-[450px] min-w-[250px] h-auto object-contain"
          variants={fadeIn("left", "tween", 0.2, 1)}
        />
      </div>

      <div className="w-full md:w-3/5 flex flex-col justify-center">
        <motion.div variants={textVariant()}> 
          <p className="p-lead">
            Introduction
          </p>
          <h2>
            About me 
          </h2>
        </motion.div>

        <motion.p variants={fadeIn("", "", 0.1, 1)} >
          Hey! I’m Irene, a University of Waterloo student passionate about creating software thats beautiful, user-friendly, and 
          with efficent scalable backends; combining strong problem-solving with an eye for design to solve
          real-world problems.
        </motion.p>
        <motion.p variants={fadeIn("", "", 0.1, 1)} >
           In my spare time, I'm an artist, singer and mahjong player. I also love playing various sports like Volleyball and Badminton.
        </motion.p>
      </div>
    </section>
  );
}

export default SectionWrapper(About, "about")