import React, { useRef } from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeIn, textVariant } from "../motion";
import SectionWrapper from "../components/SectionWrapper";
import { experiences } from "../Info";

const ExperienceCard = ({ experience }) => (
  <VerticalTimelineElement
    contentStyle={{ background: "#1F2542", color: "#ffffff", boxShadow: "0 2px #ECCFFF" }}
    contentArrowStyle={{ borderRight: "7px solid #232631" }}
    iconStyle={{ width: "20px", height: "20px", borderRadius: "999px", background: "#2c2c59",
    // 2 rings: first (white/gray) ring closer in, second (black) ring outside it
    boxShadow: "0 0 0 1px rgba(255,255,255,0.7), 0 0 0 12px #000", 
    display: "flex", alignItems: "center", justifyContent: "center", }}
    date={experience.date}
  >
    <div>
      <h3 className="font-semibold">{experience.title}</h3>
      <p className="opacity-70">{experience.company_name}</p>
    </div>

    <ul className="mt-4 list-disc ml-5 space-y-2">
      {experience.points.map((point, index) => (
        <li
          key={`experience-point-${index}`}
          className="text-white-100 text-[14px] pl-1 tracking-wider"
        >
          {point}
        </li>
      ))}
    </ul>
  </VerticalTimelineElement>
);

const Experiences = () => {
  const timelineRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.85", "end 0.2"],
  });

  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // This matches the library’s line position:
  // - left on small screens
  // - centered only when >= 1170px
  const linePos =
    "left-[18px] min-[1170px]:left-1/2 min-[1170px]:-translate-x-1/2";

  return (
    <section id="experiences" className="w-full px-6 py-16 bg-black">
      <motion.div variants={textVariant()}>
        <p className="p-lead flex justify-center">What I have worked on</p>
        <h2 className="flex justify-center">Experiences</h2>

            <motion.p variants={fadeIn("", "", 0.1, 1)} className="mt-3 text-white text-[17px] max-w-3xl leading-[30px] mx-auto">
              With hands-on experience in full-stack development , I have contributed to a variety of high-impact projects across 
              multiple industries. I’m passionate about creating beautiful, user-friendly frontends paired with solid, scalable 
              backends. I am always eager to learn and try out new experiences! -- placeholder
            </motion.p>

        <div ref={timelineRef} className="relative mt-20">
          {/* dim track */}
          <div
            className={`pointer-events-none absolute top-0 bottom-0 ${linePos} w-[2px] bg-white/10 z-0`}
          />

          {/* progress fill (sharp) */}
          <motion.div
            style={{ height: fillHeight }}
            className={`pointer-events-none absolute top-0 ${linePos} w-[2px] origin-top z-0
              bg-gradient-to-b from-blue-800 via-indigo-500 to-indigo-300`}
          />

          {/* progress glow (blur aura) */}
          <motion.div
            style={{ height: fillHeight }}
            className={`pointer-events-none absolute top-0 ${linePos} w-[10px] origin-top z-0
              blur-md opacity-35 bg-gradient-to-b from-blue-800 via-blue-500 to-indigo-400`}
          />

          <VerticalTimeline>
            {experiences.map((experience, index) => (
              <ExperienceCard key={`experience-${index}`} experience={experience} />
            ))}
          </VerticalTimeline>
        </div>
      </motion.div>
    </section>
  );
};

export default SectionWrapper(Experiences, "experiences");
