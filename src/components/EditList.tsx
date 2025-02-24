export default function EditList() {
  return (
    <div className='w-[200px] h-screen bg-black '>
      <span>PlayList</span>

      <div className='flex flex-col items-center justify-center gap-4 '>
        <span>총 13개</span>
        <button>편집</button>
      </div>

      <input
        type='text'
        placeholder='어떤 것이든 검색해보세요!'
      />

      <ul>
        <li>
          <span>우리의 노래</span>
          <span>권지용</span>
        </li>
        <li>
          <span>우리의 노래</span>
          <span>권지용</span>
        </li>
        <li>
          <span>우리의 노래</span>
          <span>권지용</span>
        </li>
        <li>
          <span>우리의 노래</span>
          <span>권지용</span>
        </li>
      </ul>
    </div>
  );
}
