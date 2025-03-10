import classNames from 'classnames';

import checkLogo from '@assets/datalist/check-logo.svg';
import toggleDown from '@assets/login/toggle-down.svg';

export default function AgreeItem({
  agreementInfo,
  onToggleCheck,
  onToggleContent,
}) {
  return (
    <ul className={`relative z-[5]  ${agreementInfo.isExpanded && 'mb-31'} `}>
      {/* 기본으로 보이는 부분 */}
      <div className='item-between py-4.5  bg-[#FFFFFF] rounded-2xl shadow-[0px_4px_4px_0px_rgba(78,122,207,0.15)]'>
        <div className='item-middle gap-4 pl-10'>
          <label className='item-middle  w-7 h-7 cursor-pointer '>
            <input
              type='checkbox'
              className={classNames(
                ' cursor-pointer appearance-none w-6 h-6 rounded-full bg-no-repeat bg-center border-2 border-[#2656CD] checked:bg-[#2656CD]',
                'checked:border-none hover:bg-[#2656CD]  transition-all duration-200 ease-in-out',
              )}
              onChange={onToggleCheck}
            />
            {agreementInfo.isChecked && (
              <img
                className='absolute w-3 h-3'
                src={checkLogo}
              />
            )}
          </label>
          <h2 className='text-[#162C63] text-xl font-bold'>
            {agreementInfo.title}
          </h2>
        </div>
        <button
          className='pr-7'
          type='button'
          onClick={() => onToggleContent()}>
          <img
            className={`w-9 h-9 cursor-pointer transition-transform duration-200 ease-in-out ${
              agreementInfo.isExpanded ? 'rotate-180' : 'rotate-0'
            }`}
            src={toggleDown}
            alt='토글 버튼'
          />
        </button>
      </div>
      {/* 토글시 보이는 부분 */}
      
      <li
        className={` ${
          agreementInfo.isExpanded ? 'h-54  opacity-100' : 'h-0 opacity-0'
        }
        absolute z-[-1] top-0 left-0 w-full pt-10 2xl:pt-[82px]  rounded-2xl bg-[#FFFFFF] 
      shadow-[0px_4px_4px_0px_rgba(78,122,207,0.15)] px-10 all-200-eio
      `}>
        <p className='w-full h-full scrollbar text-[#162C63] pt-10 pr-4 pb-12 whitespace-pre-line '>
          {agreementInfo.content}
        </p>
      </li>
    </ul>
  );
}
