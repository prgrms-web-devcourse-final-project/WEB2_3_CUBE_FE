import backgroundIMG from '@/assets/roome-background-img.png';
import errorStatus from '@/assets/error/404.svg';
import oops from '@/assets/error/oops.svg';
import doubleArrow from '@/assets/error/double-arrow-icon.svg';
import logo from '@/assets/header-logo.svg';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <section
      className='bg-cover bg-center bg-no-repeat h-screen item-middle text-white overflow-hidden'
      style={{ backgroundImage: `url(${backgroundIMG})` }}>
      <div className='item-row gap-10 h-full mt-10'>
        <h1>
          <img
            src={errorStatus}
            alt='404'
          />
        </h1>
        <img
          src={oops}
          alt='oops'
        />
        <p className='text-center'>
          "잘못된 문을 노크하셨나요?
          <br />
          다시 한 번 당신의 방을 찾아볼까요?"
        </p>
        <img
          src={doubleArrow}
          alt='double-arrow'
        />
        <Link to='/' className='mt-20'>
          <img
            src={logo}
            alt='logo'
          />
        </Link>
      </div>
    </section>
  );
};

export default NotFoundPage;
