import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Loader from '../components/Loader'
import Tokyo from '../models/tokyo'
import Sky from '../models/Sky'

const Home = () => {
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
        POPUP
      </div>

      <Canvas
        className="w-full h-screen bg-transparent"
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight intensity={0.3} position={[10, 10, 5]} />
          <ambientLight intensity={0.4} />
          <pointLight intensity={0.3} position={[0, 5, 0]} />
          <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={0.35} />

          <Sky />
          <Tokyo 
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
          />

        </Suspense>
      </Canvas>
    </section>
  )
}

export default Home