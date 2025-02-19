import { useEffect, useRef, useState } from 'react';

export default function SlidingTitle({ text }: { text: string }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const titleRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // 텍스트 길이가 10보다 길면 애니메이션 활성화
    if (text.length > 10) {
      setIsAnimating(true);

      // 요소 참조가 있고 작은 디바이스에서 실행 중이 아니라면 애니메이션 속도 조정
      if (titleRef.current && containerRef.current) {
        const titleElement = titleRef.current;
        const containerElement = containerRef.current;
        // 제목이 컨테이너보다 길면 애니메이션 속도 조정
        if (titleElement.scrollWidth > containerElement.offsetWidth) {
          // 너비에 맞게 애니메이션 속도 조정
          const speed = titleElement.scrollWidth / 150; // 픽셀당 속도 조정
          titleElement.style.animationDuration = `${speed}s`;
        }
      }
    } else {
      setIsAnimating(false);
    }

    return () => setIsAnimating(false);
  }, [text]);

  return (
    <div
      ref={containerRef}
      className='overflow-hidden whitespace-nowrap w-[427px]'>
      <h1
        ref={titleRef}
        className={`text-white text-[40px] font-bold inline-block ${
          isAnimating ? 'animate-slideTitle' : ''
        }`}>
        {text}
      </h1>
    </div>
  );
}
