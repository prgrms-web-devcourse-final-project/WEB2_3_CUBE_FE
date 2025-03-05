interface PreferenceSettingProps {
  storageData: StorageData;
  onFurnitureToggle: (furniture: 'CD_RACK' | 'BOOKSHELF') => void;
  bookshelfLevel: number;
  cdRackLevel: number;
  bookGenres: string[];
  cdGenres: string[];
  furnitures: Furniture[];
  onClose: () => void;
}

interface ThemeSettingProps {
  selectedTheme: string;
  onThemeSelect: (theme: string) => void;
  onClose: () => void;
}
interface ThemeSettingCardProps {
  theme: keyof typeof themeData;
  isSelected: boolean;
  isLocked: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
}
interface PreferenceSettingCardProps {
  title: string;
  thumbnail: string;
  maxCount: number;
  savedCount: number;
  writtenCount: number;
  isAdd: boolean;
  genres: string[];
  onClick: MouseEventHandler<HTMLSectionElement>;
  level: number;
}