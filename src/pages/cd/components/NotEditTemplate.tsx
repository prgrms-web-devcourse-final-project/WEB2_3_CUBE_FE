import EmptyTemplate from './EmptyTemplate';
import { deleteTemplate } from '@apis/cd';
import { useParams } from 'react-router-dom';
import { useUserStore } from '@/store/useUserStore';
import { useToastStore } from '@/store/useToastStore';

export default function NotEditTemplate({
  templateData,
  questions,
  onToggleEdit,
  changeTemplateData,
}: TemplateProps) {
  const myCdId = Number(useParams().cdId) || 0;
  const userId = Number(useParams().userId) || 0;
  // 방주인이 아니면 템플릿 작성 버튼은 있을 수 없음
  const user = useUserStore((state) => state.user);

  const myUserId = user.userId;

  const showToast = useToastStore((state) => state.showToast);

  const handleDeleteTemplate = async () => {
    try {
      changeTemplateData(null);
      const result = await deleteTemplate(myCdId);
      if (result.status === 204)
        showToast('음악 감상평이 삭제되었어요!', 'success');
    } catch (error) {
      showToast('음악 감상평 삭제에 실패했어요.', 'error');
      changeTemplateData(templateData);
    }
  };

  if (!templateData)
    return (
      <EmptyTemplate
        questions={questions}
        onToggleEdit={onToggleEdit}
      />
    );
  return (
    <section className='flex flex-col gap-14 overflow-auto h-full w-[90%] pt-15 pb-10'>
      {userId === myUserId && (
        <div className='flex items-center gap-2 absolute top-4 right-4'>
          <button
            onClick={onToggleEdit}
            className='  rounded-md  text-[10px] 2xl:text-[12px] font-semibold
         bg-white text-[#162C63] px-4 py-1.5  hover:opacity-80'>
            수정
          </button>

          <button
            type='button'
            onClick={handleDeleteTemplate}
            className=' rounded-md text-[10px] 2xl:text-[12px] font-semibold
         bg-white text-[#162C63]    px-4 py-1.5 hover:opacity-80'>
            삭제
          </button>
        </div>
      )}

      <section className='flex flex-col justify-around items-center gap-14  overflow-auto h-full pr-3  pb-10  scrollbar scrollbar-white'>
        {questions.map((q, index) => (
          <article
            key={index}
            className='w-full '>
            <h3 className='text-base lg:text-lg 2xl:text-xl min-w-[200px]  font-bold border-b-2 border-[#FFFFFF33] pb-4 mb-3 '>
              {q.question}
            </h3>
            <p className='text-sm 2xl:text-base w-full text-white/70  drop-shadow-logo  '>
              {q.answer}
            </p>
          </article>
        ))}
      </section>
    </section>
  );
}
