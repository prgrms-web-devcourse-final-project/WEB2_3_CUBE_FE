import searchIcon from '@/assets/search-icon.svg'

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export const SearchInput = ({ value, onChange, placeholder }: SearchInputProps) => {
  return (
    <div className="relative mb-4">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-3 rounded-lg border-none bg-gray-100 placeholder-[#8B888A]/70"
      />
      <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
        <img src={searchIcon} alt='search' />
      </button>
    </div>
  );
};