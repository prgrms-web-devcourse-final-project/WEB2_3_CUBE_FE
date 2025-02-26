import { useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';

export default function Furnitures({item}:FurnitureProps) {
  const groupRef = useRef(null);
  
  const { scene } = useGLTF(item.modelPath) as GLTFResult;

  const clonedScene = scene.clone();

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

  return (
    <group
      ref={groupRef}
      position={item.position}
      scale={0.68}
      rotation={item.rotation || [0, 0, 0]}
    >
      <primitive object={clonedScene} />
    </group>
  );
}
