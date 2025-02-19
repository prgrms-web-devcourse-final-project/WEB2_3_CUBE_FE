import { motion } from 'framer-motion';
import { useState } from 'react';
import DockMenu from './components/DockMenu';
import PreferenceSetting from './components/PreferenceSetting';
import ThemeSetting from './components/ThemeSetting';

const animationVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 20,
    },
  },
};

export default function RoomPage() {
  const [activeSettings, setActiveSettings] = useState(null);

  const handleSettingsChange = (setting) => {
    setActiveSettings(activeSettings === setting ? null : setting);
  };

  return (
    <main className='main-background w-full min-h-screen relative overflow-hidden'>
      <DockMenu
        activeSettings={activeSettings}
        onSettingsChange={handleSettingsChange}
      />
      {activeSettings === 'theme' && (
        <motion.div
          initial='hidden'
          animate='visible'
          variants={animationVariants}
          className='w-full'>
          <ThemeSetting />
        </motion.div>
      )}
      {activeSettings === 'preference' && (
        <motion.div
          initial='hidden'
          animate='visible'
          variants={animationVariants}
          className='w-full'>
          <PreferenceSetting />
        </motion.div>
      )}
    </main>
  );
}
