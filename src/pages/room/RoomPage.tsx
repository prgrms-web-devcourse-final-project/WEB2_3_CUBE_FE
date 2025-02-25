import { motion } from 'framer-motion';
import { useState } from 'react';
import DockMenu from './components/DockMenu';
import PreferenceSetting from './components/PreferenceSetting';
import ThemeSetting from './components/ThemeSetting';
import Room from './Room';

const themeData = {
  basic: {
    title: '베이직',
    description: '심플하고 깔끔한 스타일',
    modelPath: '/models/basicRoom.glb',
    isLocked: false,
  },
  forest: {
    title: '포레스트',
    description: '자연 친화적인 스타일',
    modelPath: '/models/forestRoom.glb',
    isLocked: false,
  },
  marine: {
    title: '마린',
    description: '시원하고 깔끔한 스타일',
    modelPath: '/models/marineRoom.glb',
    isLocked: false,
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
          <ThemeSetting themeData={themeData} selectedTheme={selectedTheme} onThemeSelect={handleThemeChange} />
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
      <Room modelPath={themeData[selectedTheme].modelPath} />
    </main>
  );
}
