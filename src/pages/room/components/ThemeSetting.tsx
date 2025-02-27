import ThemeSettingCard from './ThemeSettingCard';

export default function ThemeSetting({themeData, selectedTheme, onThemeSelect}) {

  return (
    <div className='flex flex-col items-center justify-end w-full min-h-screen'>
      <div className='setting-gradient flex items-start 2xl:items-center justify-center 2xl:gap-10 gap-8 w-full h-[330px] 2xl:h-[418px] 2xl:pt-0 pt-10'>
      {Object.keys(themeData).map((theme) => (
          <ThemeSettingCard
            key={theme}
            theme={theme}
            themeData={themeData}
            isSelected={selectedTheme === theme}
            isLocked={themeData[theme].isLocked} 
            onClick={() => !themeData[theme].isLocked && onThemeSelect(theme)}
          />
        ))}
      </div>
    </div>
  );
}
