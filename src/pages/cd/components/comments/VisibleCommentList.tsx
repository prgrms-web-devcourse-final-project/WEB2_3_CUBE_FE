import { getRelativeTimeString } from '@utils/dateFormat';
import { motion } from 'framer-motion';

export default function VisibleCommentList({
  visibleCdComments,
}: {
  visibleCdComments: CdComment[];
}) {
  return (
    <ul className='flex overflow-hidden flex-col gap-4 justify-end items-end'>
      {/* 댓글  */}
      {visibleCdComments.map((comment: CdComment, index: number) => (
        <motion.li
          key={comment.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className=' animate-pulse flex flex-col gap-1 px-5 py-4 w-fit rounded-comment bg-[#EDE6EE4D]
      drop-shadow-logo border-2 border-white   max-w-[488px]'>
          <div className='flex gap-1.5 items-center text-white'>
            <span className='text-[14px] font-bold'>{comment.nickname}</span>
            <span className='text-[10px] text-[#FFFFFFB2] '>
              {getRelativeTimeString(comment.createdAt)}
            </span>
          </div>
          <p className='text-[12px] font-semibold text-[#FFFFFFE5] line-clamp-4 max-w-fit'>
            {comment.content}
          </p>
        </motion.li>
      ))}
    </ul>
  );
}
