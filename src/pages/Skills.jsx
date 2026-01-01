import Orb from "../models/Orb.jsx";
import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import SectionWrapper from "../components/SectionWrapper";
import Toggle from "../components/Toggle";
import { motion } from "framer-motion";
import { textVariant } from "../motion";

const pngs = import.meta.glob("../assets/tech/*.png", { eager: true });

export const images = Object.fromEntries(
  Object.entries(pngs).map(([path, mod]) => {
    const file = path.split("/").pop();
    const name = file.replace(".png", "");
    return [name, mod.default];
  })
);

// One toggle controlling the whole view
const viewOptions = [
  { key: "3d", label: "3D" },
  { key: "languages", label: "Languages" },
  { key: "technologies", label: "Technologies" },
];

const DOMAIN_LABELS = {
  backend: "Backend",
  fullstack: "Full-stack",
  infra: "Infrastructure",
};

const DOMAIN_ORDER = ["fullstack", "backend", "infra"];

function TechnologiesGrouped({ labelList }) {
  const grouped = labelList.reduce((acc, item) => {
    const key = (item.domain || "other").toLowerCase();
    (acc[key] ??= []).push(item);
    return acc;
  }, {});

  return (
    <div className="mt-8 max-w-5xl mx-auto space-y-6">
      {DOMAIN_ORDER.filter((k) => grouped[k]?.length).map((k) => (
        <div key={k} className="rounded-2xl border border-white/15 bg-white/5 p-5">
          <h3 className="text-xl font-fraunces semibold text-violet-200 mb-3">
            {DOMAIN_LABELS[k] ?? k}
          </h3>

          <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
            {grouped[k].map((tech) => (
              <span
                key={tech.label}
                variant="secondary"
                className="px-5 py-2 rounded-xl border border-white/20 bg-white/10 text-white/90"
              >
                {tech.label}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}


const Skills = () => {
  // default selected = first option => 3D
  const [view, setView] = useState(viewOptions[0].key);

  const orbSkills = [
    { name: "typescript", label: "TypeScript", imageScale: 1.4 },
    { name: "js", label: "JavaScript", imageScale: 1.5 },
    { name: "pythonn", label: "Python", imageScale: 1.5 },
    { name: "c", label: "C", imageScale: 1.3 },
    { name: "cpp", label: "C++", imageScale: 1.7 },
    { name: "nextjs", label: "Next.js", imageScale: 1.4 },
    { name: "tailwindd", label: "TailwindCSS", imageScale: 1.5 },
    { name: "nodejs", label: "Node.js", imageScale: 1.5 },
    { name: "mongodb", label: "MongoDB", imageScale: 1.5 },
    { name: "docker", label: "Docker", imageScale: 1.35 },
  ];

  // Complete list for 2D views (all your skills)
  const allSkills = [
    // Languages
    { label: "TypeScript", type: "language" },
    { label: "JavaScript", type: "language" },
    { label: "Python", type: "language" },
    { label: "C", type: "language" },
    { label: "C++", type: "language" },
    { label: "C#", type: "language" },
    // Add more languages here
    
    // Technologies
    { label: "Next.js", type: "technology", domain:"fullstack"},
    { label: "React", type: "technology", domain:"fullstack"},
    { label: "TailwindCSS", type: "technology", domain:"fullstack"},

    { label: "Node.js", type: "technology", domain:"backend"},
    { label: "MongoDB", type: "technology", domain:"backend"},
    { label: "FastAPI", type: "technology", domain:"backend"},
    { label: "Flask", type: "technology", domain:"backend"},
    { label: "Django", type: "technology", domain:"backend"},
    { label: "Redis", type: "technology", domain:"backend" },
    { label: "PostgreSQL", type: "technology", domain:"backend" },
    { label: "MySQL", type: "technology", domain:"backend" },

    { label: "AWS", type: "technology", domain:"infra"},
    { label: "Docker", type: "technology", domain:"infra"},
    { label: "Git", type: "technology", domain:"infra"},
    { label: "GitHub Actions", type: "technology", domain:"infra"},
    { label: "Linux", type: "technology", domain:"infra"},
    // Add more technologies here
  ];

  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)"); // tailwind sm
    const onChange = () => setIsSmall(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const maxPerRow = isSmall ? 4 : 7;
  const spacing = isSmall ? 2 : 2;

  const labelList =
    view === "languages"
      ? allSkills.filter((s) => s.type === "language")
      : view === "technologies"
      ? allSkills.filter((s) => s.type === "technology")
      : [];

  return (
    <section id="skills" className="w-full px-4 sm:px-6 lg:px-10 py-12 sm:py-16 mt-10">
      <motion.div variants={textVariant()}>
        <p className="p-lead flex justify-center">Languages and software</p>
        <h2 className="flex justify-center">Skills</h2>

        {/* The segmented control */}
        <div className="mt-6 relative z-20">
          <Toggle options={viewOptions} value={view} onChange={setView} />
        </div>

      </motion.div>


      {/* 3D ORBS VIEW */}
      {view === "3d" ? (
        <div className="w-full h-[500px] sm:h-[560px] lg:h-[650px] rounded-2xl overflow-visible -mt-40 z-10">
          <Canvas camera={{ position: [0, 0, window.innerWidth < 640 ? 12 : 10], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[4, 4, 3]} intensity={1.5} />

            {orbSkills.map((skill, index) => {
              const row = Math.floor(index / maxPerRow);
              const col = index % maxPerRow;
              const orbsInRow = Math.min(maxPerRow, orbSkills.length - row * maxPerRow);
              const xOffset = -((orbsInRow - 1) * spacing) / 2;

              return (
                <Orb
                  key={skill.name}
                  scale={0.6}
                  position={[xOffset + col * spacing, -row * spacing, 0]}
                  imagePath={images[skill.name]}
                  imageScale={skill.imageScale || 1}
                  label={skill.label}
                />
              );
            })}
          </Canvas>
        </div>
      ) : (
          /* 2D LABEL VIEW (Languages or Technologies) */
        <div className="mt-10">
          <div className="text-center text-3xl font-semibold text-white ">
            {view === "languages" ? "Languages" : "Technologies"}
          </div>

          <div className="mt-3 text-center text-white/60">
            {view === "languages" ? "" : ""}
          </div>

          {view === "languages" ? (
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {labelList.map((s) => (
                <span
                  key={s.label}
                  className="px-6 py-3 rounded-xl border border-white/30 bg-white/10 text-white/90"
                >
                  {s.label}
                </span>
              ))}
            </div>
          ) : (
            <TechnologiesGrouped labelList={labelList} />
            )}
            </div>
          )}
    </section>
  );
};

export default SectionWrapper(Skills, "skills");
