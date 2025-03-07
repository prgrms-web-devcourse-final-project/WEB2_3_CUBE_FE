import pointIcon from '@/assets/toast/coin.png';
import { twMerge } from 'tailwind-merge';
import LayeredButton from '@components/LayeredButton';

interface PaymentOption {
  points: number;
  amount: number;
}

interface PaymentOptionCardProps {
  option: PaymentOption;
  isSelected: boolean;
  onSelect: (option: PaymentOption) => void;
}

export const PaymentOptionCard = ({
  option,
  isSelected,
  onSelect,
}: PaymentOptionCardProps) => {
  return (
    <li
      className={twMerge(
        'py-6 px-12 rounded-lg w-full item-row gap-4 transition-colors',
        isSelected
          ? 'bg-[#73A1F7]/10 border-2 border-[#2656CD]'
          : 'bg-[#95B2EA]/10 border-2 border-transparent',
      )}>
      <h2 className='text-2xl font-bold text-[#2656CD] w-full text-center bg-white rounded-full p-2'>
        {option.points}P
      </h2>
      <img
        src={pointIcon}
        alt='point'
        className='w-18 h-18'
      />
      <p className='text-gray-600 font-semibold'>
        {option.amount.toLocaleString()}원
      </p>
      <PaymentOptionButton
        isSelected={isSelected}
        onClick={() => onSelect(option)}
      />
    </li>
  );
};

interface PaymentOptionButtonProps {
  isSelected: boolean;
  onClick: () => void;
}

const PaymentOptionButton = ({
  isSelected,
  onClick,
}: PaymentOptionButtonProps) => {
  if (isSelected) {
    return (
      <LayeredButton
        theme='blue'
        containerClassName='w-full'
        className='mt-2 w-full py-1.5'
        onClick={onClick}>
        선택됨
      </LayeredButton>
    );
  }

  return (
    <LayeredButton
      theme='gray'
      containerClassName='w-full'
      className='mt-2 w-full py-1.5'
      onClick={onClick}>
      선택하기
    </LayeredButton>
  );
};

export default PaymentOptionCard;
