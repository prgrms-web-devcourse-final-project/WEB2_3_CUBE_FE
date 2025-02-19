interface ReviewTextFieldProps {
  title: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const ReviewTextField = ({ 
  title, 
  value, 
  onChange,
  placeholder = '내용을 입력해주세요.\n빈 칸으로 저장하면 해당 필드는 표시되지 않습니다.'
}: ReviewTextFieldProps) => {
  return (
    <div>
      <h2 className='text-lg font-semibold mb-2 text-[#162C63]'>
        {title}
      </h2>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className='w-full h-24 p-2 border rounded-md focus:outline-none resize-none'
      />
    </div>
  );
};

export default ReviewTextField;