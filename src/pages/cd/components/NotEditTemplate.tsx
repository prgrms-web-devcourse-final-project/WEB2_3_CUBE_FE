import writeTemplate from '@/assets/cd/write-template.svg';
import EmptyTemplate from './EmptyTemplate';
import { deleteTemplate } from '@apis/cd';
import { useParams, useSearchParams } from 'react-router-dom';

export default function NotEditTemplate({
  templateData,
  isEditable,
}: TemplateProps) {
  const [searchParams] = useSearchParams();
  const myCdId = Number(useParams().myCdId) || 0;
  const userId = Number(searchParams.get('userId')) || 0;
  // 방주인이 아니면 템플릿 작성 버튼은 있을 수 없음

  const myUserId = 1;
  if (myUserId !== userId) return <EmptyTemplate />;

  const handleDeleteTemplate = async () => {
    try {
      const result = await deleteTemplate(myCdId, userId);

      if (result.status === 204) console.log('템플릿 삭제!');
    } catch (error) {
      console.error(error, '템플릿 삭제 실패!');
    }
  };
  return (
    <>
      {!templateData && (
        <button
          type='button'
          onClick={isEditable}>
          <img
            className='absolute top-6 right-6 w-8 h-8 cursor-pointer hover:opacity-60 '
            src={writeTemplate}
            alt='템플릿 작성 버튼'
          />
        </button>
      )}
      {templateData && (
        <>
          <button
            onClick={isEditable}
            className=' absolute top-4 right-24 rounded-[10px] text-[12px] font-semibold
         bg-white text-[#162C63] drop-shadow-logo px-6 py-2.5 hover:opacity-80'>
            수정
          </button>

          <button
            type='button'
            onClick={handleDeleteTemplate}
            className='absolute top-4 right-4 rounded-[10px] text-[12px] font-semibold
         bg-white text-[#162C63] drop-shadow-logo px-6 py-2.5 hover:opacity-80'>
            삭제
          </button>
        </>
      )}

      <section className='flex flex-col justify-around items-center gap-14  overflow-auto h-full pr-3 scrollbar'>
        <article className='w-full'>
          <h3 className='text-2xl font-bol border-b-2 border-[#FFFFFF33] pb-4 mb-5 '>
            이 노래를 듣게 된 계기
          </h3>
          <p className='text-[16px] w-full   drop-shadow-logo '>
            {templateData ? templateData.comment1 : ''}
          </p>
        </article>

        <article className='w-full'>
          <h3 className='text-2xl font-bol border-b-2 border-[#FFFFFF33] pb-4 mb-5 '>
            이 노래에서 가장 좋았던 부분
          </h3>
          <p className='text-[16px] w-full '>
            {templateData ? templateData.comment2 : ''}
          </p>
        </article>

        <article className='w-full'>
          <h3 className='text-2xl font-bol border-b-2 border-[#FFFFFF33] pb-4 mb-5 '>
            이 노래를 듣는 지금의 감정
          </h3>
          <p className='text-[16px] w-full '>
            {' '}
            {templateData ? templateData.comment3 : ''}
          </p>
        </article>

        <article className='w-full'>
          <h3 className='text-2xl font-bol border-b-2 border-[#FFFFFF33] pb-4 mb-5 '>
            어떨 때 자주 듣는 노래인가요?
          </h3>
          <p className='text-[16px] w-full '>
            {' '}
            {templateData ? templateData.comment4 : ''}
          </p>
        </article>
      </section>
    </>
  );
}
