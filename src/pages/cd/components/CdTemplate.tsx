import React, { useEffect, useState } from 'react';
import NotEditTemplate from './NotEditTemplate';
import EditTemplate from './EditTemplate';
import { getCdTemplate } from '@apis/cd';
import { useParams } from 'react-router-dom';
import Loading from '@components/Loading';

const CdTemplate = React.memo(() => {
  const [isEdit, setIsEdit] = useState(false);
  const [templateData, setTemplateData] = useState<TemplateData>(null);
  const [isLoading, setIsLoading] = useState(true);
  const myCdId = Number(useParams().cdId);

  useEffect(() => {
    const fetchTemplateData = async () => {
      try {
        const templateData = await getCdTemplate(myCdId);
        setTemplateData(templateData);
      } catch (error) {
        // console.error(error, '템플릿을 작성해주세요!');
        setTemplateData(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTemplateData();
  }, [myCdId]);

  if (isLoading) return <Loading />;
  return (
    <div
      className='w-[32%]  text-white rounded-3xl border-2   border-[#FCF7FD]
     bg-[#3E507D1A] backdrop-blur-lg shadow-box h-full pl-12 pr-8 py-15  relative  '>
      {isEdit ? (
        <EditTemplate
          templateData={templateData}
          changeTemplateData={setTemplateData}
          onToggleEdit={() => setIsEdit(!isEdit)}
        />
      ) : (
        <NotEditTemplate
          changeTemplateData={setTemplateData}
          templateData={templateData}
          onToggleEdit={() => setIsEdit(!isEdit)}
        />
      )}
    </div>
  );
});

export default CdTemplate;
