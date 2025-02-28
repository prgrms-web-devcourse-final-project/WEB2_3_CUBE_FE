import { useEffect, useRef, useState } from "react";

interface TypingTextProps {
  text: string;
  speed?: number;
  pauseTime?: number;
  className?: string; 
}

export default function TypingText({ text, speed = 100, pauseTime = 1000, className = "" }: TypingTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteSpeedRef = useRef(speed);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateText = () => {
      if (!isDeleting) {
        if (index < text.length) {
          setIndex((prev) => prev + 1);
        } else {
          timeoutRef.current = setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (index > 0) {
          setIndex((prev) => prev - 1);
          deleteSpeedRef.current = Math.max(speed * 0.5, deleteSpeedRef.current * 0.8); 
        } else {
          deleteSpeedRef.current = speed; 
          timeoutRef.current = setTimeout(() => setIsDeleting(false), speed * 2);
        }
      }
      setDisplayText(text.slice(0, index));
    };

    timeoutRef.current = setTimeout(updateText, isDeleting ? deleteSpeedRef.current : speed);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index, isDeleting, text, speed, pauseTime]);

  return <p className={`text-[#4B6BBA] text-xs font-semibold ${className}`}>{displayText}</p>;
}
