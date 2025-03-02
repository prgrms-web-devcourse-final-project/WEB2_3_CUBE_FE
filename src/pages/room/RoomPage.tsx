import { themeData } from '@constants/roomTheme';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { roomAPI } from '../../apis/room';
import { useUserStore } from '../../store/useUserStore';
import DockMenu from './components/DockMenu';
import PreferenceSetting from './components/PreferenceSetting';
import RoomModel from './components/RoomModel';
import ThemeSetting from './components/ThemeSetting';

const animationVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 130,
      damping: 18,
    },
  },
};

export default function RoomPage() {
  const { userId } = useParams<{ userId: string }>();
  const [roomData, setRoomData] = useState<RoomData>(null);
  const [activeSettings, setActiveSettings] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<
    'basic' | 'forest' | 'marine'
  >('basic');
  const [visibleFurnitures, setVisibleFurnitures] = useState<Furniture[]>([]);
  const [storageData, setStorageData] = useState<StorageLimits & UserStorage>({
    maxMusic: 20,
    maxBooks: 20,
    savedMusic: 0,
    savedBooks: 0,
    writtenReviews: 0,
    writtenMusicLogs: 0,
  });

  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (!userId) return;

    const fetchRoomData = async () => {
      try {
        const roomData: RoomData = await roomAPI.getRoomById(Number(userId));
        if (roomData) {
          setRoomData(roomData);
          setSelectedTheme(roomData.theme as 'basic' | 'forest' | 'marine');
          setVisibleFurnitures(
            roomData.furnitures.filter((furniture) => furniture.isVisible),
          );
          if (roomData.storageLimits && roomData.userStorage) {
            setStorageData({
              ...roomData.storageLimits,
              ...roomData.userStorage,
            });
          }
        }
      } catch (error) {
        console.error('방 정보 불러오기 실패:', error);
      }
    };

    fetchRoomData();
  }, [userId]);

  const handleSettingsChange = (setting: string) => {
    setActiveSettings(activeSettings === setting ? null : setting);
  };

  const handleThemeChange = (newTheme: 'basic' | 'forest' | 'marine') => {
    setSelectedTheme(newTheme);
  };

  const handleSaveTheme = async () => {
    try {
      await roomAPI.updateRoomTheme(user.roomId, user.userId, selectedTheme);
      console.log('방 테마 변경 성공');
    } catch (error) {
      console.error('방 테마 변경 실패:', error);
    }
  };

  const handleCloseSettings = () => {
    if (activeSettings === 'theme') {
      handleSaveTheme();
    }
    setActiveSettings(null);
  };

  return (
    <main className='relative w-full min-h-screen overflow-hidden main-background'>
      {roomData && (
        <RoomModel
          userId={userId}
          ownerId={roomData.userId}
          ownerName={roomData.nickname}
          roomId={user.roomId}
          modelPath={themeData[selectedTheme]?.modelPath}
          activeSettings={activeSettings}
          furnitures={visibleFurnitures}
        />
      )}
      {userId === String(user?.userId) && (
        <DockMenu
          activeSettings={activeSettings}
          onSettingsChange={handleSettingsChange}
        />
      )}
      {activeSettings === 'theme' && (
        <motion.div
          initial='hidden'
          animate='visible'
          variants={animationVariants}
          className='w-full absolute top-0 left-0 z-30'>
          <ThemeSetting
            selectedTheme={selectedTheme}
            onThemeSelect={handleThemeChange}
            onClose={handleCloseSettings}
          />
        </motion.div>
      )}
      {activeSettings === 'preference' && (
        <motion.div
          initial='hidden'
          animate='visible'
          variants={animationVariants}
          className='w-full absolute top-0 left-0 z-30'>
          <PreferenceSetting
            {...storageData}
            userId={user.userId}
            roomId={user.roomId}
          />
        </motion.div>
      )}
    </main>
  );
}
