import classNames from 'classnames';

import check_logo from '@assets/datalist/check-logo.svg';
import toggle_up from '@assets/login/toggle-up.svg';

export default function AgreeItem({
  agreementInfo,
  onToggleCheck,
  onToggleContent,
}) {
  return (
    <ul className={`relative z-[5]  ${agreementInfo.isExpanded && 'mb-31'} `}>
      {/* 기본으로 보이는 부분 */}
      <div className='item-between  py-4.5  bg-[#FFFFFF] rounded-2xl shadow-[0px_4px_4px_0px_rgba(78,122,207,0.15)]'>
        <div className='item-middle gap-4 pl-10'>
          <label className='item-middle  w-7 h-7 cursor-pointer '>
            <input
              type='checkbox'
              className={classNames(
                ' cursor-pointer appearance-none w-7 h-7 rounded-full bg-no-repeat bg-center border-2 border-[#2656CD] checked:bg-[#2656CD]',
                'checked:border-none hover:bg-[#2656CD]  transition-all duration-200 ease-in-out',
              )}
              onChange={onToggleCheck}
            />
            {agreementInfo.isChecked && (
              <img
                className='absolute w-3.5 h-3.5'
                src={check_logo}
              />
            )}
          </label>
          <h2 className='text-[#162C63] text-2xl font-bold'>
            {agreementInfo.title}
          </h2>
        </div>
        <button
          className='pr-7'
          type='button'
          onClick={() => onToggleContent()}>
          <img
            className={`w-11 h-11 cursor-pointer transition-transform duration-200 ease-in-out ${
              agreementInfo.isExpanded ? 'rotate-180' : 'rotate-0'
            }`}
            src={toggle_up}
            alt='토글 버튼'
          />
        </button>
      </div>
      {/* 토글시 보이는 부분 */}

      <li
        className={` ${
          agreementInfo.isExpanded ? 'h-54  opacity-100' : 'h-0 opacity-0'
        }
        absolute z-[-1]  top-0 left-0 w-full  pt-[82px]  rounded-2xl bg-[#FFFFFF] 
      shadow-[0px_4px_4px_0px_rgba(78,122,207,0.15)] px-10 transition-200
      `}>
        <p className='w-full h-full scrollbar text-[#162C63] pt-6 pr-4 pb-12 whitespace-pre-line '>
          {agreementInfo.content}
        </p>
      </li>
    </ul>
  );
}
