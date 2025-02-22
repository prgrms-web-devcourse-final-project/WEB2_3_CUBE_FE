import search_icon from '@assets/search-icon.svg';

import { useEffect, useRef, useState } from 'react';
import NoEditStatusItem from './NoEditStatusItem';
import EditStatusItem from './EditStatusItem';
import classNames from 'classnames';
import { bookAPI } from '@/apis/book';

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
  const [filteredDatas, setFilteredDatas] = useState<DataListInfo[]>(datas);
  // 입력창에 focus 여부
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // datas가 변경될 때마다 filteredDatas 업데이트
  useEffect(() => {
    setFilteredDatas(datas);
  }, [datas]);

  // 검색어가 변경될 때마다 필터링
  useEffect(() => {
    const filteredResults = datas.filter((data) => {
      const searchTerm = currentInput.toLowerCase();
      return (
        data.author?.toLowerCase().includes(searchTerm) ||
        data.publisher?.toLowerCase().includes(searchTerm) ||
        data.released_year?.toLowerCase().includes(searchTerm) ||
        data.singer?.toLowerCase().includes(searchTerm) ||
        data.title?.toLowerCase().includes(searchTerm)
      );
    });

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      setFilteredDatas(filteredResults);
    }, 500);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [currentInput, datas]);

  const handleDelete = async () => {
    try {
      if (isBook && selectedIds.length > 0) {
        const myBookIds = selectedIds.join(',');
        await bookAPI.deleteBookFromMyBook('1', myBookIds);

        // 삭제 후 목록에서 제거
        const updatedDatas = filteredDatas.filter(
          (data) => !selectedIds.includes(data.id),
        );
        setFilteredDatas(updatedDatas);
        setSelectedIds([]);
      }
    } catch (error) {
      console.error('삭제 중 오류가 발생했습니다:', error);
    }
  };

  const handleItemSelect = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((selectedId) => selectedId !== id);
      } else {
        return [...prev, id];
      }
    });
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

  return (
    <div className='absolute top-0 right-0  w-[444px] h-screen bg-[#FFFAFA] overflow-hidden rounded-tl-3xl rounded-bl-3xl z-10'>
      <div className='h-full pr-10 pl-11 pt-15 rounded-tl-3xl rounded-bl-3xl '>
        <span
          className={classNames(
            `text-center text-4xl  font-bold leading-normal`,
            isBook ? `text-[#2656CD]` : `text-[#7838AF]`,
          )}>
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
                src={search_icon}
                alt='검색창 로고'
              />
            </button>
          </div>
        </div>
        <ul className='flex flex-col h-full gap-6 pr-2 overflow-auto scrollbar '>
          {filteredDatas.map((data, index) => {
            return isEdit ? (
              <EditStatusItem
                key={index}
                data={data}
                isBook={isBook}
                isSelected={selectedIds.includes(data.id)}
                onSelect={() => handleItemSelect(data.id)}
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
