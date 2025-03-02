import { useEffect, useRef, useState } from 'react';

export default function SlidingTitle({ text }: { text: string }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const titleRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!titleRef.current || !containerRef.current) return;

    const titleElement = titleRef.current;
    const containerElement = containerRef.current;

    // 제목이 컨테이너보다 클 경우에만 애니메이션 적용
    if (titleElement.scrollWidth > containerElement.offsetWidth) {
      setIsAnimating(true);
      const speed = titleElement.scrollWidth / 100; // 픽셀당 속도 조정
      titleElement.style.animationDuration = `${speed}s`;
    } else {
      setIsAnimating(false);
    }

    return () => setIsAnimating(false);
  }, [text]);

  return (
    <div
      ref={containerRef}
      className='truncate w-[200px] xl:w-[300px] 2xl:w-[470px] h-[60px] relative '>
      <h1
        ref={titleRef}
        className={` text-white text-[25px]  xl:text-[30px]   2xl:text-[40px] font-bold inline-block  ${
          isAnimating
            ? ' animate-slideTitle absolute top-0 right-0 z-[5] '
            : 'relative '
        }`}>
        {text}
      </h1>
    </div>
  );
}
