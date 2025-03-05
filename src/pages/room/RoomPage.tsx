import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserStore } from '../../store/useUserStore';
import { useToastStore } from '../../store/useToastStore';
import { roomAPI } from '../../apis/room';
import { themeData } from '@constants/roomTheme';
import { ANIMATION_VARIANTS } from '../../constants/animation';
import { SIGN_VARIANTS } from '../../constants/sign';
import DockMenu from './components/DockMenu';
import PreferenceSetting from './components/PreferenceSetting';
import RoomModel from './components/RoomModel';
import ThemeSetting from './components/ThemeSetting';
import { rankAPI } from '../../apis/ranking';

export default function RoomPage() {
  const { showToast } = useToastStore();
  const { userId } = useParams<{ userId: string }>();
  const [roomData, setRoomData] = useState<RoomData>(null);
  const [activeSettings, setActiveSettings] = useState<string | null>(null);
  const [resetDockMenuState, setResetDockMenuState] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<
    'BASIC' | 'FOREST' | 'MARINE'
  >('BASIC');
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
        if (user && userId !== String(user.userId)) {
          await rankAPI.visitByUserId(String(user.userId), userId);
        }

        const roomData: RoomData = await roomAPI.getRoomById(Number(userId));
        if (roomData) {
          setRoomData(roomData);
          setSelectedTheme(roomData.theme as 'BASIC' | 'FOREST' | 'MARINE');
          setVisibleFurnitures(
            roomData.furnitures.filter((furniture) => furniture.isVisible),
          );

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
  }, [userId, user]);

  const handleThemeChange = (newTheme: 'BASIC' | 'FOREST' | 'MARINE') => {
    setSelectedTheme(newTheme);
  };

  const handleSaveTheme = async () => {
    try {
      await roomAPI.updateRoomTheme(
        roomData.roomId,
        roomData.userId,
        selectedTheme,
      );
      showToast('테마가 업데이트됐어요! 새로운 느낌, 어떠세요?', 'success');
    } catch (error) {
      console.error('방 테마 변경 실패:', error);
      showToast('테마 변경에 실패했어요. 다시 시도해볼까요?', 'error');
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
            : f,
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
    <main className='overflow-hidden relative w-full min-h-screen main-background'>
      {roomData && (
        <>
          <RoomModel
            ownerId={roomData.userId}
            ownerName={roomData.nickname}
            roomId={roomData.roomId}
            modelPath={themeData[selectedTheme]?.modelPath}
            activeSettings={activeSettings}
            furnitures={visibleFurnitures}
          />
          {/* 표지판 */}
          <motion.div
            className='absolute bottom-18 left-[-2px] z-20'
            initial='hidden'
            animate='visible'
            variants={SIGN_VARIANTS}>
            <div className='bg-white/20 rounded-tr-[80px] rounded-br-[80px] p-1.5 pl-0 border-2 border-white '>
              <div className='bg-white text-[#162C63] py-4 px-18 rounded-tr-[80px] rounded-br-[80px] font-semibold text-base 2xl:text-xl text-center'>
                {roomData.nickname}님의 방
              </div>
            </div>
          </motion.div>
        </>
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
          className='absolute top-0 left-0 z-30 w-full'>
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
          className='absolute top-0 left-0 z-30 w-full'>
          <PreferenceSetting
            storageData={storageData}
            onFurnitureToggle={handleFurnitureToggle}
            bookshelfLevel={bookshelfLevel}
            cdRackLevel={cdRackLevel}
            furnitures={roomData.furnitures}
            bookGenres={roomData.topBookGenres}
            cdGenres={roomData.topCdGenres}
            onClose={handleCloseSettings}
          />
        </motion.div>
      )}
    </main>
  );
}
