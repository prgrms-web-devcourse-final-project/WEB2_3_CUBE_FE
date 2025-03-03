import { themeData } from '@constants/roomTheme';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { roomAPI } from '../../apis/room';
import { ANIMATION_VARIANTS } from '../../constants/animation';
import { useUserStore } from '../../store/useUserStore';
import DockMenu from './components/DockMenu';
import PreferenceSetting from './components/PreferenceSetting';
import RoomModel from './components/RoomModel';
import ThemeSetting from './components/ThemeSetting';

export default function RoomPage() {
  const { userId } = useParams<{ userId: string }>();
  const [roomData, setRoomData] = useState<RoomData>(null);
  const [activeSettings, setActiveSettings] = useState<string | null>(null);
  const [resetDockMenuState, setResetDockMenuState] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<
    'basic' | 'forest' | 'marine'
  >('basic');
  const [visibleFurnitures, setVisibleFurnitures] = useState<Furniture[]>([]);
  const [storageData, setStorageData] = useState<StorageData>({
    maxBooks: 0,
    maxMusic: 0,
    savedBooks: 0,
    savedMusic: 0,
    writtenMusicLogs: 0,
    writtenReviews: 0,
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
          console.log(roomData);

          setStorageData({
            ...roomData.storageLimits,
            ...roomData.userStorage,
          });
        }
      } catch (error) {
        console.error('방 정보 불러오기 실패:', error);
      }
    };

    fetchRoomData();
  }, [userId]);

  const handleThemeChange = (newTheme: 'basic' | 'forest' | 'marine') => {
    setSelectedTheme(newTheme);
  };

  const handleSaveTheme = async () => {
    try {
      await roomAPI.updateRoomTheme(
        roomData.roomId,
        roomData.userId,
        selectedTheme,
      );
      console.log('방 테마 변경 성공');
    } catch (error) {
      console.error('방 테마 변경 실패:', error);
    }
  };

  const { bookshelfLevel, cdRackLevel } = roomData?.furnitures?.reduce(
    (acc, furniture) => {
      if (furniture.furnitureType === 'BOOKSHELF')
        acc.bookshelfLevel = furniture.level;
      if (furniture.furnitureType === 'CD_RACK')
        acc.cdRackLevel = furniture.level;
      return acc;
    },
    { bookshelfLevel: 1, cdRackLevel: 1 },
  ) || { bookshelfLevel: 1, cdRackLevel: 1 };

  const handleFurnitureToggle = async (
    furnitureType: 'BOOKSHELF' | 'CD_RACK',
  ) => {
    try {
      const updatedFurniture = await roomAPI.updateRoomFurniture(
        roomData.roomId,
        roomData.userId,
        furnitureType,
      );

      setVisibleFurnitures((prevFurnitures) => {
        if (updatedFurniture.furniture.isVisible) {
          return [...prevFurnitures, updatedFurniture.furniture];
        } else {
          return prevFurnitures.filter(
            (f) => f.furnitureType !== furnitureType,
          );
        }
      });

      setRoomData((prev) => ({
        ...prev,
        furnitures: prev.furnitures.map((f) =>
          f.furnitureType === furnitureType
            ? { ...f, isVisible: updatedFurniture.furniture.isVisible }
            : f
        ),
      }));

    } catch (error) {
      console.error('가구 설정 변경 실패:', error);
    }
  };

  const handleSettingsChange = (setting: string) => {
    setActiveSettings(activeSettings === setting ? null : setting);
  };

  const handleCloseSettings = () => {
    if (activeSettings === 'theme') {
      handleSaveTheme();
    }
    setActiveSettings(null);
  };

  const handleModalOutsideClick = () => {
    if (activeSettings === 'theme') {
      handleSaveTheme();
    }
    setActiveSettings(null);
    setResetDockMenuState(true);
    setTimeout(() => setResetDockMenuState(false), 0);
  };

  return (
    <main className='relative w-full min-h-screen overflow-hidden main-background'>
      {roomData && (
        <RoomModel
          ownerId={roomData.userId}
          ownerName={roomData.nickname}
          roomId={roomData.roomId}
          modelPath={themeData[selectedTheme]?.modelPath}
          activeSettings={activeSettings}
          furnitures={visibleFurnitures}
        />
      )}
      {userId === String(user?.userId) && (
        <DockMenu
          activeSettings={activeSettings}
          onSettingsChange={handleSettingsChange}
          resetState={resetDockMenuState}
        />
      )}
      {activeSettings === 'theme' && (
        <motion.div
          initial='hidden'
          animate='visible'
          variants={ANIMATION_VARIANTS}
          className='w-full absolute top-0 left-0 z-30'>
          <ThemeSetting
            selectedTheme={selectedTheme}
            onThemeSelect={handleThemeChange}
            onClose={handleModalOutsideClick}
          />
        </motion.div>
      )}
      {activeSettings === 'preference' && (
        <motion.div
          initial='hidden'
          animate='visible'
          variants={ANIMATION_VARIANTS}
          className='w-full absolute top-0 left-0 z-30'>
          <PreferenceSetting
            storageData={storageData}
            onFurnitureToggle={handleFurnitureToggle}
            bookshelfLevel={bookshelfLevel}
            cdRackLevel={cdRackLevel}
            furnitures={roomData.furnitures}
            onClose={handleCloseSettings}
          />
        </motion.div>
      )}
    </main>
  );
}
