import { useState } from 'react';
import background_img from '@assets/roome-background-img.png';
import SocialTab from './components/SocialTab';
import AgreeTab from './components/AgreeTab';
import { agreeItems } from '@constants/login';

export default function LoginPage() {
  const [agreement, setAgreement] = useState<Agreement[]>(agreeItems);

  const handleChangeAgreement = (item: Agreement[]) => {
    setAgreement(item);
  };

  return (
    <div
      style={{ backgroundImage: `url(${background_img})` }}
      className={`bg-cover bg-center bg-no-repeat h-screen item-middle `}>
      <div
        className='w-full h-[650px]  max-w-[1134px] p-4.5 rounded-[36px] border-2 border-[#FCF7FD] bg-[#FCF7FD33]   backdrop-blur-lg
       shadow-[inset_0px_0px_40px_10px_rgba(152,200,228,0.30),_0px_10px_20px_0px_rgba(62,80,125,0.20)]'>
        {agreement[0].isChecked && agreement[1].isChecked ? (
          <SocialTab />
        ) : (
          <AgreeTab
            agreement={agreement}
            onChangeAgreement={handleChangeAgreement}
          />
        )}
      </div>
    </div>
  );
}
