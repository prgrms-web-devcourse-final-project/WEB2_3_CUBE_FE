import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import MyRoom from './components/MyRoom';
import RankingModal from './components/RankingModal';
import RankMenu from './components/RankMenu';

export default function MainPage() {
  const [isRankingOpen, setIsRankingOpen] = useState(false);

  return (
    <main className='main-background w-full min-h-screen relative overflow-hidden'>
      <RankMenu onOpen={() => setIsRankingOpen(true)} />
      <MyRoom />

      <AnimatePresence>
        {isRankingOpen && (
          <RankingModal onClose={() => setIsRankingOpen(false)} />
        )}
      </AnimatePresence>
    </main>
  );
}
