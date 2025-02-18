import ThemeSettingCard from "./ThemeSettingCard";

export default function ThemeSetting() {
  return (
    <div className='flex flex-col items-center justify-end w-full min-h-screen'>
      <div className='setting-gradient flex flex-row items-center justify-center gap-10 w-full h-[418px]'>
        <ThemeSettingCard />
        <ThemeSettingCard />
        <ThemeSettingCard />
      </div>
    </div>
  );
}
