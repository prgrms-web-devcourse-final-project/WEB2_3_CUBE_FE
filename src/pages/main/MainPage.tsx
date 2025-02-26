import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import MyRoom from './components/MyRoom';
import RankingModal from './components/RankingModal';
import RankMenu from './components/RankMenu';

export default function MainPage() {
  const [isRankingOpen, setIsRankingOpen] = useState(false);

  return (
    <main className='@container main-background w-full min-h-screen relative overflow-hidden'>
      <RankMenu onOpen={() => setIsRankingOpen(true)} />
      <MyRoom />

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
