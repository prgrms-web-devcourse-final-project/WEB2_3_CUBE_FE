import PreferenceSettingCard from './PreferenceSettingCard';
import cdImg from "@assets/cd/cd.png";
import bookImg from "@assets/room/book.png";

export default function PreferenceSetting() {
  return (
    <div className='flex flex-col items-center justify-end w-full min-h-screen'>
      <div className='setting-gradient flex flex-row items-center justify-center gap-10 w-full h-[418px]'>
        <PreferenceSettingCard title={"음악"} thumbnail={cdImg} />
        <PreferenceSettingCard title={"도서"} thumbnail={bookImg} />
      </div>
    </div>
  );
}
