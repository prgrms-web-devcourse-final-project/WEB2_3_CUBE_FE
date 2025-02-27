import { Center, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { AnimatePresence, motion } from 'framer-motion';
import { Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Furnitures from '../../../components/room-models/Furnitures';
import { RoomLighting } from '../../../components/room-models/RoomLighting';
import { CAMERA_CONFIG } from '../../../constants/sceneSetting';
import { useRoomItems } from '../hooks/useRoomItems';
import Guestbook from './Guestbook';

export default function RoomModel({
  modelPath,
  activeSettings,
  userId,
  roomId,
}) {
  const { scene } = useGLTF(modelPath) as GLTFResult;
  const { items } = useRoomItems();
  const navigate = useNavigate();
  const [isGuestBookOpen, setIsGuestBookOpen] = useState(false);

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
            roomId={roomId}
          />
        )}
      </AnimatePresence>
    </>
  );
}
