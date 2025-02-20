import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import MyRoom from './components/MyRoom';
import RankingModal from './components/RankingModal';
import RankMenu from './components/RankMenu';
import Guestbook from './components/Guestbook';

export default function MainPage() {
  const [isRankingOpen, setIsRankingOpen] = useState(false);
  const [isGuestBookOpen, setisGuestBookOpen] = useState(false);

  return (
    <main className='@container main-background w-full min-h-screen relative overflow-hidden'>
      <RankMenu onOpen={() => setIsRankingOpen(true)} />
      <MyRoom />

      <AnimatePresence >
        {isRankingOpen && (
          <div className='@container w-full h-full'>
            <RankingModal onClose={() => setIsRankingOpen(false)} />
          </div>
        )}
      </AnimatePresence>

      <button
      onClick={() => setisGuestBookOpen(true)} 
      className='absolute top-50 right-50'>임시 방명록</button>
      <AnimatePresence>
        {isGuestBookOpen && (
          <Guestbook onClose={() => setisGuestBookOpen(false)} />
        )}
      </AnimatePresence>

    </main>
  );
}
