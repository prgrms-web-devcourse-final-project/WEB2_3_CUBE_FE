import { useState } from "react";
import { guestbookAPI } from "../../../apis/guestbook";
import LayeredButton from "../../../components/LayeredButton";
import { useUserStore } from "../../../store/useUserStore";

export default function GusetbookInput({roomId}) {
  const [guestMessage, setGuestMessage] = useState('');
  const user = useUserStore((state) => state.user);

  const submitMessage = async () => {
    if(guestMessage.trim() === "") return;

    try{
      const newMessage = await guestbookAPI.createGuestbook(roomId, user.userId, guestMessage)
      console.log('방명록 등록 성공:', newMessage);
      setGuestMessage('');
    } catch (error) {
      console.error('방명록 등록 중 오류 발생:', error)
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitMessage();
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await submitMessage();
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    if(input.length > 180){
      setGuestMessage(input.slice(0, 180));
    } else {
      setGuestMessage(input);
    }
  }

  return (
    <form 
      className="@container flex items-start w-full gap-2"
      aria-label="방명록 작성"  
      onSubmit={handleSubmit}
    > 
      <label htmlFor="guestMessage" className="sr-only">방명록 메시지</label>
      <textarea 
        id="guestMessage"
        name="guestMessage"
        aria-required="true"
        className={`inputBase flex-grow h-20 @xl:h-28 p-3 @xl:p-5 resize-none overflow-y-auto`}
        placeholder="당신의 흔적을 남겨보세요 φ(゜▽゜*)♪"
        maxLength={180}
        value={guestMessage}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
      />
      {/* 확인 버튼 */}
      <LayeredButton 
        onClick={submitMessage}
        aria-label="방명록 작성 완료"
        type="submit"
        children={"확인"} 
        className="w-20 h-18 @xl:h-26 @xl:w-26" />
    </form>
  )
}
