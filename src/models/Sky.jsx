import { useGLTF } from '@react-three/drei'
import skyScene from '../assets/3d/sky.glb'

const Sky = (props) => {
  const sky = useGLTF(skyScene)
  return (
    <mesh {...props}>
      <primitive object={sky.scene} />
    </mesh>
  )
}

useGLTF.preload(skyScene)

export default Sky