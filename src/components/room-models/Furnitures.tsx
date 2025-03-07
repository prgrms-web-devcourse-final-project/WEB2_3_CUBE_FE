import { useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Furnitures({item, onInteract, onHover }:FurnitureProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(item.modelPath) as GLTFResult;

  useEffect(() => {
    if (scene) {
      scene.traverse((object) => {
        if (object.isMesh) {
          object.castShadow = true;   
          object.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  const handlePointerOver = (e: MouseEvent) => {
    e.stopPropagation();
    if (onHover) onHover(item.type, true);
    if (onHover) {
      onHover(item.type, true);
    }
    scene.traverse((object) => {
      if (object.isMesh) {
        object.material.emissive = object.material.color;
        object.material.emissiveIntensity = 0.5;
      }
    });
  };

  const handlePointerOut = (e: MouseEvent) => {
    e.stopPropagation();
    if (onHover) onHover(item.type, false);
    if (onHover) {
      onHover(item.type, false);
    }
    scene.traverse((object) => {
      if (object.isMesh) {
        object.material.emissiveIntensity = 0;
      }
    });
  };

  return (
    <group
      ref={groupRef}
      position={new THREE.Vector3(...item.position)}
      scale={item.scale || 0.68}
      rotation={new THREE.Euler(...item.rotation)}
      onClick={(e) => {
        e.stopPropagation();
        if (onInteract) onInteract(item.type);
      }}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <primitive object={scene} />

    </group>
  );
}
