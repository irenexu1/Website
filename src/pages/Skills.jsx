import Orb from "../models/Orb.jsx";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import SectionWrapper from "../components/SectionWrapper";
import Toggle from "../components/Toggle";

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

const Skills = () => {
  // default selected = first option => 3D
  const [view, setView] = useState(viewOptions[0].key);

  // Add a "type" so we can filter for the 2D views
  const skills = [
    { name: "typescript", label: "TypeScript", imageScale: 1.4, type: "language" },
    { name: "js", label: "JavaScript", imageScale: 1.5, type: "language" },
    { name: "pythonn", label: "Python", imageScale: 1.5, type: "language" },
    { name: "c", label: "C", imageScale: 1.3, type: "language" },
    { name: "cpp", label: "C++", imageScale: 1.7, type: "language" },

    { name: "nextjs", label: "Next.js", imageScale: 1.4, type: "technology" },
    { name: "tailwindd", label: "TailwindCSS", imageScale: 1.5, type: "technology" },
    { name: "nodejs", label: "Node.js", imageScale: 1.5, type: "technology" },
    { name: "mongodb", label: "MongoDB", imageScale: 1.5, type: "technology" },
    { name: "redis", label: "Redis", imageScale: 1.4, type: "technology" },
    { name: "docker", label: "Docker", imageScale: 1.35, type: "technology" },
  ];

  const maxPerRow = 7;
  const spacing = 2;

  const labelList =
    view === "languages"
      ? skills.filter((s) => s.type === "language")
      : view === "technologies"
      ? skills.filter((s) => s.type === "technology")
      : [];

  return (
    <section id="skills" className="w-full px-6 py-16 mt-10">
      <p className="p-lead flex justify-center">Languages and software</p>
      <h2 className="flex justify-center">Skills</h2>

      {/* The segmented control */}
      <div className="mt-6 relative z-20">
        <Toggle options={viewOptions} value={view} onChange={setView} />
      </div>

      {/* 3D ORBS VIEW */}
      {view === "3d" ? (
        <div className="w-full h-[650px] rounded-2xl overflow-hidden -mt-50 z-10">
          <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
            <ambientLight intensity={0.35} />
            <directionalLight position={[4, 4, 3]} intensity={1.5} />

            {skills.map((skill, index) => {
              const row = Math.floor(index / maxPerRow);
              const col = index % maxPerRow;
              const orbsInRow = Math.min(maxPerRow, skills.length - row * maxPerRow);
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
          <div className="text-center text-4xl font-semibold text-white">
            {view === "languages" ? "Languages" : "Technologies"}
          </div>
          <div className="mt-3 text-center text-white/60">
            {view === "languages"
              ? "Programming languages I use"
              : "Frameworks, tools, and platforms I use"}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {labelList.map((s) => (
              <span
                key={s.name}
                className="px-6 py-3 rounded-xl border border-white/30 bg-white/10 text-white/90"
              >
                {s.label}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default SectionWrapper(Skills, "skills");
