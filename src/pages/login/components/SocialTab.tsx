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

  const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
  const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
  const NAVER_REDIRECT_URI = import.meta.env.VITE_NAVER_REDIRECT_URI;
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}`;

  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const GOOGLE_REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${GOOGLE_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${GOOGLE_REDIRECT_URI}`;

  const handleKakaoLogin = () => {
    window.location.href = 'http://3.39.182.150/oauth2/authorization/kakao';
  };

  const handleNaverLogin = () => {
    window.location.href = NAVER_AUTH_URL;
  };

  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL;
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
        all-200-eio hover:bg-white hover:text-[#06BE34] '>
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
