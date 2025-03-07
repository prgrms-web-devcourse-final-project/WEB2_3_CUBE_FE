import pointIcon from '@/assets/toast/coin.png';
import { Center, Html, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { AnimatePresence, motion } from 'framer-motion';
import { Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPointBalance } from '../../../apis/point';
import Furnitures from '../../../components/room-models/Furnitures';
import { RoomLighting } from '../../../components/room-models/RoomLighting';
import { CAMERA_CONFIG } from '../../../constants/sceneSetting';
import { useUserStore } from '../../../store/useUserStore';
import { useRoomItems } from '../hooks/useRoomItems';
import Guestbook from './Guestbook';

export default function RoomModel({
  modelPath,
  activeSettings,
  ownerName,
  ownerId,
  roomId,
  furnitures,
}: RoomModelProps) {
  const { scene } = useGLTF(modelPath) as GLTFResult;
  const { items } = useRoomItems({ roomId, furnitures });
  const [isGuestBookOpen, setIsGuestBookOpen] = useState(false);
  const [pointBalance, setPointBalance] = useState<number | null>(null);
  const [isPiggyHovered, setIsPiggyHovered] = useState(false);
  const [piggyPosition, setPiggyPosition] = useState<
    [number, number, number] | null
  >(null);
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

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

  const fetchPointBalance = async () => {
    try {
      const { balance } = await getPointBalance();
      setPointBalance(balance);
    } catch (error) {
      console.error('포인트 잔고 조회 실패:', error);
    }
  };

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
      case 'PIGGY_BANK':
        if (ownerId === user?.userId) {
          navigate(`/point/${ownerId}`);
        }
        break;
      default:
        console.log(`None`);
    }
  };

  const handleHover = (
    itemType: string,
    isHovering: boolean,
    position?: [number, number, number],
  ) => {
    if (itemType === 'PIGGY_BANK' && ownerId === user?.userId) {
      setIsPiggyHovered(isHovering);
      if (isHovering) {
        fetchPointBalance();
        setPiggyPosition(position || [0, 0, 0]);
      } else {
        setPiggyPosition(null);
      }
    }
  };

  return (
    <>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: activeSettings ? -100 : 0 }}
        transition={{ type: 'spring', stiffness: 130, damping: 18 }}
        className='relative w-full h-screen'>
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
                  onHover={handleHover}
                />
                {/* 잔액 표시 */}
                {item.type === 'PIGGY_BANK' &&
                  isPiggyHovered &&
                  pointBalance !== null &&
                  piggyPosition &&
                  ownerId === user?.userId && (
                    <Html
                      position={[
                        piggyPosition[0] + 1.4,
                        piggyPosition[1] - 0.38,
                        piggyPosition[2],
                      ]}
                      center>
                      <div
                        className={`
                      speech-bubble flex items-center gap-1 justify-center px-8 py-2 rounded-lg
                      bg-white/70 relative 
                      `}>
                        <img
                          src={pointIcon}
                          alt='사용자 현재 포인트'
                          className='w-4 h-4'
                        />
                        <p className='text-[#607AA9] font-semibold 2xl:text-base text-sm'>
                          {pointBalance}P
                        </p>
                      </div>
                    </Html>
                  )}
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
