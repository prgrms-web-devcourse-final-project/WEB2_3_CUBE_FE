import dragArrow from '@assets/drag-arrow.svg';
import dragHand from '@assets/drag-hand.png';
import { motion } from 'framer-motion';

export default function AnimationGuide({ titleText, subText, onClose }) {
  return (
    <motion.div
      className='fixed bottom-47 left-1/2 transform -translate-x-1/2 z-50 w-80 h-80 rounded-2xl  backdrop-blur-sm border-3 border-white bg-white/60 flex flex-col items-center justify-center gap-15 pointer-events-auto'
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
      onClick={onClose}
    >
      {/* 드래그 모션 */}
      <motion.div 
        className='relative animate-drag'
        exit={{ x: -10, y: 10, opacity: 0, transition: { duration: 0.3 } }}
      >
        <div className='absolute left-11 top-11 w-8 h-8 bg-[#2656CD]/30 rounded-full animate-pulse' />
        <div className='absolute left-13 top-13 w-4 h-4 bg-[#2656CD]/70 rounded-full' />
        <img
          src={dragHand}
          alt=''
          className='absolute top-14 left-14 w-20 '
        />
        <img
          src={dragArrow}
          alt=''
          className='w-30'
        />
      </motion.div>
      {/* 안내 문구 */}
      <span className='flex flex-col items-center text-sm 2xl:text-base text-[#162C63] font-semibold'>
        <p>{titleText}</p>
        <p>{subText}</p>
      </span>
    </motion.div>
  );
}
