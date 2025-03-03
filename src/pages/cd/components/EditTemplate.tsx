import { useToastStore } from '@/store/useToastStore';
import { addCdTemplate, updateTemplate } from '@apis/cd';
import { RefCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';

export default function EditTemplate({
  templateData,
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
      const result = await addCdTemplate(myCdId, contents);
      showToast('음악 감상평이 등록되었습니다.', 'success');
      onToggleEdit();
    } catch (error) {
      console.error(error);
      showToast('음악 감상평 등록에 실패하였습니다.', 'error');
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
      const result = await updateTemplate(myCdId, contents);
      showToast('음악 감상평을 수정하였습니다.', 'success');
      onToggleEdit();
    } catch (error) {
      console.error(error);
      showToast('음악 감상평 수정에 실패하였습니다.', 'error');
      changeTemplateData(templateData);
    }
  };

  return (
    <>
      <form className='flex flex-col gap-14 overflow-auto h-full  '>
        <button
          type='button'
          onClick={onToggleEdit}
          className=' absolute top-4 right-20 2xl:right-24 rounded-[10px]  text-[10px] 2xl:text-[12px] font-semibold
          bg-white text-[#162C63] drop-shadow-logo xl:px-6 xl:py-2.5  px-4 py-1.5  hover:opacity-80'>
          취소
        </button>

        <button
          type='button'
          onClick={templateData ? handleUpdateTemplate : handleSubmitTemplate}
          className='absolute top-4 right-4 rounded-[10px] text-[10px] 2xl:text-[12px] font-semibold
          bg-white text-[#162C63] drop-shadow-logo xl:px-6 xl:py-2.5  px-4 py-1.5 hover:opacity-80'>
          저장
        </button>

        <section className='flex flex-col justify-around items-center gap-14  overflow-auto h-full pr-3 scrollbar'>
          <article className='w-full max-w-[395px]'>
            <h3 className=' text-[16px]  lg:text-[20px]  2xl:text-2xl min-w-[200px]  font-bol border-b-2 border-[#FFFFFF33] pb-4 mb-5 '>
              이 노래를 듣게 된 계기
            </h3>
            <textarea
              ref={setTextAreaRef(0)}
              name='motive'
              defaultValue={`${templateData?.comment1 || ''}`}
              className='text-[16px] w-full h-[120px] resize-none rounded-[14px] bg-[#EDE6EE4D] 
            drop-shadow-logo border-2 border-white outline-0 px-5 py-4  '
            />
          </article>

          <article className='w-full max-w-[395px]'>
            <h3 className=' text-[16px]  lg:text-[20px]  2xl:text-2xl min-w-[200px]  font-bol border-b-2 border-[#FFFFFF33] pb-4 mb-5 '>
              이 노래에서 가장 좋았던 부분
            </h3>
            <textarea
              ref={setTextAreaRef(1)}
              name='like'
              defaultValue={`${templateData?.comment2 || ''}`}
              className='text-[16px] w-full h-[120px] resize-none rounded-[14px] bg-[#EDE6EE4D] 
            drop-shadow-logo border-2 border-white outline-0 px-5 py-4  '
            />
          </article>

          <article className='w-full max-w-[395px]'>
            <h3 className=' text-[16px]  lg:text-[20px]  2xl:text-2xl min-w-[200px]  font-bol border-b-2 border-[#FFFFFF33] pb-4 mb-5 '>
              이 노래를 듣는 지금의 감정
            </h3>
            <textarea
              ref={setTextAreaRef(2)}
              name='feeling'
              defaultValue={`${templateData?.comment3 || ''}`}
              className='text-[16px] w-full h-[120px] resize-none rounded-[14px] bg-[#EDE6EE4D] 
            drop-shadow-logo border-2 border-white outline-0 px-5 py-4  '
            />
          </article>

          <article className='w-full max-w-[395px]'>
            <h3 className=' text-[16px]  lg:text-[20px]  2xl:text-2xl min-w-[200px]  font-bol border-b-2 border-[#FFFFFF33] pb-4 mb-5 '>
              어떨 때 자주 듣는 노래인가요?
            </h3>
            <textarea
              name='when'
              ref={setTextAreaRef(3)}
              defaultValue={`${templateData?.comment4 || ''}`}
              className='text-[16px] w-full h-[120px] resize-none rounded-[14px] bg-[#EDE6EE4D] 
            drop-shadow-logo border-2 border-white outline-0 px-5 py-4  '
            />
          </article>
        </section>
      </form>
    </>
  );
}
