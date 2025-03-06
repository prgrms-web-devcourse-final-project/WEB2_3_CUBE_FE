import { themeData } from '@constants/roomTheme';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { roomAPI } from '../../apis/room';
import { rankAPI } from '../../apis/ranking';
import { ANIMATION_VARIANTS } from '../../constants/animation';
import { SIGN_VARIANTS } from '../../constants/sign';
import { useToastStore } from '../../store/useToastStore';
import { useUserStore } from '../../store/useUserStore';
import DockMenu from './components/DockMenu';
import PreferenceSetting from './components/PreferenceSetting';
import RoomModel from './components/RoomModel';
import ThemeSetting from './components/ThemeSetting';

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

  const recordVisit = async (visitorId:number, hostId:number) =>{
    try {
      await rankAPI.visitByUserId(visitorId, hostId);
    } catch (error){
      console.error('방문 기록 실패:',error);
    }
  }

  const fetchRoomData = async (id:number) => {
    try {
      const roomData: RoomData = await roomAPI.getRoomById(id);
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

  useEffect(() => {
    if (!userId) return;

    const loadRoom = async () => {
      if(user && Number(userId) !== user.userId){
        await recordVisit(user.userId, Number(userId));
      }
      await fetchRoomData(Number(userId))
    };

    loadRoom();
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
    if (activeSettings === 'theme'&& selectedTheme !== roomData?.theme) {
      handleSaveTheme();
    }
    setActiveSettings(null);
  };

  const handleModalOutsideClick = () => {
    if (activeSettings === 'theme'&& selectedTheme !== roomData?.theme) {
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
          {user && userId !== String(user?.userId) && (
            <motion.div
              className='absolute bottom-18 right-22 z-20'
              initial='hidden'
              animate='visible'
              variants={SIGN_VARIANTS}>
              <div className='bg-white/20 rounded-full p-1.5 border-2 border-white'>
                <div className='bg-white text-[#162C63] py-3 px-12 rounded-full font-semibold text-base 2xl:text-xl text-center'>
                  {roomData.nickname}님의 방
                </div>
              </div>
            </motion.div>
          )}
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
