import basicImg from '@assets/room/thumbnail-basic.png';
import forestImg from '@assets/room/thumbnail-forest.png';
import marineImg from '@assets/room/thumbnail-marine.png';

export const themeData = {
  BASIC: {
    title: '베이직',
    description: '깔끔하고 모던한 공간',
    modelPath: '/models/basicRoom.glb',
    thumbnail: basicImg,
  },
  FOREST: {
    title: '포레스트',
    description: '자연의 따뜻한 감성',
    modelPath: '/models/forestRoom.glb',
    thumbnail: forestImg,
  },
  MARINE: {
    title: '마린',
    description: '시원한 해양 분위기',
    modelPath: '/models/marineRoom.glb',
    thumbnail: marineImg,
  },
} as const;

export const FullThemeData = {
  FULL_BASIC: {
    title: '베이직',
    modelPath: '/models/basicRoomFull.glb',
  },
  FULL_FOREST: {
    title: '포레스트',
    modelPath: '/models/forestRoomFull.glb',
  },
  FULL_MARINE: {
    title: '마린',
    modelPath: '/models/marineRoomFull.glb',
  },
} as const

