import ModalBackground from '@components/ModalBackground';
import { useEffect, useRef, useState } from 'react';
import trashIcon from '@assets/cd/trash-icon.svg';
import { useDebounce } from '@hooks/useDebounce';
import { SearchInput } from '@components/search-modal/SearchInput';
import Pagination from '@components/\bPagination';
import { cdComments } from '@/mocks/mockCdComment';

export default function CommentList({ onClose }) {
  const [currentInput, setCurrentInput] = useState('');
  const [fileredResults, setFilteredResults] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = useRef<number>(20);

  // const startNum = Math.max(currentPage - 1, 1);
  // const endNum = Math.min(currentPage + 1, totalPage);
  // const pageNumberArr = Array.from(
  //   { length: endNum - startNum + 1 },
  //   (_, index) => startNum + index,
  // );
  const debouncedQuery = useDebounce(currentInput, 500);

  useEffect(() => {
    const filteredDatas = cdComments.filter(
      (comment) =>
        comment.nickname.includes(debouncedQuery) ||
        comment.content.includes(debouncedQuery),
    );
    setFilteredResults(filteredDatas);
  }, [debouncedQuery]);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setCurrentInput(event.target.value);
  // };
  return (
    <ModalBackground onClose={onClose}>
      <div className='w-[662px] rounded-3xl border-2 border-[#FCF7FD] shadow-box  backdrop-blur-[15px] p-4  '>
        <div className='w-full h-full bg-[#FCF7FD] rounded-[16px]  backdrop-blur-[15px] pt-10 px-27'>
          <h1 className='text-[#7838AF]  text-2xl font-bold text-center mb-7'>
            댓글 목록 편집
          </h1>

          {/*  입력 창 */}
          <SearchInput
            value={currentInput}
            onChange={setCurrentInput}
            placeholder='어떤 댓글을 삭제할까요?'
            mainColor='#7838AF'
          />

          {/* 댓글 목록 */}
          <ul className='flex flex-col  gap-3 mt-6 mb-5 min-h-[500px]'>
            {fileredResults.map((comment) => (
              <li
                key={comment.userId}
                className={`flex justify-between items-center bg-[#F7F1FA80] rounded-[12px]  `}>
                <div className='flex flex-col gap-1 py-4 pl-7'>
                  <div className='flex items-baseline gap-2 '>
                    <span className='text-[#401D5F] text-[16px] font-bold line-clamp-1'>
                      {comment.nickname}
                    </span>
                    <span className='text-[#401D5F80] text-[10px] '>
                      {comment.date.replaceAll('-', '.')}
                    </span>
                  </div>
                  <p className='text-[#401D5FB2] text-[14px] line-clamp-1'>
                    {comment.content}
                  </p>
                </div>
                <button className='pr-8 py-7 hover:opacity-50 '>
                  <img
                    src={trashIcon}
                    alt='댓글 삭제버튼'
                  />
                </button>
              </li>
            ))}
          </ul>

          {/* 페이지네이션 */}
          <Pagination
            currentPage={currentPage}
            totalPage={totalPage.current}
            onChangePage={handleChangePage}
            color='#7838AF'
          />
        </div>
      </div>
    </ModalBackground>
  );
}
