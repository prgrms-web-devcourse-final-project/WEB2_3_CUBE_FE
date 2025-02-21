import searchIcon from '@/assets/search-icon.svg';
import { useState } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  mainColor?: string;
}

export const SearchInput = ({
  value,
  onChange,
  placeholder,
  mainColor,
}: SearchInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className='relative mb-4'>
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
        className='w-full p-3 rounded-lg bg-gray-100 placeholder-[#8B888A]/70 outline-none'
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
