import writeTemplate from '@/assets/cd/write-template.svg';
import EmptyTemplate from './EmptyTemplate';
import { deleteTemplate } from '@apis/cd';
import { useParams } from 'react-router-dom';
import { useUserStore } from '@/store/useUserStore';
import { useToastStore } from '@/store/useToastStore';

export default function NotEditTemplate({
  templateData,
  onToggleEdit,
  changeTemplateData,
}: TemplateProps) {
  const myCdId = Number(useParams().cdId) || 0;
  const userId = Number(useParams().userId) || 0;

  // console.log(templateData);

  // 방주인이 아니면 템플릿 작성 버튼은 있을 수 없음
  const user = useUserStore((state) => state.user);

  const myUserId = user.userId;
  const showToast = useToastStore((state) => state.showToast);

  const handleDeleteTemplate = async () => {
    try {
      changeTemplateData(null);
      const result = await deleteTemplate(myCdId);
      if (result.status === 204)
        showToast('음악 감상평이 삭제되었습니다.', 'success');
    } catch (error) {
      console.error(error, '템플릿 삭제 실패!');
      showToast('음악 감상평 삭제에 실패했습니다.', 'error');
      changeTemplateData(templateData);
    }
  };

  if (myUserId !== userId) return <EmptyTemplate />;
  return (
    <>
      {!templateData && (
        <button
          type='button'
          onClick={onToggleEdit}>
          <img
            className='absolute top-6 right-6 w-8 h-8  cursor-pointer hover:opacity-60 '
            src={writeTemplate}
            alt='템플릿 작성 버튼'
          />
        </button>
      )}
      {templateData && (
        <>
          <button
            onClick={onToggleEdit}
            className=' absolute top-4 right-20 2xl:right-24 rounded-[10px]  text-[10px] 2xl:text-[12px] font-semibold
         bg-white text-[#162C63] drop-shadow-logo xl:px-6 xl:py-2.5  px-4 py-1.5  hover:opacity-80'>
            수정
          </button>

          <button
            type='button'
            onClick={handleDeleteTemplate}
            className='absolute top-4 right-4 rounded-[10px] text-[10px] 2xl:text-[12px] font-semibold
         bg-white text-[#162C63] drop-shadow-logo xl:px-6 xl:py-2.5  px-4 py-1.5 hover:opacity-80'>
            삭제
          </button>
        </>
      )}

      <section className='flex flex-col justify-around items-center gap-14  overflow-auto h-full pr-3 scrollbar'>
        <article className='w-full max-w-[395px]'>
          <h3 className=' text-[16px]  lg:text-[20px]  2xl:text-2xl min-w-[200px]  font-bol border-b-2 border-[#FFFFFF33] pb-4 mb-5 '>
            이 노래를 듣게 된 계기
          </h3>
          <p className='text-[14px] 2xl:text-[16px] w-full   drop-shadow-logo  '>
            {templateData ? templateData.comment1 : ''}
          </p>
        </article>

        <article className='w-full max-w-[395px] '>
          <h3 className=' text-[16px]  lg:text-[20px]  2xl:text-2xl min-w-[200px]  font-bol border-b-2 border-[#FFFFFF33] pb-4 mb-5 '>
            이 노래에서 가장 좋았던 부분
          </h3>
          <p className='text-[14px] 2xl:text-[16px] w-full  drop-shadow-logo   '>
            {templateData ? templateData.comment2 : ''}
          </p>
        </article>

        <article className='w-full max-w-[395px]'>
          <h3 className=' text-[16px]  lg:text-[20px]  2xl:text-2xl min-w-[200px]  font-bol border-b-2 border-[#FFFFFF33] pb-4 mb-5 '>
            이 노래를 듣는 지금의 감정
          </h3>
          <p className='text-[14px] 2xl:text-[16px] w-full   drop-shadow-logo  '>
            {templateData ? templateData.comment3 : ''}
          </p>
        </article>

        <article className='w-full'>
          <h3 className=' text-[16px]  lg:text-[20px]  2xl:text-2xl min-w-[200px]  font-bol border-b-2 border-[#FFFFFF33] pb-4 mb-5 '>
            어떨 때 자주 듣는 노래인가요?
          </h3>
          <p className='text-[14px] 2xl:text-[16px] w-full   drop-shadow-logo  '>
            {templateData ? templateData.comment4 : ''}
          </p>
        </article>
      </section>
    </>
  );
}
