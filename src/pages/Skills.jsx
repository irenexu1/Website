import Orb from "../models/Orb.jsx";
import { Canvas } from "@react-three/fiber";



export default function Skills() {

  return (
    <section id="skills" className="min-h-screen w-full px-6 py-16">
      <h2 className="flex justify-center">
        Skills
      </h2>
  
      {/* Canvas container height controls how tall the 3D area is */}
      <div className="w-full h-[650px] rounded-2xl overflow-hidden -mt-50">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>

          <ambientLight intensity={0.35} />
          <directionalLight position={[4, 4, 3]} intensity={1.5} />


          <Orb scale={0.7} position={[-6, 0, 0]} imagePath="javascript.png" />
          <Orb scale={0.7} position={[-4, 0, 0]} imagePath="tailwind10.png" imageScale={1.5}/>
          <Orb scale={0.7} position={[-2, 0, 0]} imagePath="node.png" imageScale={1.7}/>
          <Orb scale={0.7} position={[0, 0, 0]} imagePath="/c++.png" imageScale={1.7}/>
          <Orb scale={0.7} position={[2, 0, 0]} imagePath="/c.png" />
          <Orb scale={0.7} position={[4, 0, 0]} imagePath="docker.png" />
          <Orb scale={0.7} position={[6, 0, 0]} imagePath="python.png" imageScale={1.5}/>

        </Canvas>
      </div>
    </section>
  );
}