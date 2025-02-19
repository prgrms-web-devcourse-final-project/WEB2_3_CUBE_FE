import blueFoot from "@assets/rank/blue-footprint.svg";

export default function RankingItem({ rank, nickname, visits }) {
  return (
    <div className="bg-[#73A1F7]/5 w-full 2xl:py-3 px-8 py-1.5 rounded-lg 2xl:rounded-xl">
      <div className="grid grid-cols-[30px_1fr_auto] gap-x-8 items-center text-[#4B6BBA]">
        {/* 랭킹 번호 */}
        <p className="font-black text-base 2xl:text-xl text-center">{rank}</p>
        
        {/* 닉네임 */}
        <p className="font-bold 2xl:text-sm text-xs text-center truncate max-w-[120px] whitespace-nowrap">
          {nickname}
        </p>
        
        {/* 방문자 수 */}
        <div className="flex flex-row items-center gap-0.5">
          <img src={blueFoot} className="w-2 2xl:w-3" />
          <p className="font-medium text-xs 2xl:text-sm">{visits}</p>
        </div>
      </div>
    </div>
  )
}
