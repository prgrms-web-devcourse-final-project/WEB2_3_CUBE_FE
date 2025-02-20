import LayeredButton from "../../../components/LayeredButton";

export default function GusetbookInput() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
      />
      {/* 확인 버튼 */}
      <LayeredButton 
        aria-label="방명록 작성 완료"
        type="submit"
        children={"확인"} 
        className="w-20 h-18 @xl:h-26 @xl:w-26" />
    </form>
  )
}
