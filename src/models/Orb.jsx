import { useMemo, useRef, useState } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useGLTF, Decal, Html } from '@react-three/drei'
import * as THREE from "three";


let sharedMats = null;

function getSharedMats(materials) {
  if (sharedMats) return sharedMats;

  const shell = materials.shell.clone();
    shell.transparent = true;
    shell.opacity = 0.6;
    shell.color.set('#adbfff');
    shell.emissive.set('#D6E6FF');
    shell.emissiveIntensity = 0.6;

    
    const core = new THREE.MeshBasicMaterial({ color: "#ADC9FF" });
    const frame = new THREE.MeshBasicMaterial({ color: "#ffffff"});

    

  sharedMats = {shell, core, frame};
  return sharedMats;
}


export default function Orb({ id = 0, label = "", imagePath = "", imageScale = 1.5, position = [0, 0, 0], onSelect, ...props}) {
   const ref = useRef();
   const billboardRef = useRef();
   const { camera, invalidate } = useThree();

   const spinRef = useRef();

   const dragging = useRef(false);
   const last = useRef({x:0, y:0});
   const velocity = useRef({ x: 0, y: 0 })
   const damping = 0.92 // closer to 1 = longer glide
   const sensitiviy = 0.01
   const wobbleRef = useRef({ phase: 0, decaying: false, strength: 0 })
   const [hovered, setHovered] = useState(false);
   
   // Load image texture if provided
   const imageTexture = imagePath ? useLoader(THREE.TextureLoader, imagePath) : null;

   const { nodes, materials } = useGLTF('cyber_orb.glb');
   
   const mats = useMemo(() => getSharedMats(materials), [materials]);

   const onPointerDown = (e) => {
    e.stopPropagation();
    dragging.current = true;
    last.current.x = e.clientX;
    last.current.y = e.clientY;
    e.target.setPointerCapture(e.pointerId);
    invalidate();
   }

   const onPointerUp = (e) => {
    e.stopPropagation();
    dragging.current = false;
    // Trigger wobble when drag stops
    const totalVel = Math.abs(velocity.current.x) + Math.abs(velocity.current.y);
    const strength = Math.min(totalVel * 2, 0.015);

    wobbleRef.current.strength = strength
    wobbleRef.current.phase = 0;
    wobbleRef.current.decaying = strength > 0.0001;
    e.target.releasePointerCapture?.(e.pointerId)
    invalidate();
   } 

   const onPointerMove = (e) => {
    if (!dragging.current || !spinRef.current) return;
    e.stopPropagation();

    const dx = e.clientX - last.current.x
    const dy = e.clientY - last.current.y
    last.current.x = e.clientX
    last.current.y = e.clientY
    
    const vy = dx * sensitiviy
    const vx = dy * sensitiviy

    // tweak sensitivity here
    spinRef.current.rotation.y += vy
    spinRef.current.rotation.x += vx

    // store velocity for momentum (simple smoothing)
    velocity.current.y = vy
    velocity.current.x = vx
    invalidate();
   }


   useFrame(({clock}, delta) => {
    if (!ref.current) return;

    if (billboardRef.current) {
      billboardRef.current.lookAt(camera.position);
    }
    
    // Move upward when hovered
    const targetY = hovered ? position[1] + 0.3 : position[1];
    const targetX = position[0];
    
    // Smoothly interpolate to target position
    ref.current.position.y += (targetY - ref.current.position.y) * 0.1;
    ref.current.position.x += (targetX - ref.current.position.x) * 0.1;

    // momentum rotation from user dragging only (no auto-rotation)
    if (!spinRef.current) return

    if (!dragging.current) {
        spinRef.current.rotation.y += velocity.current.y
        spinRef.current.rotation.x += velocity.current.x

        const d = Math.pow(damping, delta * 60)
        velocity.current.y *= d
        velocity.current.x *= d

        if (Math.abs(velocity.current.y) < 0.00001) velocity.current.y = 0
        if (Math.abs(velocity.current.x) < 0.00001) velocity.current.x = 0
        
        // Spring wobble effect after drag
        if (wobbleRef.current.decaying && wobbleRef.current.strength > 0.0001) {
          wobbleRef.current.phase += delta * 18; // wobble speed
          const wobbleAmount = Math.sin(wobbleRef.current.phase) * wobbleRef.current.strength;
          spinRef.current.rotation.z = wobbleAmount;
          spinRef.current.rotation.y += wobbleAmount * 0.3;
          
          // Decay the wobble
          wobbleRef.current.strength *= Math.pow(0.92, delta * 60);
          
          if (wobbleRef.current.strength < 0.0001) {
            wobbleRef.current.decaying = false;
            spinRef.current.rotation.z = 0;
          }
        }
      }
      
      const moving =
        dragging.current ||
        wobbleRef.current.decaying ||
        velocity.current.x !== 0 ||
        velocity.current.y !== 0 ||
        Math.abs(ref.current.position.y - targetY) > 0.0005 ||
        Math.abs(ref.current.position.x - targetX) > 0.0005;

      if (moving) invalidate();
   });


  return (
  <>
  <group ref={ref} position={position} 
    onPointerDown={onPointerDown}
    onPointerUp={onPointerUp}
    onPointerLeave={(e) => { setHovered(false); invalidate();}}
    onPointerEnter={(e) => {setHovered(true); invalidate();}}
    onPointerMove={onPointerMove}
    {...props} dispose={null}>
    <group ref={billboardRef}>  
    <group ref={spinRef}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Sphere001_0">
                <mesh
                  name="Object_4"
                  geometry={nodes.Object_4.geometry}
                  material={mats.shell}
                >
                  {imageTexture && (
                    <Decal
                      position={[0, 0, 1]}
                      rotation={[0, 0, 0]}
                      scale={imageScale}
                      map={imageTexture}
                      transparent
                      polygonOffset
                      polygonOffsetFactor={-1}
                    />
                  )}
                </mesh>
              </group>
              <group name="Sphere002_1" scale={0.72}>
                <mesh
                  name="Object_6"
                  geometry={nodes.Object_6.geometry}
                  material={mats.core}
                />
              </group>
              <group name="Sphere003_2" />
              <group name="Sphere004_3">
                <mesh
                  name="Object_9"
                  geometry={nodes.Object_9.geometry}
                  material={mats.frame}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
    </group>
  </group>
  {label && (
    <Html position={[position[0], position[1] - 1.0, position[2]]} center distanceFactor={10}>
      <div style={{ 
        color: 'white', 
        fontSize: '14px',
        fontWeight: '500',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        userSelect: 'none',
        textAlign: 'center'
      }}>
        {label}
      </div>
    </Html>
  )}
  </>
  )
}

useGLTF.preload('/cyber_orb.glb')
