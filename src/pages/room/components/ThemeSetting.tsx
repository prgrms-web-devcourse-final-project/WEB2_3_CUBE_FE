import { useState } from 'react';
import ThemeSettingCard from './ThemeSettingCard';

export default function ThemeSetting() {
  const [selectedTheme, setSelectedTheme] = useState('basic');

  const lockedThemes = {
    basic: false,
    modernCentury: true,
    retro: false,
  }

  return (
    <div className='flex flex-col items-center justify-end w-full min-h-screen'>
      <div className='setting-gradient flex flex-row items-center justify-center 2xl:gap-10 gap-8 w-full h-[418px] 2xl:pt-0 pt-10'>
      {Object.keys(lockedThemes).map((theme) => (
          <ThemeSettingCard
            key={theme}
            theme={theme}
            isSelected={selectedTheme === theme}
            isLocked={lockedThemes[theme]} 
            onClick={() => setSelectedTheme(theme)}
          />
        ))}
      </div>
    </div>
  );
}
