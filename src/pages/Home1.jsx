import { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Loader from '../components/Loader'
import Tokyo from '../models/tokyo'
import { EffectComposer, Bloom } from "@react-three/postprocessing";


const Home = () => {
  const [isRotating, setIsRotating] = useState(false);
  const adjustForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, 0, -3];
    let rotation = [0.1, 4.7, 0]

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }

    return [screenScale, screenPosition, rotation]
  }

  const [islandScale, islandPosition, islandRotation] = adjustForScreenSize();

  return (
    <section className="w-full h-screen relative">
      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        IRENE XU
      </div>

      <Canvas
        className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
        camera={{ near: 0.1, far: 1000 }} >

        <Suspense fallback={<Loader />}>

          <ambientLight intensity={0.35} color="#E9D7FF" />
          <directionalLight intensity={2.2} position={[10, 12, 6]} color="#C7A4FF" />
          <pointLight intensity={1.4} position={[-8, 6, -10]} color="#FF4FD8"  />
          <pointLight intensity={0.9} position={[6, 3, 8]} color="#7C5CFF"  />
          <hemisphereLight skyColor="#BFA7FF" groundColor="#241733" intensity={0.45} /> 

          <spotLight
            position={[0, 25, 0]}
            intensity={15}
            angle={0.15}
            penumbra={0.95}
            distance={70}
            decay={.2}
            color="#FCDC95"
          />

          <Tokyo 
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
          />

        </Suspense>
      </Canvas>
    </section>
  )
}

export default Home