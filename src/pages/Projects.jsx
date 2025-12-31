import { motion } from 'framer-motion';
import SectionWrapper from "../components/SectionWrapper";
import { projects } from "../Info";
import { fadeIn, textVariant } from '../motion';


const ProjectCard = ({ index, name, description, tags, source_code_link}) => {
  return (
    <motion.div 
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      className=" sm:w-[360px] w-full"
    >
      <div className="relative w-full overflow-hidden rounded-2xl p-[1px]">
        {/* the soft glow  rgba(200,120,255,0.90) 88%,  transparent 94.3% 100%*/}
        <span
          className="pointer-events-none absolute inset-[-200%] animate-[spin_5s_linear_infinite] blur-xl opacity-70"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0% 65%, rgba(77, 119, 214, 0) 55%, rgba(77, 119, 214,0.08) 60%, rgba(77, 119, 214,0.18) 68%, rgba(77, 119, 214, 0.38) 76%, rgba(141, 144, 240, 0.55) 84%, rgba(174, 141, 240, 0.78) 90%, rgba(255,186,252,0.90) 96%, rgba(255,186,252,1.00) 100%)"

      
          }}
        />
        {/* the sharp glow rgba(120,200,255,0.35) 78%, rgba(200,120,255,0.85) 90%, rgba(200,120,255,1.00) 94%, transparent 94.3% 100%)*/}
        <span
          className="pointer-events-none absolute inset-[-200%] animate-[spin_5s_linear_infinite] opacity-90"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0% 60%, rgba(77, 119, 214,0.00) 50%, rgba(77, 119, 214, 0.10) 66%, rgba(141, 144, 240, 0.28) 80%, rgba(174, 141, 240, 0.60) 88%, rgba(255,186,252, 0.91) 97%, rgba(255,186,252,1.00) 100%)"


          }}
        />

        <div className="relative w-full rounded-2xl bg-gray-950 p-5">
          <div className="relative w-full h-[230px]">
            <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
              <div
                onClick={() => window.open(source_code_link, "_blank")}
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
              />
            </div>
          </div>

          <div className="mt-5">
            <h3 className="text-white font-bold text-[24px]">{name}</h3>
            <p className="mt-2 text-secondary text-[14px]">{description}</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <p key={`${name}-${tag.name}`} className={`text-[14px] ${tag.color}`}>
                #{tag.name}
              </p>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};






const Projects = () => {
  return (
    <section id="projects" className="px-6 py-16">
      <motion.div variants={textVariant()}> 
        <p className="p-lead flex leading-[30px]">
          Featured work
        </p>
        <h2 className="flex mt-5 leading-[30px]">
          Projects
        </h2>
      </motion.div>

      <div className="w-full mt-4 flex flex-col">
        <motion.p variants={fadeIn("", "", 0.1, 1)} className="mt-3 text-white text-[17px] max-w-3xl leading-[30px]">
          Projects coming soon... 
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </section>
  );
}

export default SectionWrapper(Projects, "projects")