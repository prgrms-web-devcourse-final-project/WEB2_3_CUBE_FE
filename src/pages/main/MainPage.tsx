import { AnimatePresence } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useUserStore } from '../../store/useUserStore';
import AnimationGuide from '../../components/AnimationGuide';
import RankingModal from './components/RankingModal';
import MyRoomBtn from './components/MyRoomBtn';
import RankMenu from './components/RankMenu';
import HiveRooms from './components/HiveRooms';

export default function MainPage() {
  const [isRankingOpen, setIsRankingOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const hasShownGuide = useRef(false);
  const user = useUserStore((state) => state.user);

  const handleLoadingComplete = useCallback(() => {
    if (!hasShownGuide.current) {
      setIsGuideOpen(true);
      hasShownGuide.current = true;
    }
  }, []);

  useEffect(() => {
    if (isGuideOpen) {
      const timer = setTimeout(() => {
        setIsGuideOpen(false);
      }, 2300);

      return () => clearTimeout(timer);
    }
  }, [isGuideOpen]);

  return (
    <main className='@container main-background w-full min-h-screen relative overflow-hidden'>
      {/* 메인 벌집 구조의 방 */}
      <HiveRooms
        myUserId={user?.userId}
        onLoadingComplete={handleLoadingComplete}
      />

      {/* 하단 버튼 */}
      <RankMenu onOpen={() => setIsRankingOpen(true)} />
      <MyRoomBtn roomId={user?.roomId} />

      {/* 랭킹 모달 */}
      <AnimatePresence>
        {isRankingOpen && (
          <div className='@container w-full h-full'>
            <RankingModal onClose={() => setIsRankingOpen(false)} />
          </div>
        )}
      </AnimatePresence>

      {/* 드래그 가이드 */}
      <AnimatePresence>
        {isGuideOpen && (
          <AnimationGuide
            titleText={'마우스 왼쪽 버튼으로 드래그하고'}
            subText={'휠로 줌 인/아웃을 해보세요!'}
            onClose={() => setIsGuideOpen(false)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
