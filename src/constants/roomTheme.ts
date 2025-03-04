import basicImg from '@assets/room/thumbnail-basic.png';
import forestImg from '@assets/room/thumbnail-forest.png';
import marineImg from '@assets/room/thumbnail-marine.png';

export const themeData = {
  BASIC: {
    title: '베이직',
    description: '깔끔하고 모던한 공간',
    modelPath: '/models/basicRoom.glb',
    isLocked: false,
    thumbnail: basicImg,
  },
  FOREST: {
    title: '포레스트',
    description: '자연의 따뜻한 감성',
    modelPath: '/models/forestRoom.glb',
    isLocked: false,
    thumbnail: forestImg,
  },
  MARINE: {
    title: '마린',
    description: '시원한 해양 분위기',
    modelPath: '/models/marineRoom.glb',
    isLocked: false,
    thumbnail: marineImg,
  },
} as const;
