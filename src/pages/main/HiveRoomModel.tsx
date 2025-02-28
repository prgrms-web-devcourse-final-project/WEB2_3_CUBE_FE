import { Center, useGLTF } from '@react-three/drei';
import { useEffect } from 'react';

export default function HiveRoomModel({ room, position }) {
  const { scene } = useGLTF(room.modelPath) as GLTFResult;

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
    <mesh position={position}>
      <Center>
        <primitive
          object={scene}
          scale={0.3} 
          rotation={[0, -Math.PI / 4, 0]}
        />
      </Center>
    </mesh>
  );
}
