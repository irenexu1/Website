import Orb from "../models/Orb.jsx";
import { Canvas } from "@react-three/fiber";
import SectionWrapper from "../components/SectionWrapper";

const pngs = import.meta.glob("../assets/tech/*.png", { eager: true });

export const images = Object.fromEntries(
  Object.entries(pngs).map(([path, mod]) => {
    const file = path.split("/").pop();
    const name = file.replace(".png", "");
    return [name, mod.default];
  })
);

const Skills = () => {

  return (
    <section id="skills" className="w-full px-6 py-16 mt-10">
      <p className="p-lead flex justify-center">
        Languages and software
      </p>
      <h2 className="flex justify-center">
        Skills
      </h2>
  
      {/* i want to add the tech name under the orb and mayeb a click that resets the orb orientation */} 
      <div className="w-full h-[650px] rounded-2xl overflow-hidden -mt-50">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>

          <ambientLight intensity={0.35} />
          <directionalLight position={[4, 4, 3]} intensity={1.5} />


          <Orb scale={0.7} position={[-6, 0, 0]} imagePath={images.js} label="JavaScript" />
          <Orb scale={0.7} position={[-4, 0, 0]} imagePath={images.tailwindd} imageScale={1.5} label="Tailwind"/>
          <Orb scale={0.7} position={[-2, 0, 0]} imagePath={images.nodejs} imageScale={1.5} label="Node.js"/>
          <Orb scale={0.7} position={[0, 0, 0]} imagePath={images.cpp} imageScale={1.7} label="C++"/>
          <Orb scale={0.7} position={[2, 0, 0]} imagePath={images.c} label="C" />
          <Orb scale={0.7} position={[4, 0, 0]} imagePath={images.docker} label="Docker" />
          <Orb scale={0.7} position={[6, 0, 0]} imagePath={images.pythonn} imageScale={1.5} label="Python"/>

        </Canvas>
      </div>
    </section>
  );
}

export default SectionWrapper(Skills, "skills")