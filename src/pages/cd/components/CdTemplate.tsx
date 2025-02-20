import React, { useState } from 'react';
import NotEditTemplate from './NotEditTemplate';
import EditTemplate from './EditTemplate';

export default function CdTemplate() {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div
      className='w-[30%]  text-white rounded-3xl border-2   border-[#FCF7FD]
     bg-[#3E507D1A] backdrop-blur-lg shadow-box h-full px-12 py-18 '>
      {isEdit ? (
        <EditTemplate isEditable={() => setIsEdit(!isEdit)} />
      ) : (
        <NotEditTemplate isEditable={() => setIsEdit(!isEdit)} />
      )}
    </div>
  );
}
