import { useState } from "react";
import LayeredButton from "../../../components/LayeredButton";

export default function GusetbookInput({onSubmitMessage }) {
  const [guestMessage, setGuestMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLTextAreaElement> ) => {
    e.preventDefault();
    if (guestMessage.trim() !== "") {
      onSubmitMessage(guestMessage);
      setGuestMessage("");
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    setGuestMessage(input.length > 180 ? input.slice(0, 180) : input);
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
        onClick={handleSubmit}
        aria-label="방명록 작성 완료"
        type="submit"
        children={"확인"} 
        className="w-20 h-18 @xl:h-26 @xl:w-26" />
    </form>
  )
}
