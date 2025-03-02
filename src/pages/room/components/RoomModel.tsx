import { Center, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { AnimatePresence, motion } from 'framer-motion';
import { Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoomLighting } from '../../../components/room-models/RoomLighting';
import { CAMERA_CONFIG } from '../../../constants/sceneSetting';
import { useRoomItems } from '../hooks/useRoomItems';
import Furnitures from '../../../components/room-models/Furnitures';
import Guestbook from './Guestbook';

export default function RoomModel({
  modelPath,
  activeSettings,
  ownerName,
  ownerId,
  roomId,
  furnitures,
}:RoomModelProps) {
  const { scene } = useGLTF(modelPath) as GLTFResult;
  const { items } = useRoomItems({ roomId, furnitures });
  const [isGuestBookOpen, setIsGuestBookOpen] = useState(false);
  const navigate = useNavigate();

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
      case 'BOOKSHELF':
        navigate(`/bookcase/${ownerId}`);
        break;
      case 'CD_RACK':
        navigate(`/cdrack/${ownerId}`);
        break;
      case 'GUEST_BOOK':
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
            ownerName={ownerName}
            onClose={() => setIsGuestBookOpen(false)}
            ownerId={ownerId}
          />
        )}
      </AnimatePresence>
    </>
  );
}
