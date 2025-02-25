import { Center, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useRef } from 'react';
import * as THREE from 'three';

import { CAMERA_CONFIG } from '../../constants/sceneSetting';
import { RoomLighting } from './RoomLighting';

export default function Room({ modelPath }) {
  const { scene } = useGLTF(modelPath) as GLTFResult;
  const isFirstLoad = useRef(true);
  const initialPosition = useRef(new THREE.Vector3());

  useEffect(() => {
    if (scene) {
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      if (isFirstLoad.current) {
        initialPosition.current.set(
          -center.x,
          -center.y + size.y / 2,
          -center.z,
        );
        isFirstLoad.current = false;
      }

      scene.position.copy(initialPosition.current);

      scene.traverse((object) => {
        if (object.isMesh) {
          object.castShadow = true;
          object.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  return (
    <div className='w-full h-screen'>
      <Canvas
        shadows
        camera={CAMERA_CONFIG}>
        <RoomLighting />
        <Suspense fallback={null}>
          <mesh>
            <Center>
              <primitive
                object={scene}
                scale={0.7}
                rotation={[0, -Math.PI / 4, 0]}
              />
            </Center>
          </mesh>
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
