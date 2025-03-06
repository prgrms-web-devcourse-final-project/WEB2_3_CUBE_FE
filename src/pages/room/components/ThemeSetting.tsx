import { useEffect, useRef, useState } from 'react';
import { themeData } from '@constants/roomTheme';
import { useClickOutside } from '../../../hooks/useClickOutside';
import ThemeSettingCard from './ThemeSettingCard';
import { useUserStore } from '../../../store/useUserStore';
import { roomAPI } from '../../../apis/room';

export default function ThemeSetting({ selectedTheme, onThemeSelect, onClose }: ThemeSettingProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { user } = useUserStore();
  const [unlockedThemes, setUnlockedThemes] = useState<string[]>([]);

  useClickOutside({ modalRef, buttonRef, isOpen: true, onClose, excludeSelectors: ['.bottom-menu'] });

  useEffect(() => {
    const fetchUnlockedThemes = async () => {
      if(!user?.userId) return;

      try {
        const themes: string[] = await roomAPI.getUnlockThemes(user.userId);
        setUnlockedThemes(themes); 
      } catch (error) {
        console.error('잠금 해제 테마 조회 실패:', error);
      }
    }

    fetchUnlockedThemes();
  }, [user?.userId])

  return (
    <div className='flex flex-col items-center justify-end w-full min-h-screen'>
      <div ref={modalRef} className='setting-gradient flex items-start 2xl:items-center justify-center 2xl:gap-10 gap-8 w-full h-[330px] 2xl:h-[418px] 2xl:pt-0 pt-10'>
        {Object.keys(themeData).map((theme) => {
          const isLocked = !unlockedThemes.includes(theme);
          return (
            <ThemeSettingCard
            key={theme}
            theme={theme}
            isSelected={selectedTheme === theme}
            isLocked={isLocked}
            onClick={() => !themeData[theme].isLocked && onThemeSelect(theme)}
            />
          );
        })}
      </div>
    </div>
  );
}
