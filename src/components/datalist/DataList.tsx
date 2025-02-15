import search from '@/assets/search-icon.svg';

import { useEffect, useRef, useState } from 'react';
import NoEditStatusItem from './NoEditStatusItem';
import EditStatusItem from './EditStatusItem';

export default function DataList({
  datas,
  type,
}: {
  datas: DataListInfo[];
  type: string;
}) {
  const isBook = type === 'book' ? true : false;
  const mainColor = isBook ? '#2656CD' : '#7838AF';
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const [isEdit, setIsEdit] = useState(false);
  const [currentInput, setCurrentInput] = useState('');
  const [filteredDatas, setFilteredDatas] = useState<DataListInfo[]>([]);
  // 입력창에 focus 여부
  const [isFocused, setIsFocused] = useState(false);

  const handleDelete = () => {
    console.log('deleted!');
  };

  const handleEdit = () => {
    setIsEdit(true);
    setCurrentInput('');
  };

  const handleComplete = () => {
    setIsEdit(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(event.target.value);
  };

  useEffect(() => {
    const filteredDatas = datas.filter((data) => {
      return (
        data.author?.includes(currentInput) ||
        data.publisher?.includes(currentInput) ||
        data.released_year?.includes(currentInput) ||
        data.singer?.includes(currentInput) ||
        data.title?.includes(currentInput)
      );
    });
    // 입력 결과 디바운싱 적용
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      setFilteredDatas(filteredDatas);
    }, 500);
  }, [currentInput]);

  return (
    <div className=' w-[444px] min-h-screen bg-[#FFFAFA] rounded-tl-3xl rounded-bl-3xl '>
      <div className='pl-11 pt-15 pr-10 '>
        <span
          className={` text-center text-4xl  font-bold leading-normal  text-[${mainColor}]`}>
          PlayList
        </span>

        {/* 총 갯수, 편집 버튼 */}
        <div
          className={`flex  items-center justify-between gap-4 mt-15 font-semibold text-[${mainColor}]  `}>
          <span className='text-[18px] '>{`총 ${datas.length}개`}</span>

          {isEdit ? (
            <div className='flex items-center gap-4.5'>
              <button
                className={`text-[${mainColor}]  cursor-pointer`}
                onClick={handleDelete}>
                삭제
              </button>
              <button
                className={`  cursor-pointer ${
                  isBook ? 'text-[#3E507D80]' : 'text-[#60308C]/80  '
                }`}
                onClick={handleComplete}>
                완료
              </button>
            </div>
          ) : (
            <button
              className='cursor-pointer text-[16px]'
              onClick={handleEdit}>
              편집
            </button>
          )}
        </div>

        {/* 검색창 */}
        <div
          style={isFocused ? { borderColor: mainColor } : {}}
          className={`relative mt-7 mb-9 border-2 border-transparent  rounded-[10px]   `}>
          <div
            className={`flex items-center  w-full  pl-5 pr-4 py-2.5  rounded-[10px]  ${
              isBook ? 'bg-[#C3D7FF26]' : 'bg-[#ddc3ff]/15'
            }`}>
            <input
              className={` w-full focus:outline-none   ${
                isBook
                  ? 'placeholder:text-[#3E507D4D]'
                  : 'placeholder:text-[#60308C4D]'
              } `}
              type='text'
              placeholder='어떤 것이든 검색해보세요!'
              value={currentInput}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={handleChange}
            />
            <button>
              <img
                src={search}
                alt='검색창 로고'
              />
            </button>
          </div>
        </div>
        <ul className='flex flex-col justify-center  gap-6 pb-17 '>
          {filteredDatas.map((data, index) => {
            return isEdit ? (
              <EditStatusItem
                key={index}
                data={data}
                isBook={isBook}
              />
            ) : (
              <NoEditStatusItem
                key={index}
                data={data}
                isBook={isBook}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}
