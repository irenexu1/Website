import Orb from "../components/Orbs.jsx";
import { Canvas } from "@react-three/fiber";
import { Sparkles, Stars } from "@react-three/drei";

// Skills.jsx
// One Canvas that renders ALL 15 orbs.
// - global stars + sparkles + bloom (only once)
// - OrbitControls makes it interactive (drag to rotate camera)


const SKILLS = [
  "C++", "Python", "JavaScript", "TypeScript", "React"
];

// Make a simple grid of positions in 3D space.
// This avoids manually typing 15 positions.
function makeGridPositions(count) {
  const cols = 5;            // 5 across
  const gapX = 2.0;          // spacing left/right
  const gapY = 1.8;          // spacing up/down

  const rows = Math.ceil(count / cols);
  const startX = -((cols - 1) * gapX) / 2;  // center the grid horizontally
  const startY = ((rows - 1) * gapY) / 2;   // center vertically

  return Array.from({ length: count }, (_, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);

    const x = startX + col * gapX;
    const y = startY - row * gapY;
    const z = 0; // same depth for a clean grid

    return [x, y, z];
  });
}

export default function Skills() {
  const positions = makeGridPositions(SKILLS.length);

  return (
    <section id="skills" className="min-h-screen w-full px-6 py-16">
      <h2 className="text-3xl font-bold flex justify-center">Skills</h2>
  
      {/* Canvas container height controls how tall the 3D area is */}
      <div className="w-full h-[650px] rounded-2xl overflow-hidden">
        <Canvas
          // Lower DPR helps performance on high-res screens
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 10], fov: 45 }}
          gl={{ antialias: true }}
        >

          {/* Keep lights global (not per-orb) for performance */}
          <ambientLight intensity={0.35} />
          <directionalLight position={[4, 4, 3]} intensity={1.5} />

          {/* Global background effects (only once) */}

          {/* Render many orbs */}
          {SKILLS.map((label, i) => (
            <Orb key={label} label={label} position={positions[i]} />
          ))}

          {/* Bloom is expensive, so keep it global and moderate */}


        </Canvas>
      </div>
    </section>
  );
}