import { motion } from 'framer-motion';
import GuestbookMessage from '@pages/room/components/GuestbookMessage';
import GusetbookInput from '@pages/room/components/GusetbookInput';

import exProfile from '@assets/rank/exProfile.png';

const guestbookData = [
  {
    guestbookId: 1,
    userId: 67890,
    nickname: 'VisitorA',
    profileImage: exProfile,
    message:
      'Lorem ipsum dolor sit amet consectetur. Laoreet pellentesque adipiscing viverra mauris integer pharetra cursus id. Lorem eleifend ut consequat cras rhoncus viverra tincidunt morbi ',
    createdAt: '2025-02-14T15:00:00',
    relation: '하우스메이트',
  },
  {
    guestbookId: 2,
    userId: 67890,
    nickname: 'VisitorA',
    profileImage: exProfile,
    message:
      'Lorem ipsum dolor sit amet consectetur. Laoreet pellentesque adipiscing viverra mauris integer pharetra cursus id. Lorem eleifend ut consequat cras rhoncus viverra tincidunt morbi ',
    createdAt: '2025-02-14T15:00:00',
    relation: '지나가던 나그네',
  },
  // {
  //   guestbookId: 2,
  //   userId: 78901,
  //   nickname: "VisitorB",
  //   profileImage: exProfile,
  //   message: "Love the theme!",
  //   createdAt: "2025-02-14T16:00:00",
  //   relation: "지나가던 나그네",
  // },
  // {
  //   guestbookId: 3,
  //   userId: 78901,
  //   nickname: "VisitorB",
  //   profileImage: exProfile,
  //   message: "Love the theme!",
  //   createdAt: "2025-02-14T16:00:00",
  //   relation: "지나가던 나그네",
  // },
];

export default function Guestbook({ onClose, userId }) {
  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ y: '100vh', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '100vh', opacity: 0 }}
      transition={{ type: 'spring', stiffness: 130, damping: 18 }}
      onClick={handleClickOutside}
      className='fixed inset-0 flex items-center justify-center z-10'>
      <div className='@container relative w-[calc(100vw*0.4266)] max-w-[819px] h-[calc(100vw*0.3911)] max-h-[822px] min-w-[600px] min-h-[550px]'>
        {/* 뒤 배경 */}
        <div
          className='absolute w-full h-full bg-[#73A1F7] rounded-[60px] border-2 border-[#2656CD]'
          style={{ bottom: '-24px', left: '0' }}></div>

        {/* 스프링 요소 - 왼쪽 */}
        <div className='spring-left-first'>
          <div className='spring-element' />
        </div>
        <div className='spring-left-second'>
          <div className='spring-element' />
        </div>

        {/* 스프링 요소- 오른쪽 */}
        <div className='spring-right-first'>
          <div className='spring-element' />
        </div>
        <div className='spring-right-second'>
          <div className='spring-element' />
        </div>

        {/* 메인 배경 */}
        <section className='guest-book  flex-col items-center pt-12 2xl:pt-20 px-13 2xl:px-16'>
          {/* 방명록 컨텐츠 */}
          <span className='flex gap-1 font-bold @lg:text-2xl @2xl:text-4xl @2xl:my-3'>
            <p className='text-[#4983EF]'>체보아</p>
            <p className='text-[#3E507D]'>님의 방명록</p>
          </span>
          {/* 방명록 글 */}
          <GuestbookMessage messages={guestbookData} />
          {/* 작성 필드 */}
          <GusetbookInput />
        </section>
      </div>
    </motion.div>
  );
}
