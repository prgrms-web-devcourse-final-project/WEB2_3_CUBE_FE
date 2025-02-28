import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

interface ProfileCardLayoutProps extends PropsWithChildren {
  onClickOutside: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const ProfileCardLayout = ({
  children,
  onClickOutside,
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
        <div className='@container relative w-[660px] h-[660px]'>
          {/* 뒤 배경 */}
          <div
            className='absolute w-[660px] h-[660px] bg-[#73A1F7] rounded-[60px] border-2 border-[#2656CD]'
            style={{ bottom: '-24px', left: '0' }}
          />
          {/* 메인 배경 */}
          <section className='relative flex flex-col gap-4 items-center justify-around w-[660px] h-[660px] bg-[#FCF7FD] rounded-[60px] border-2 border-[#2656CD] p-13'>
            {children}
          </section>
        </div>
      </motion.div>
    </div>
  );
};
