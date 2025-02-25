import { Center, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect } from 'react';
import { motion } from 'framer-motion';

import { CAMERA_CONFIG } from '../../constants/sceneSetting';
import { RoomLighting } from './RoomLighting';

export default function Room({ modelPath, activeSettings }) {
  const { scene } = useGLTF(modelPath) as GLTFResult;

  useEffect(() => {
    if (scene) {
      scene.position.set(0, 0, 0);

      scene.traverse((object) => {
        if (object.isMesh) {
          object.castShadow = true;
          object.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  return (
    <motion.div 
    initial={{ y: 0 }}
    animate={{ y: activeSettings ? -100 : 0 }}
    transition={{ type: 'spring', stiffness: 130, damping: 18 }}
      className='w-full h-screen'>
      <Canvas
        shadows
        camera={CAMERA_CONFIG}>
        <RoomLighting />
        <Suspense fallback={null}>
          <mesh>
            <Center>
              <primitive
                object={scene}
                scale={0.68}
                rotation={[0, -Math.PI / 4, 0]}
              />
            </Center>
          </mesh>
        </Suspense>
        <OrbitControls
          enableRotate={false}
        />
      </Canvas>
    </motion.div>
  );
}
