import React from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { motion } from 'framer-motion';
import { textVariant } from '../motion';
import SectionWrapper from "../components/SectionWrapper";
import { experiences } from "../Info";


const ExperienceCard = ({ experience}) => (
  <VerticalTimelineElement 
    contentStyle={{background:'#2c2c59', color:'#ffffff'}}
    contentArrowStyle={{ borderRight: '7px solid #232631'}}
    date={experience.date}
  >
    <div>
      <h3 className="font-semibold">{experience.title}</h3>
      <p className="opacity-70">{experience.company_name}</p>
    </div>

    <ul className='mt list-disc ml-5 space-y-2'>
      {experience.points.map((point, index) => (
        <li
          key={`experience-point-${index}`}
          className='text-white-100 text-[14px] pl-1 tracking-wider'>
            {point}
        </li>
      ))}
    </ul>

  </VerticalTimelineElement>
)


const Experiences = () => {
  return (
    <section id="experiences" className="min-h-screen px-6 py-16">
      <motion.div variants={textVariant()}>
        <p className="p-lead flex justify-center">
          Introduction
        </p>

        <h2 className="flex justify-center">
          Experiences
        </h2>

        <div className='mt-20 flex flex-col'>
          <VerticalTimeline>
            {experiences.map((experience, index) => (
              <ExperienceCard key={`experience-${index}`}
              experience={experience}
              />
            ))}
          </VerticalTimeline>
        </div>
      </motion.div>
    </section>
  )
}

export default SectionWrapper(Experiences, "experiences")