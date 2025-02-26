import { Center, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { AnimatePresence, motion } from 'framer-motion';
import { Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CAMERA_CONFIG } from '../../../constants/sceneSetting';
import Furnitures from './Furnitures';
import Guestbook from './Guestbook';
import { RoomLighting } from './RoomLighting';

export default function Room({ modelPath, activeSettings, userId }) {
  const { scene } = useGLTF(modelPath) as GLTFResult;
  const navigate = useNavigate();

  const [isGuestBookOpen, setIsGuestBookOpen] = useState(false);

  const [items, setItems] = useState<FurnitureData[]>([
    {
      id: 'bookShelf',
      type: 'bookShelf',
      rotation: [0, Math.PI / -4.4, 0],
      position: [-0.13, -0.55, -0.3],
      modelPath: '/models/bookshelf.glb',
      isEditable: true,
    },
    {
      id: 'cdPlayer',
      type: 'cdPlayer',
      rotation: [0, Math.PI / -4.4, 0],
      position: [-0.09, -0.58, -0.03],
      modelPath: '/models/cdplayer.glb',
      isEditable: true,
    },
    {
      id: 'piggyCash',
      type: 'piggyCash',
      rotation: [0, Math.PI / -4.4, 0],
      position: [-0.15, -0.55, -0.15],
      modelPath: '/models/piggycash.glb',
      isEditable: false,
    },
    {
      id: 'guestBook',
      type: 'guestBook',
      rotation: [0, Math.PI / -4.4, 0],
      position: [-0.07, -0.45, -0.1],
      modelPath: '/models/guestbook.glb',
      isEditable: false,
    },
  ]);

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

  const handleInteraction = (itemType: string) => {
    switch (itemType) {
      case 'bookShelf':
        navigate(`/bookcase/${userId}`);
        break;
      case 'cdPlayer':
        navigate(`/cdrack/${userId}`);
        break;
      case 'guestBook':
        setIsGuestBookOpen(true);
        break;
      default:
        console.log(`None`);
    }
  };

  return (
    <>
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
            {items.map((item) => (
              <Suspense
                key={item.id}
                fallback={null}>
                <Furnitures
                  item={item}
                  onInteract={handleInteraction}
                />
              </Suspense>
            ))}
          </Suspense>
          <OrbitControls
            enableRotate={false}
            enablePan={false}
            minDistance={5}
            maxDistance={12}
          />
        </Canvas>
      </motion.div>
      <AnimatePresence>
        {isGuestBookOpen && (
          <Guestbook
            onClose={() => setIsGuestBookOpen(false)}
            userId={userId}
          />
        )}
      </AnimatePresence>
    </>
  );
}
