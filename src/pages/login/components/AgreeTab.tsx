import check_logo from '@assets/datalist/check-logo.svg';
import AgreeItem from './AgreeItem';

export default function AgreeTab({ agreement, onChangeAgreement }) {
  const handleToggleCheck = (id: number) => {
    const newAgreement = agreement.map((item: Agreement) => {
      return item.id === id
        ? { ...item, isChecked: !item.isChecked, isExpanded: false }
        : item;
    });
    onChangeAgreement(newAgreement);
  };

  const handleToggleContent = (id: number) => {
    const newAgreement = agreement.map((item: Agreement) => {
      return item.id === id
        ? { ...item, isExpanded: !item.isExpanded }
        : { ...item, isExpanded: false };
    });
    onChangeAgreement(newAgreement);
  };

  const handleCheckAll = () => {
    const newArgreement = agreement.map((item: Agreement) => {
      return { ...item, isChecked: true };
    });
    onChangeAgreement(newArgreement);
  };

  return (
    <div className='h-full rounded-3xl bg-[#FFFFFFE5] backdrop-blur-lg '>
      {/* 제목 */}
      <div className='pt-16 text-3xl text-[#162C63] flex flex-col items-center font-bold'>
        <span>서비스 이용을 위해</span>
        <span>이용약관 동의가 필요합니다.</span>
      </div>

      <div className='flex flex-col gap-5 px-31 mt-14 mb-10 '>
        {/* 서비스 이용 약관 */}
        <AgreeItem
          agreementInfo={agreement[0]}
          onToggleCheck={() => handleToggleCheck(1)}
          onToggleContent={() => handleToggleContent(1)}
        />

        <AgreeItem
          agreementInfo={agreement[1]}
          onToggleCheck={() => handleToggleCheck(2)}
          onToggleContent={() => handleToggleContent(2)}
        />
      </div>

      {/* 모두 동의 버튼 */}
      <button
        onClick={handleCheckAll}
        className='item-middle gap-2 absolute bottom-8 left-1/2 transform -translate-x-1/2 rounded-[80px] bg-[#162C63]  cursor-pointer
shadow-[0px_4px_4px_0px_rgba(78,122,207,0.15)] py-4 px-21  hover:opacity-80 transition-200'>
        <img
          className='w-7 h-7'
          src={check_logo}
          alt='체크 로고'
        />
        <span className='text-2xl font-bold text-white'>모두 동의</span>
      </button>
    </div>
  );
}
