import logoOpacity from '@assets/cd/logo-opacity.png';

export default function EmptyTemplate() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='flex flex-col items-center justify-center gap-3.5'>
        <img
          className='w-[200px] h-[68px] '
          src={logoOpacity}
          alt='투명도 적용된 로고'
        />
        <span className='text-white font-semibold text-[16px]'>
          아직 작성되지 않은 템플릿입니다.
        </span>
      </div>
    </div>
  );
}
