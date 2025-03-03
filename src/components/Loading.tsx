import backgroundIMG from '@/assets/roome-background-img.png';
import logo from '@/assets/header-logo.svg';
import TypingText from './TypingText';

const Loading = () => {
  return (
    <div
      className='flex justify-center items-center w-full h-screen'
      style={{ backgroundImage: `url(${backgroundIMG})` }}>
      <img
        src={logo}
        alt='logo'
      />
      <TypingText
        text='Loading...'
        className='text-4xl font-bold text-white'
      />
    </div>
  );
};

export default Loading;
