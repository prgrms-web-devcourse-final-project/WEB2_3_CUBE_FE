import backgroundIMG from '@/assets/roome-background-img.png';
import logo from '@/assets/header-logo.svg';
import TypingText from './TypingText';

const Loading = () => {
  return (
    <div
      className='gap-4 w-full h-screen item-row'
      style={{ backgroundImage: `url(${backgroundIMG})` }}>
      <img
        src={logo}
        alt='logo'
        className='w-80'
      />
      <TypingText
        text='Loading...'
        className='text-2xl font-medium text-white'
      />
    </div>
  );
};

export default Loading;
