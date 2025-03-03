import { addCdTemplate, updateTemplate } from '@apis/cd';
import { RefCallback, useActionState, useRef } from 'react';
import { useParams } from 'react-router-dom';

export default function EditTemplate({
  templateData,
  isEditable,
}: TemplateProps) {
  const myCdId = Number(useParams().cdId) || 0;
  const userId = Number(useParams().userId) || 0;

  const textAreaRefs = useRef<(HTMLTextAreaElement | null)[]>([]);

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
      const result = await addCdTemplate(myCdId, userId, contents);
      console.log(result);

      isEditable();
    } catch (error) {
      console.error(error);
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
      const result = await updateTemplate(myCdId, userId, contents);
      console.log(result);

      isEditable();
    } catch (error) {
      console.error(error);
    }
  };

  // const [error, submitAction, isPending] = useActionState(
  //   async (previousState, formData) => {
  //     const formValues = Object.fromEntries(formData.entries());
  //     const { motive, like, feeling, when } = formValues;

  //     const contents = {
  //       comment1: motive,
  //       comment2: like,
  //       comment3: feeling,
  //       comment4: when,
  //     };
  //     const error = await addCdTemplate(myCdId, userId, contents);
  //     if (error) {
  //       return error;
  //     }
  //     return null;
  //   },
  //   null,
  // );

  return (
    <>
      <form className='flex flex-col gap-14 overflow-auto h-full pr-3 scrollbar'>
        <button
          type='button'
          onClick={isEditable}
          className=' absolute top-4 right-24 rounded-[10px] text-[12px] font-semibold
         bg-white text-[#162C63] drop-shadow-logo px-6 py-2.5 hover:opacity-80'>
          취소
        </button>

        <button
          type='button'
          onClick={templateData ? handleUpdateTemplate : handleSubmitTemplate}
          className='absolute top-4 right-4 rounded-[10px] text-[12px] font-semibold
         bg-white text-[#162C63] drop-shadow-logo px-6 py-2.5 hover:opacity-80'>
          저장
        </button>

        <div>
          <h3 className='text-2xl font-bol border-b-2 border-[#FFFFFF33]  pb-4 mb-5  '>
            이 노래를 듣게 된 계기
          </h3>
          <textarea
            ref={(el: any) => (textAreaRefs.current[0] = el)}
            name='motive'
            defaultValue={`${templateData?.comment1 || ''}`}
            className='text-[16px] w-full h-[120px] resize-none rounded-[14px] bg-[#EDE6EE4D] 
            drop-shadow-logo border-2 border-white outline-0 px-5 py-4  '
          />
        </div>

        <div>
          <h3 className='text-2xl font-bol border-b-2 border-[#FFFFFF33] pb-4 mb-5 '>
            이 노래에서 가장 좋았던 부분
          </h3>
          <textarea
            ref={(el: any) => (textAreaRefs.current[1] = el)}
            name='like'
            defaultValue={`${templateData?.comment2 || ''}`}
            className='text-[16px] w-full h-[120px] resize-none rounded-[14px] bg-[#EDE6EE4D] 
            drop-shadow-logo border-2 border-white outline-0 px-5 py-4  '
          />
        </div>

        <div>
          <h3 className='text-2xl font-bol border-b-2 border-[#FFFFFF33] pb-4 mb-5 '>
            이 노래를 듣는 지금의 감정
          </h3>
          <textarea
            ref={(el: any) => (textAreaRefs.current[2] = el)}
            name='feeling'
            defaultValue={`${templateData?.comment3 || ''}`}
            className='text-[16px] w-full h-[120px] resize-none rounded-[14px] bg-[#EDE6EE4D] 
            drop-shadow-logo border-2 border-white outline-0 px-5 py-4  '
          />
        </div>

        <div>
          <h3 className='text-2xl font-bol border-b-2 border-[#FFFFFF33] pb-4 mb-5 '>
            어떨 때 자주 듣는 노래인가요?
          </h3>
          <textarea
            name='when'
            ref={(el: any) => (textAreaRefs.current[3] = el)}
            defaultValue={`${templateData?.comment4 || ''}`}
            className='text-[16px] w-full h-[120px] resize-none rounded-[14px] bg-[#EDE6EE4D] 
            drop-shadow-logo border-2 border-white outline-0 px-5 py-4  '
          />
        </div>
      </form>
    </>
  );
}
