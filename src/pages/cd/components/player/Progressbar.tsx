import React, { useEffect, useRef } from 'react';

export default function Progressbar({
  cdPlayer,
  progressStyle,
  volumeProgressStyle,
  handleChangeTime,
}) {
  // 현재 시간 툴팁(호버할때마다 리렌더링되는것을 막기위해 직접 DOM조작)
  const progressBarRef = useRef(null);
  const tooltipRef = useRef(null);

  // 시간 포맷팅 함수
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    const bar = progressBarRef.current;
    const tooltip = tooltipRef.current;
    if (!bar || !tooltip) return;

    const handleMouseMove = (e) => {
      const rect = bar.getBoundingClientRect();
      const position = ((e.clientX - rect.left) / rect.width) * 100;
      const time = (position / 100) * cdPlayer.duration;
      tooltip.textContent = formatTime(time);
      tooltip.style.left = `calc(${position}% - 20px)`;
      tooltip.style.display = 'block';
    };

    const handleMouseEnter = () => {
      tooltip.style.display = 'block';
    };

    const handleMouseLeave = () => {
      tooltip.style.display = 'none';
    };
    bar.addEventListener('mousemove', handleMouseMove);
    bar.addEventListener('mouseenter', handleMouseEnter);
    bar.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      bar.removeEventListener('mousemove', handleMouseMove);
      bar.removeEventListener('mouseenter', handleMouseEnter);
      bar.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cdPlayer.duration]);

  return (
    <>
      {/* 진행 시간 */}
      <style>
        {`
            .progress-range::-webkit-slider-runnable-track {
              width: 100%;
              height: 10px;
              cursor: pointer;
              background: ${progressStyle.background};
              border-radius: 1px;
            }
           .progress-range:focus::-webkit-slider-runnable-track {
              background: ${progressStyle.background};
            }
          .volume-range::-webkit-slider-runnable-track {
            width: 85px;
            height: 4px;
            cursor: pointer;
            background: ${volumeProgressStyle.background};
            border-radius: 1.3px;
          }
          .volume-range:focus::-webkit-slider-runnable-track {
            background: ${volumeProgressStyle.background};
          }
          `}
      </style>
      <input
        type='range'
        min='0'
        max='100'
        ref={progressBarRef}
        value={cdPlayer.progress}
        onChange={handleChangeTime}
        className=' progress-range h-[17px] block'
      />
      <div
        ref={tooltipRef}
        className='absolute top-[-40px] bg-gray-800 text-white px-2 py-1 rounded text-xs'
        style={{ display: 'none' }}
      />
    </>
  );
}
