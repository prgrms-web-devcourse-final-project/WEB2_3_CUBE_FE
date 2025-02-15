import coin from '@/assets/toast/coin.png';
import toastCheckIcon from '@/assets/toast/toast-check-icon.svg';
import toastErrorIcon from '@/assets/toast/toast-error-icon.svg';

export const TOAST_STYLES = {
  success: {
    bg: 'bg-[#2656CD]/30',
    border: 'border-white',
    icon: toastCheckIcon,
    iconColor: 'text-blue-500',
    textColor: 'text-white',
  },
  error: {
    bg: 'bg-[#FD1E73]/30',
    border: 'border-white',
    icon: toastErrorIcon,
    iconColor: 'text-rose-500',
    textColor: 'text-white',
  },
  info: {
    bg: 'bg-gray-100/50',
    border: 'border-white',
    icon: coin,
    iconColor: 'text-gray-500',
    textColor: 'text-[#1F3468]',
  },
};
