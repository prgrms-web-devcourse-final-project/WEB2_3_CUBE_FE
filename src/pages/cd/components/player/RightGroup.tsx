import sufflesong from '@assets/cd/shuffle-icon.svg';
import cdList from '@assets/cd/music-list-icon.svg';
import homeIcon from '@assets/cd/home-icon.svg';
import { useNavigate } from 'react-router-dom';
import React from 'react';

interface RightProps {
  cdReady: CdReady;
  handleToggleLoop: () => void;
  setIsCdListOpen: (value: boolean) => void;
}
const RightGroup = React.memo(
  ({ cdReady, handleToggleLoop, setIsCdListOpen }: RightProps) => {
    const navigate = useNavigate();

    return (
      <article className='flex items-center gap-4 flex-1 justify-end'>
        <button
          onClick={handleToggleLoop}
          className={cdReady.isLooping ? 'opacity-100' : 'opacity-30'}>
          <img
            className='w-8'
            src={sufflesong}
            alt='cd 무한재생 버튼'
          />
        </button>

        <button onClick={() => navigate('/')}>
          <img
            className='w-8'
            src={homeIcon}
            alt='홈으로가기 버튼'
          />
        </button>

        <button onClick={() => setIsCdListOpen(true)}>
          <img
            className='w-8'
            src={cdList}
            alt='cd 목록 리스트 보여주는 버튼'
          />
        </button>
      </article>
    );
  },
);

export default RightGroup;
