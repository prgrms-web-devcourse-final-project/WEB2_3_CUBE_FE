import { themeData } from '@constants/roomTheme';
import { useEffect, useRef, useState } from 'react';
import { roomAPI } from '../../../apis/room';
import ConfirmModal from '../../../components/ConfirmModal';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { useToastStore } from '../../../store/useToastStore';
import { useUserStore } from '../../../store/useUserStore';
import ThemeSettingCard from './ThemeSettingCard';

export default function ThemeSetting({
  selectedTheme,
  onThemeSelect,
  onClose,
}: ThemeSettingProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { user } = useUserStore();
  const { showToast } = useToastStore();
  const [unlockedThemes, setUnlockedThemes] = useState<string[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingTheme, setPendingTheme] = useState<
    'BASIC' | 'FOREST' | 'MARINE' | null
  >(null);

  useClickOutside({
    modalRef,
    buttonRef,
    isOpen: true,
    onClose,
    excludeSelectors: ['.bottom-menu', '.modal-shadow'],
  });

  useEffect(() => {
    const fetchUnlockedThemes = async () => {
      if (!user?.userId) return;

      try {
        const themes: string[] = await roomAPI.getUnlockThemes(user.userId);
        setUnlockedThemes(themes);
      } catch (error) {
        console.error('잠금 해제 테마 조회 실패:', error);
      }
    };

    fetchUnlockedThemes();
  }, [user?.userId]);

  const handlePurchaseAndUpdateTheme = async () => {
    if (!pendingTheme || !user?.userId) {
      return;
    }

    try {
      await roomAPI.purchaseThemes(user.roomId, pendingTheme);
      const updatedThemes = await roomAPI.getUnlockThemes(user.userId);
      setUnlockedThemes(updatedThemes);

      await roomAPI.updateRoomTheme(user.roomId, user.userId, pendingTheme);
      onThemeSelect(pendingTheme);
      showToast(
        `${themeData[pendingTheme].title} 테마가 적용되었어요!`,
        'success',
      );
    } catch (error) {
      console.error('테마 적용 실패:', error);
      showToast(
        '테마 적용에 실패했어요. 포인트가 부족할 수도 있어요!',
        'error',
      );
    } finally {
      setShowConfirmModal(false);
      setPendingTheme(null);
    }
  };

  const handleLockedClick = (theme: 'BASIC' | 'FOREST' | 'MARINE') => {
    setPendingTheme(theme);
    setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    handlePurchaseAndUpdateTheme();
  };

  const handleClose = () => {
    setShowConfirmModal(false);
    setPendingTheme(null);
  };

  return (
    <div className='flex flex-col items-center justify-end w-full min-h-screen'>
      <div
        ref={modalRef}
        className='setting-gradient flex items-start 2xl:items-center justify-center 2xl:gap-10 gap-8 w-full h-[330px] 2xl:h-[418px] 2xl:pt-0 pt-10'>
        {Object.keys(themeData).map((theme) => {
          const isLocked = !unlockedThemes.includes(theme);
          // console.log('테마 상태:', { theme, isLocked, selected: selectedTheme === theme });
          return (
            <ThemeSettingCard
              key={theme}
              theme={theme as 'BASIC' | 'FOREST' | 'MARINE'}
              isSelected={selectedTheme === theme}
              isLocked={isLocked}
              onClick={() =>
                isLocked
                  ? handleLockedClick(theme as 'BASIC' | 'FOREST' | 'MARINE')
                  : onThemeSelect(theme as 'BASIC' | 'FOREST' | 'MARINE')
              }
            />
          );
        })}
      </div>
      {showConfirmModal && pendingTheme && (
        <ConfirmModal
          onClose={handleClose}
          onConfirm={handleConfirm}
          title={`${themeData[pendingTheme].title} 테마를 `}
          subTitle='400P로 해제하시겠어요?'
        />
      )}
    </div>
  );
}
