import profile from '../assets/website.png';
import {motion} from 'framer-motion';
import { fadeIn, textVariant } from '../motion';


const About = () => {
  return (
    <section
      id="about" className="mx-16 max-w-[1100px] flex flex-col md:flex-row gap-8 md:gap-16">
      {/* Left half */}
      <div className="w-full md:w-1/2 flex justify-start">
        <img src={profile} alt="Irene Xu" className="w-full max-w-[450px] h-auto" />
      </div>

      {/* Right half */}
      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <h2 className="-mt-15">
           About me 
        </h2>
        <p className="mt-4">
          Hi! I'm Irene. 
        </p>
      </div>
    </section>
  );
}

export default About