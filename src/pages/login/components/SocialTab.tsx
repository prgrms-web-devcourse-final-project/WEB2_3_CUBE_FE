import { useState } from 'react';
import login_logo from '@assets/login/login-logo.svg';
import kakao from '@assets/login/kakao-logo.svg';
import kakao_hover from '@assets/login/kakao-hover.svg';
import naver from '@assets/login/naver-logo.svg';
import naver_hover from '@assets/login/naver-hover.svg';

import google from '@assets/login/google-logo.svg';

export default function SocialTab() {
  const [kakaoImage, setKakaoImage] = useState(kakao);
  const [naverImage, setNaverImage] = useState(naver);

  const handleKakaoLogin = () => {
    window.location.href = `${
      import.meta.env.VITE_AUTH_URL
    }/oauth2/authorization/kakao`;
  };

  const handleNaverLogin = () => {
    window.location.href = `${
      import.meta.env.VITE_AUTH_URL
    }/oauth2/authorization/naver`;
  };

  const handleGoogleLogin = () => {
    window.location.href =
      'http://ec2-3-39-182-150.ap-northeast-2.compute.amazonaws.com/oauth/callback/google';
    // 'http://3.39.182.150/oauth2/authorization/google';
  };
  return (
    <div className='flex flex-col  items-center rounded-3xl h-full bg-[#FCF7FD66] backdrop-blur-lg'>
      <div className='pt-24'>
        <img
          src={login_logo}
          alt='RoomE 로고'
        />
      </div>

      <div className='mt-4 mb-12'>
        <span className='text-[#FFFFFFCC]  text-lg '>
          이 공간이 곧 나, 나만의 디지털 룸 프로젝트
        </span>
      </div>

      <div className='flex flex-col gap-5 items-center'>
        <button
          onClick={handleKakaoLogin}
          onMouseEnter={() => setKakaoImage(kakao_hover)}
          onMouseLeave={() => setKakaoImage(kakao)}
          className='item-middle gap-3.5 bg-[#FAE100] rounded-[40px] p-3 w-[360px] h-full
         shadow-logo cursor-pointer
        all-200-eio hover:bg-[#261C07] hover:text-[#FAD400]'>
          <img
            src={kakaoImage}
            alt='카카오로 로그인'
          />
          <span>카카오로 시작하기</span>
        </button>
        <button
          onClick={handleNaverLogin}
          onMouseEnter={() => setNaverImage(naver_hover)}
          onMouseLeave={() => setNaverImage(naver)}
          className='item-middle gap-[14px] bg-[#06BE34] rounded-[40px] p-3 w-[360px]
        shadow-logo cursor-pointer
        all-200-eio hover:bg-white hover:text-[#06BE34] text-white '>
          <img
            src={naverImage}
            alt='네이버로 로그인'
          />
          <span>네이버로 시작하기</span>
        </button>
        <button
          onClick={handleGoogleLogin}
          style={{ boxShadow: 'var(--shadow-logo)' }}
          className='item-middle gap-[14px] bg-[#FFFFFF] rounded-[40px] p-3 w-[360px]
        shadow-logo cursor-pointer
        all-200-eio hover:bg-[#2A3A5E] hover:text-white'>
          <img
            src={google}
            alt='구글로 로그인'
          />
          <span>Google로 시작하기</span>
        </button>
      </div>
    </div>
  );
}
