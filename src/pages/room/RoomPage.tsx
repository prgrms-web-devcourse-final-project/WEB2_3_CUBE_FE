import basicImg from '@assets/room/thumbnail-basic.png';
import forestImg from '@assets/room/thumbnail-forest.png';
import marineImg from '@assets/room/thumbnail-marine.png';
import { motion } from 'framer-motion';
import { useState } from 'react';
import DockMenu from './components/DockMenu';
import PreferenceSetting from './components/PreferenceSetting';
import Room from './components/Room';
import ThemeSetting from './components/ThemeSetting';

const themeData = {
  basic: {
    title: '베이직',
    description: '깔끔하고 모던한 공간',
    modelPath: '/models/basicRoom.glb',
    isLocked: false,
    thumbnail: basicImg,
  },
  forest: {
    title: '포레스트',
    description: '자연의 따뜻한 감성',
    modelPath: '/models/forestRoom.glb',
    isLocked: false,
    thumbnail: forestImg,
  },
  marine: {
    title: '마린',
    description: '시원한 해양 분위기',
    modelPath: '/models/marineRoom.glb',
    isLocked: false,
    thumbnail: marineImg,
  },
};

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
  const [activeSettings, setActiveSettings] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState('basic');

  const handleSettingsChange = (setting) => {
    setActiveSettings(activeSettings === setting ? null : setting);
  };

  const handleThemeChange = (newTheme) => {
    setSelectedTheme(newTheme);
  };

  return (
    <main className='main-background w-full min-h-screen relative overflow-hidden'>
      <Room
        modelPath={themeData[selectedTheme].modelPath}
        theme={selectedTheme}
        activeSettings={activeSettings}
      />

      <DockMenu
        activeSettings={activeSettings}
        onSettingsChange={handleSettingsChange}
      />
      {activeSettings === 'theme' && (
        <motion.div
          initial='hidden'
          animate='visible'
          variants={animationVariants}
          className='w-full absolute top-0 left-0 z-50'>
          <ThemeSetting
            themeData={themeData}
            selectedTheme={selectedTheme}
            onThemeSelect={handleThemeChange}
          />
        </motion.div>
      )}
      {activeSettings === 'preference' && (
        <motion.div
          initial='hidden'
          animate='visible'
          variants={animationVariants}
          className='w-full absolute top-0 left-0 z-50'>
          <PreferenceSetting />
        </motion.div>
      )}
    </main>
  );
}
