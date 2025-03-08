import { useEffect, useRef, useState } from 'react';

export default function SlidingTitle({
  text,
  width,
}: {
  text: string;
  width: number;
}) {
  const [isAnimating, setIsAnimating] = useState(false);
  const titleRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!titleRef.current || !containerRef.current) return;

    // DOM 업데이트 후 정확한 크기 비교를 위해 setTimeout 사용
    const titleElement = titleRef.current!;
    const containerElement = containerRef.current!;

    // 제목이 부모보다 클 경우 애니메이션 적용
    if (titleElement.scrollWidth > containerElement.offsetWidth) {
      setIsAnimating(true);
      const speed = titleElement.scrollWidth / 70; // 애니메이션 속도 조정
      titleElement.style.animationDuration = `${speed}s`;
    } else {
      setIsAnimating(false);
    }

    return () => {
      setIsAnimating(false);
    };
  }, [text, width]);

  return (
    <div
      ref={containerRef}
      style={{ width: `${width}px` }} // ✅ Tailwind 대신 style 적용
      className='overflow-hidden whitespace-nowrap items-center h-[60px] relative'>
      <h1
        ref={titleRef}
        className={`text-white text-[25px] xl:text-[30px] 2xl:text-[40px] font-bold inline-block ${
          isAnimating
            ? 'animate-slideTitle absolute top-0 right-0 z-[5]'
            : 'relative'
        }`}>
        {text}
      </h1>
    </div>
  );
}
