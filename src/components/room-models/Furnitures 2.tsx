import { useGLTF } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';

export default function Furnitures({item, onInteract }:FurnitureProps) {
  const groupRef = useRef(null);
  const { scene } = useGLTF(item.modelPath) as GLTFResult;
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (scene) {
      scene.traverse((object) => {
        if (object.isMesh) {
          object.castShadow = true;   
          object.receiveShadow = true;
        }
      });
    }
    document.body.style.cursor = hovered ? 'pointer' : 'auto';

    return () => {
      document.body.style.cursor= 'auto';
    }
  }, [scene, hovered]);

  const handlePointerOver = (e: MouseEvent) => {
    e.stopPropagation();
    setHovered(true);
    scene.traverse((object) => {
      if (object.isMesh) {
        object.material.emissive = object.material.color;
        object.material.emissiveIntensity = 0.5;
      }
    });
  };

  const handlePointerOut = (e: MouseEvent) => {
    e.stopPropagation();
    setHovered(false);
    scene.traverse((object) => {
      if (object.isMesh) {
        object.material.emissiveIntensity = 0;
      }
    });
  };

  return (
    <group
      ref={groupRef}
      position={item.position}
      scale={0.68}
      rotation={item.rotation || [0, 0, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onInteract(item.type);
      }}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <primitive object={scene} />

    </group>
  );
}
