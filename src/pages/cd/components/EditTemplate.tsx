import { useToastStore } from '@/store/useToastStore';
import { addCdTemplate, updateTemplate } from '@apis/cd';
import { RefCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';

export default function EditTemplate({
  templateData,
  questions,
  changeTemplateData,
  onToggleEdit,
}: TemplateProps) {
  const myCdId = Number(useParams().cdId) || 0;

  const textAreaRefs = useRef<(HTMLTextAreaElement | null)[]>([]);
  const showToast = useToastStore((state) => state.showToast);

  const setTextAreaRef =
    (index: number): RefCallback<HTMLTextAreaElement> =>
    (element) => {
      textAreaRefs.current[index] = element;
    };

  const handleSubmitTemplate = async () => {
    try {
      const contents = {
        comment1: textAreaRefs.current[0]?.value,
        comment2: textAreaRefs.current[1]?.value,
        comment3: textAreaRefs.current[2]?.value,
        comment4: textAreaRefs.current[3]?.value,
      };
      // 낙관적 업데이트
      changeTemplateData(contents);
      await addCdTemplate(myCdId, contents);
      showToast('음악 감상평이 등록되었어요!', 'success');
      onToggleEdit();
    } catch (error) {
      console.error(error);
      showToast('음악 감상평 등록에 실패했어요.', 'error');
      changeTemplateData(templateData);
    }
  };
  const handleUpdateTemplate = async () => {
    try {
      const contents = {
        comment1: textAreaRefs.current[0]?.value,
        comment2: textAreaRefs.current[1]?.value,
        comment3: textAreaRefs.current[2]?.value,
        comment4: textAreaRefs.current[3]?.value,
      };
      changeTemplateData(contents);
      await updateTemplate(myCdId, contents);
      showToast('음악 감상평을 수정했어요!', 'success');
      onToggleEdit();
    } catch (error) {
      console.error(error);
      showToast('음악 감상평 수정에 실패했어요.', 'error');
      changeTemplateData(templateData);
    }
  };

  return (
    <>
      <form className='flex flex-col gap-14 overflow-auto h-full w-[90%] pt-15 pb-10  '>
        <div className='flex items-center gap-2 absolute top-4 right-4 '>
          <button
            type='button'
            onClick={onToggleEdit}
            className='  2xl:right-24 rounded-md text-[10px] 2xl:text-[12px] font-semibold
          bg-white text-[#162C63] drop-shadow-logo   px-4 py-1.5  hover:opacity-80'>
            취소
          </button>

          <button
            type='button'
            onClick={templateData ? handleUpdateTemplate : handleSubmitTemplate}
            className=' rounded-md text-[10px] 2xl:text-[12px] font-semibold
          bg-white text-[#162C63] drop-shadow-logo  px-4 py-1.5 hover:opacity-80'>
            저장
          </button>
        </div>

        <section className='flex flex-col justify-around items-center gap-14  overflow-auto h-full pr-3 scrollbar scrollbar-white'>
          {questions.map((q, index) => (
            <article
              key={index}
              className='w-full max-w-[395px]'>
              <h3 className='  text-base  lg:text-lg  2xl:text-xl min-w-[200px]  font-bold border-b-2 border-[#FFFFFF33] pb-4 mb-5 '>
                {q.question}
              </h3>
              <textarea
                ref={setTextAreaRef(index)}
                name='motive'
                defaultValue={`${q.answer || ''}`}
                className='text-[16px] w-full h-[120px] text-white/70 resize-none rounded-[14px] bg-[#EDE6EE4D] 
            drop-shadow-logo border-2 border-white outline-0 px-5 py-4  '
              />
            </article>
          ))}
        </section>
      </form>
    </>
  );
}
