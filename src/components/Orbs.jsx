import { Text, MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useRef, useState } from "react";



export default function Orb({ label, position = [0, 0, 0] }) {
  const groupRef = useRef(); // controls the whole orb (spin/float)
  const rimMatRef = useRef();  // controls the outer glow intensity

  const rimMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uBoost: { value: 1.0 },
        uColorA: { value: new THREE.Color("#7dd3fc") }, // blue
        uColorB: { value: new THREE.Color("#a78bfa") }, // purple
      },
      vertexShader: `
        varying vec3 vNormalW;
        varying vec3 vPosW;
        void main() {
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vPosW = worldPos.xyz;
          vNormalW = normalize(mat3(modelMatrix) * normal);
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uBoost;
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        varying vec3 vNormalW;
        varying vec3 vPosW;

        void main() {
          // view direction
          vec3 viewDir = normalize(cameraPosition - vPosW);

          // Fresnel: 0 in center, 1 at edges
          float fresnel = pow(1.0 - clamp(dot(vNormalW, viewDir), 0.0, 1.0), 3.0);

          // rim gradient (blue <-> purple) based on angle + a tiny time wobble
          float g = 0.5 + 0.5 * sin(uTime * 0.6 + vPosW.y * 2.0);
          vec3 grad = mix(uColorA, uColorB, g);

          // white highlight near the strongest rim
          float whiteRim = smoothstep(0.8, 1.0, fresnel);

          // final color: gradient + subtle white edge
          vec3 col = grad + whiteRim * vec3(0.3);

          // alpha: mostly transparent center, moderate edge
          float alpha = fresnel * 0.4 * uBoost;

          gl_FragColor = vec4(col, alpha);
        }
      `,
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;


    // gentle float
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = position[1] + Math.sin(t * 1.2) * 0.06;

        // animate rim
    rimMaterial.uniforms.uTime.value = t;
    rimMaterial.uniforms.uBoost.value = 1.0;
  });

  return (
    <group
      ref={groupRef}
      position={position}
    >
      <mesh>
        <sphereGeometry args={[0.78, 24, 24]} />
        <MeshTransmissionMaterial
          transmission={0.9}
          color="#B3D2FF"
          thickness={2.5}
          roughness={0.1}
          ior={1.3}
          chromaticAberration={0}
          distortion={1.2}
          distortionScale={0.4}
          temporalDistortion={0.05}
        />
      </mesh>

      {/* rim glow shell (slightly bigger so it sits on top) */}
      <mesh>
        <sphereGeometry args={[0.82, 24, 24]} />
        <primitive ref={rimMatRef} object={rimMaterial} attach="material" />
      </mesh>

      {/* label */}
      <Text
        position={[0, 0, 0.95]}
        fontSize={0.22}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}
