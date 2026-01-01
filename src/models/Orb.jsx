import { useMemo, useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { useGLTF, useAnimations, Decal, Html } from '@react-three/drei'
import * as THREE from "three";


function makeTextTexture(text) {
  const size = 512;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d");

  ctx.clearRect(0, 0, size, size); // transparent background
  ctx.fillStyle = "#ff1a8c"; // Change to any color: "#ffaa00", "#00ff00", etc.
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "bold 72px Arial";
  ctx.fillText(text, size / 2, size / 2);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}


export default function Orb({ id = 0, label = "", imagePath = "", imageScale = 1.5, position = [0, 0, 0], onSelect, ...props}) {
   const ref = useRef();

   const spinRef = useRef();

   const dragging = useRef(false);
   const last = useRef({x:0, y:0});
   const velocity = useRef({ x: 0, y: 0 })
   const damping = 0.92 // closer to 1 = longer glide
   const sensitiviy = 0.01
   const wobbleRef = useRef({ phase: 0, decaying: false, strength: 0 })
   const [hovered, setHovered] = useState(false);
   
   // Randomized animation parameters per orb
   const animParams = useMemo(() => ({
     speedY: 0.8 + Math.random() * 0.6,        // 0.8 to 1.4
     speedX: 0.5 + Math.random() * 0.4,        // 0.5 to 0.9
     amplitudeY: 0.03 + Math.random() * 0.03,  // 0.03 to 0.06 (reduced)
     amplitudeX: 0.03 + Math.random() * 0.04,  // 0.03 to 0.07
     phaseY: Math.random() * Math.PI * 2,      // random start phase
     phaseX: Math.random() * Math.PI * 2,
   }), [id])

   // Load image texture if provided
   const imageTexture = imagePath ? useLoader(THREE.TextureLoader, imagePath) : null;

   const { nodes, materials } = useGLTF('cyber_orb.glb');
   
   const mats = useMemo(() => {
    const shell = materials.shell.clone();
    shell.transparent = true;
    shell.opacity = 0.8;
    shell.color.set('#968cff'); 
    shell.emissive.set('#adbfff');
    shell.emissiveIntensity = 0.9;
    
    const core = materials.material.clone();
    
    const frame = materials.frame.clone();
    frame.color.set('#e3f2ff'); 
    frame.emissive.set('#b5c4ff');
    frame.emissiveIntensity = 4;
    frame.toneMapped = true;
    
    return {shell, core, frame,};
   }, [materials]);
   
   const labelTex = useMemo(() => makeTextTexture(label), [label]);

   const onPointerDown = (e) => {
    e.stopPropagation();
    dragging.current = true;
    last.current.x = e.clientX;
    last.current.y = e.clientY;
    e.target.setPointerCapture?.(e.pointerId)
   }

   const onPointerUp = (e) => {
    dragging.current = false;
    // Trigger wobble when drag stops
    const totalVel = Math.abs(velocity.current.x) + Math.abs(velocity.current.y);
    wobbleRef.current.strength = Math.min(totalVel * 2, 0.015);
    wobbleRef.current.decaying = true;
    wobbleRef.current.phase = 0;
    e.target.releasePointerCapture?.(e.pointerId)
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

    // tweak sensitivity to taste
    spinRef.current.rotation.y += vy
    spinRef.current.rotation.x += vx

    // store velocity for momentum (simple smoothing)
    velocity.current.y = vy
    velocity.current.x = vx
   }


   useFrame(({clock}, delta) => {
    if (!ref.current) return;
    
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
   });


  return (
  <>
  <group ref={ref} position={position} 
    onPointerDown={onPointerDown}
    onPointerUp={onPointerUp}
    onPointerLeave={(e) => { onPointerUp(e); setHovered(false); }}
    onPointerEnter={() => setHovered(true)}
    onPointerMove={onPointerMove}
    {...props} dispose={null}>
    <group ref={spinRef}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Sphere001_0">
                <mesh
                  name="Object_4"
                  castShadow
                  receiveShadow
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
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_6.geometry}
                  material={mats.core}
                />
              </group>
              <group name="Sphere003_2" />
              <group name="Sphere004_3">
                <mesh
                  name="Object_9"
                  castShadow
                  receiveShadow
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
  {label && (
    <Html position={[position[0], position[1] - 1.5, position[2]]} center distanceFactor={10}>
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
