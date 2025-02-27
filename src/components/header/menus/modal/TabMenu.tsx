import { motion } from 'framer-motion';

interface TabMenuProps<T extends string> {
  activeTab: T;
  tabs: { id: T; label: string }[];
  onTabChange: (tab: T) => void;
  modalType?: 'notification' | 'housemate';
}

const getTabTheme = (type: 'notification' | 'housemate') => {
  switch (type) {
    case 'housemate':
      return {
        bgColor: 'bg-[#F9E9F0]',
        activeBgColor: 'bg-[#D8297B]/80',
        textColor: 'text-[#AC2463]/70',
      };
    case 'notification':
    default:
      return {
        bgColor: 'bg-[#EBEFFB]',
        activeBgColor: 'bg-[#2C5FBD]/80',
        textColor: 'text-[#3E507D]',
      };
  }
};

export const TabMenu = <T extends string>({
  activeTab,
  tabs,
  onTabChange,
  modalType = 'notification',
}: TabMenuProps<T>) => {
  const theme = getTabTheme(modalType);

  return (
    <div className={`flex ${theme.bgColor} rounded-lg mb-4 h-10 p-1 relative`}>
      <motion.div
        className={`absolute w-[48%] h-8 ${theme.activeBgColor} rounded-md`}
        animate={{
          x: activeTab === tabs[1].id ? '103%' : '0',
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 26,
        }}
      />
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 font-medium text-sm rounded-md relative z-10 transition-colors duration-300 ${
            activeTab === tab.id ? 'text-white' : theme.textColor
          }`}>
          {tab.label}
        </button>
      ))}
    </div>
  );
};
