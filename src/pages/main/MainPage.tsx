import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import MyRoomBtn from './components/MyRoomBtn';
import RankingModal from './components/RankingModal';
import RankMenu from './components/RankMenu';
import HiveRooms from './components/HiveRooms';
import { useUserStore } from '../../store/useUserStore';

export default function MainPage() {
  const [isRankingOpen, setIsRankingOpen] = useState(false);
  const user = useUserStore((state) => state.user);

  return (
    <main className='@container main-background w-full min-h-screen relative overflow-hidden'>
      {/* 메인 벌집 구조의 방 */}
      <HiveRooms myUserId={user.userId} />
      
      {/* 하단 버튼 */}
      <RankMenu onOpen={() => setIsRankingOpen(true)} />
      <MyRoomBtn  roomId={user?.roomId} />

      {/* 랭킹 모달 */}
      <AnimatePresence>
        {isRankingOpen && (
          <div className='@container w-full h-full'>
            <RankingModal onClose={() => setIsRankingOpen(false)} />
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
