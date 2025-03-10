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
  // 방주인이 아니면 템플릿 작성 버튼은 있을 수 없음
  const user = useUserStore((state) => state.user);

  const myUserId = user.userId;

  const questions = [
    { question: '이 노래를 듣게 된 계기', answer: templateData?.comment1 },
    {
      question: '이 노래에서 가장 좋았던 부분',
      answer: templateData?.comment2,
    },
    { question: '이 노래를 듣는 지금의 감정', answer: templateData?.comment3 },
    {
      question: '어떨 때 자주 듣는 노래인가요?',
      answer: templateData?.comment4,
    },
  ];

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

  if (!templateData)
    return (
      <EmptyTemplate
        questions={questions}
        onToggleEdit={onToggleEdit}
      />
    );
  return (
    <>
      {userId === myUserId && (
        <div className='flex items-center gap-2 absolute top-4 right-4'>
          <button
            onClick={onToggleEdit}
            className='  rounded-[10px]  text-[10px] 2xl:text-[12px] font-semibold
         bg-white text-[#162C63]  2xl:px-6 2xl:py-2.5  px-4 py-1.5  hover:opacity-80'>
            수정
          </button>

          <button
            type='button'
            onClick={handleDeleteTemplate}
            className=' rounded-[10px] text-[10px] 2xl:text-[12px] font-semibold
         bg-white text-[#162C63]   2xl:px-6 2xl:py-2.5  px-4 py-1.5 hover:opacity-80'>
            삭제
          </button>
        </div>
      )}

      <section className='flex flex-col justify-around items-center gap-14  overflow-auto h-full pr-3 scrollbar'>
        {questions.map((q, index) => (
          <article
            key={index}
            className='w-full '>
            <h3 className=' text-[16px]  lg:text-[20px]  2xl:text-2xl min-w-[200px]  font-bol border-b-2 border-[#FFFFFF33] pb-4 mb-5 '>
              {q.question}
            </h3>
            <p className='text-[14px] 2xl:text-[16px] w-full   drop-shadow-logo  '>
              {q.answer}
            </p>
          </article>
        ))}
      </section>
    </>
  );
}
