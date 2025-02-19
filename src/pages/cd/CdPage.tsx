import DataList from '@components/datalist/DataList';
import React, { useState } from 'react';

export default function CdPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const dummyData = [
    {
      title: '삐딱하게',
      singer: '권지용',
      released_year: '2019',
    },
    {
      title: '삐딱하게',
      singer: '권지용',
      released_year: '2019',
    },
    {
      title: '삐딱하게',
      singer: '권지용',
      released_year: '2019',
    },
    {
      title: '삐딱하게',
      singer: '권지용',
      released_year: '2019',
    },
    {
      title: '삐딱하게',
      singer: '권지용',
      released_year: '2019',
    },
    {
      title: '삐딱하게',
      singer: '권지용',
      released_year: '2019',
    },
    {
      title: '삐딱하게',
      singer: '권지용',
      released_year: '2019',
    },
  ];
  return (
    <>
      <div>CdPage</div>
      <button onClick={() => setIsSidebarOpen(true)}>사이드바 열기</button>
      {isSidebarOpen && (
        <DataList
          type='book'
          datas={dummyData}
        />
      )}
    </>
  );
}
