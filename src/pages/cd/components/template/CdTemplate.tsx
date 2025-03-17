import React, { useEffect, useState } from 'react';
import NotEditTemplate from './NotEditTemplate';
import EditTemplate from './EditTemplate';
import { getCdTemplate } from '@apis/cd';
import { useParams } from 'react-router-dom';

const CdTemplate = React.memo(() => {
  const [isEdit, setIsEdit] = useState(false);
  const [templateData, setTemplateData] = useState<TemplateData>(null);
  const myCdId = Number(useParams().cdId);

  // console.log('cdTemplate'); 리렌더링 안됨

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

  useEffect(() => {
    const fetchTemplateData = async () => {
      try {
        const templateData = await getCdTemplate(myCdId);
        setTemplateData(templateData);
      } catch (error) {
        // console.error(error, '템플릿을 작성해주세요!');
        setTemplateData(null);
      }
    };
    fetchTemplateData();
  }, [myCdId]);

  return (
    <div
      // pl-12 pr-5 py-15
      className='w-[32%]  text-white rounded-3xl border-2   border-[#FCF7FD]
     bg-[#3E507D1A] backdrop-blur-lg shadow-box h-full flex justify-center items-center  relative  '>
      {isEdit ? (
        <EditTemplate
          questions={questions}
          templateData={templateData}
          changeTemplateData={setTemplateData}
          onToggleEdit={() => setIsEdit(!isEdit)}
        />
      ) : (
        <NotEditTemplate
          questions={questions}
          changeTemplateData={setTemplateData}
          templateData={templateData}
          onToggleEdit={() => setIsEdit(!isEdit)}
        />
      )}
    </div>
  );
});

export default CdTemplate;
