import { useToastStore } from '@/store/useToastStore';
import { TOAST_STYLES } from '@/constants/toast';

export const Toast = () => {
  const { message, type } = useToastStore();

  if (!message || !type) return null;

  const style = TOAST_STYLES[type];

  return (
    <div
      className={`
      fixed top-4 left-1/2 -translate-x-1/2 z-50
      py-4 px-8 rounded-lg
      flex items-center gap-4
      border-2 ${style.bg} ${style.border}
      animate-fade-in-down
      shadow-md
    `}>
      <img
        src={style.icon}
        alt={`${type} 알림 아이콘`}
        className={`w-5 h-5 ${style.iconColor}`}
      />
      <span className={`${style.textColor} font-semibold`}>{message}</span>
    </div>
  );
};
