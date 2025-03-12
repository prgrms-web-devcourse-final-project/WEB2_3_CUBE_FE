import { useRef, useState } from 'react';
import LayeredButton from '../../../components/LayeredButton';

export default function GusetbookInput({ onSubmitMessage }) {
  const [guestMessage, setGuestMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();

    if (isSubmitting || guestMessage.trim() === '') return;

    try {
      setIsSubmitting(true);
      await onSubmitMessage(guestMessage);
      setGuestMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();

      formRef.current?.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true }),
      );
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    setGuestMessage(input.length > 180 ? input.slice(0, 180) : input);
  };

  return (
    <form
      ref={formRef}
      className='@container flex items-start w-full mb-0 gap-2 relative'
      aria-label='방명록 작성'
      onSubmit={handleSubmit}>
      {/* 글자 수 표시 */}
      <div
        className={`absolute bottom-2 right-25 text-xs @xl:text-sm ${
          guestMessage.length === 180 ? 'text-[#CE317A]' : 'text-gray-500/70'
        }`}>
        {guestMessage.length} / 180
      </div>
      <label
        htmlFor='guestMessage'
        className='sr-only'>
        방명록 메시지
      </label>
      <textarea
        id='guestMessage'
        name='guestMessage'
        aria-required='true'
        className={`inputBase flex-grow h-20 @xl:h-28 p-3 @xl:p-5 resize-none overflow-y-auto scrollbar`}
        placeholder='당신의 흔적을 남겨보세요 φ(゜▽゜*)♪'
        maxLength={180}
        value={guestMessage}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
      />
      {/* 확인 버튼 */}
      <LayeredButton
        containerClassName='w-fit'
        onClick={() => handleSubmit()}
        aria-label='방명록 작성 완료'
        type='button'
        disabled={isSubmitting}
        children={'확인'}
        className='w-20 h-18 @xl:h-26 @xl:w-26'
      />
    </form>
  );
}
