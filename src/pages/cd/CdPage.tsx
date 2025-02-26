import backgroundIMG from '@/assets/roome-background-img.png';
import CdTemplate from './components/CdTemplate';
import CdInfo from './components/CdInfo';
import CdComment from './components/CdComment';
import CdPlayer from './components/CdPlayer';

export default function CdPage() {
  return (
    <div
      className={` flex flex-col justify-between bg-center bg-cover bg-no-repeat w-full h-screen`}
      style={{ backgroundImage: `url(${backgroundIMG})` }}>
      {/* 템플릿, CD이미지, 댓글 */}
      <div className='flex justify-center items-end gap-22   h-[87vh] px-22  pt-29 pb-19  '>
        <CdTemplate />
        <CdInfo />
        <CdComment />
      </div>
      {/* 플레이어 */}
      <CdPlayer />
    </div>
  );
}
