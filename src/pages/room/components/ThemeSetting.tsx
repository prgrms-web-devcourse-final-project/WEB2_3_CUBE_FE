import { themeData } from '@constants/roomTheme';
import ThemeSettingCard from './ThemeSettingCard';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { useRef } from 'react';

export default function ThemeSetting({ selectedTheme, onThemeSelect, onClose }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useClickOutside({ modalRef, buttonRef, isOpen: true, onClose });

  return (
    <div className='flex flex-col items-center justify-end w-full min-h-screen'>
      <div ref={modalRef} className='setting-gradient flex items-start 2xl:items-center justify-center 2xl:gap-10 gap-8 w-full h-[330px] 2xl:h-[418px] 2xl:pt-0 pt-10'>
        {Object.keys(themeData).map((theme) => (
          <ThemeSettingCard
            key={theme}
            theme={theme}
            isSelected={selectedTheme === theme}
            isLocked={themeData[theme].isLocked}
            onClick={() => !themeData[theme].isLocked && onThemeSelect(theme)}
          />
        ))}
      </div>
    </div>
  );
}
