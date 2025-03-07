import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

interface ProfileCardLayoutProps extends PropsWithChildren {
  onClickOutside?: (e: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
  containerClassName?: string;
  backgroundClassName?: string;
}

export const ProfileCardLayout = ({
  children,
  onClickOutside,
  className,
  containerClassName,
  backgroundClassName,
}: ProfileCardLayoutProps) => {
  return (
    <div className='w-full h-screen main-background'>
      <motion.div
        initial={{ y: '100vh', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100vh', opacity: 0 }}
        transition={{ type: 'spring', stiffness: 130, damping: 18 }}
        onClick={onClickOutside}
        className='fixed inset-0 z-10 flex items-center justify-center'>
        <div
          className={twMerge(
            '@container relative w-[660px] h-[660px]',
            containerClassName,
          )}>
          {/* 뒤 배경 */}
          <div
            className={twMerge(
              'absolute w-full h-full bg-[#73A1F7] rounded-[60px] border-2 border-[#2656CD]',
              backgroundClassName,
            )}
            style={{ bottom: '-24px', left: '0' }}
          />
          {/* 메인 배경 */}
          <section
            className={twMerge(
              'relative flex flex-col gap-4 items-center justify-around w-full h-full bg-[#FCF7FD] rounded-[60px] border-2 border-[#2656CD] p-13',
              className,
            )}>
            {children}
          </section>
        </div>
      </motion.div>
    </div>
  );
};
