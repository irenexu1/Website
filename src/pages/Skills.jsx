import Orb from "../models/Orb.jsx";
import { Canvas } from "@react-three/fiber";



export default function Skills() {

  return (
    <section id="skills" className="min-h-screen w-full px-6 py-16">
      <h2 className="text-3xl font-bold flex justify-center">
        Skills
      </h2>
  
      {/* Canvas container height controls how tall the 3D area is */}
      <div className="w-full h-[650px] rounded-2xl overflow-hidden">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>

          <ambientLight intensity={0.35} />
          <directionalLight position={[4, 4, 3]} intensity={1.5} />

          <Orb scale={1} position={[0, 0, 0]} />

        </Canvas>
      </div>
    </section>
  );
}