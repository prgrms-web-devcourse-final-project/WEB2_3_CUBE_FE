export default function PreferenceSettingCard({title, thumbnail}) {
  const isMusic = title === '음악';

  return (
    <section
      className={`
        w-full max-w-[calc(100vw*0.265)] h-full max-h-[calc(100vw*0.143)] min-w-[384px] min-h-[212px]
      bg-[#FCF7FD]/20 border-2 border-[#FCF7FD] backdrop-blur-2xl rounded-3xl
        drop-shadow-modal flex items-center justify-center p-2
    `}>
      <article
        className={`w-full h-full rounded-2xl bg-[#FCF7FD] p-11 flex place-content-center`}>
        {/* 선택 카드 내용 */}
        <div className='flex flex-row items-center gap-7 2xl:gap-12'>
          <img
            src={thumbnail}
            className="w-24 2xl:w-40 2xl:h-40 drop-shadow-logo"
            alt={`${title}`}
          />
          <div className='flex flex-col items-start  gap-3 2xl:gap-4'>
            {/* 가구명 & 레벨 */}
            <header>
              <div className='flex flex-row items-baseline gap-2'>
                <p className='font-bold text-xl 2xl:text-2xl text-[#162C63]'>
                  {title}
                </p>
                <p className='font-semibold text-[#3E507D]'>Lv.1</p>
              </div>
              <p className='text-[#3E507D]/70 text-xs 2xl:text-sm font-medium'>
                최대 저장 가능한 갯수 5개
              </p>
            </header>

            {/* 현황 */}
            <ul className='list-disc text-[#162C63] font-medium text-sm 2xl:text-base '>
              <li className='ml-3 2xl:ml-4'>
                {isMusic ? '현재 저장한 음악' : '현재 저장한 도서'} <strong>3</strong>{isMusic ? '곡' : '권'}
              </li>
              <li className='ml-3 2xl:ml-4'>
                {isMusic ? '현재 기록한 감상' : '현재 기록한 서평'} <strong>15</strong>개
              </li>
            </ul>

            {/* 취향 키워드 */}
            <div className="flex flex-row items-center justify-center gap-2 font-medium mt-1 ml-[-2px] text-[10px] 2xl:text-xs">
              {["힙합", "댄스", "발라드"].map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-0.5 bg-[#4E7ACF]/10 rounded-full text-[#4E7ACF]"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
