import searchIcon from '@/assets/search-icon.svg';
import { useState } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  mainColor?: string;
  bgColor?: string;
}

export const SearchInput = ({
  value,
  onChange,
  placeholder,
  mainColor,
  bgColor = 'bg-gray-100',
}: SearchInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className='relative mb-5'>
      <input
        style={{
          borderColor: isFocused ? mainColor : 'transparent',
          borderWidth: '2px',
        }}
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={`w-full px-5 py-2.5 rounded-lg ${bgColor} placeholder-[#8B888A]/70 outline-none outline-[#2656CD]/60`}
      />
      <button className='absolute right-3 top-1/2 transform -translate-y-1/2'>
        <img
          src={searchIcon}
          alt='search'
        />
      </button>
    </div>
  );
};
