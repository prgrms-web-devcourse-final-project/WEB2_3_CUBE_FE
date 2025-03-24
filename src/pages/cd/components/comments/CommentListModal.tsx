import ModalBackground from '@components/ModalBackground';
import React, { useCallback, useRef, useState } from 'react';
import { SearchInput } from '@components/search-modal/SearchInput';
import Pagination from '@components/Pagination';
import { motion } from 'framer-motion';
import { useFetchCdComments } from '@hooks/cd/useFetchCdComments';
import CommentList from './CommentList';

const CommentListModal = React.memo(({ onClose }: { onClose: () => void }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentInput, setCurrentInput] = useState('');

  const totalPage = useRef<number>(1);

  const { cdComments, isSearching, setCdComments } = useFetchCdComments(
    currentPage,
    currentInput,
  );

  const handleChangePage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <ModalBackground onClose={onClose}>
      <div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.95, x: 20 }}
          transition={{
            duration: 0.2,
            ease: 'easeOut',
          }}
          className='w-[662px] h-[690px] rounded-3xl border-2 border-[#FCF7FD] shadow-box  backdrop-blur-[15px] p-4  '>
          <div className='w-full  h-full bg-[#FCF7FD] rounded-[16px]  backdrop-blur-[15px] py-10 px-27'>
            <h1 className='text-[#7838AF]  text-2xl font-bold text-center mb-7'>
              댓글 목록
            </h1>

            <SearchInput
              value={currentInput}
              onChange={setCurrentInput}
              placeholder='어떤 댓글을 삭제할까요?'
              mainColor='#7838AF'
            />

            <CommentList
              isSearching={isSearching}
              cdComments={cdComments}
              setCdComments={setCdComments}
            />

            {cdComments?.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPage={totalPage.current}
                onChangePage={handleChangePage}
                color='#7838AF'
              />
            )}
          </div>
        </motion.div>
      </div>
    </ModalBackground>
  );
});

export default CommentListModal;
