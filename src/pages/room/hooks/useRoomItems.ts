import { useMemo } from "react";

type FurnitureType = "BOOKSHELF" | "CD_RACK" | "PIGGY_BANK" | "GUEST_BOOK";

const defaultItems: FurnitureData[] = [
  {
    id: "bookShelf",
    type: "BOOKSHELF", 
    apiType: "BOOKSHELF",
    rotation: [0, Math.PI / -4.4, 0],
    position: [-0.13, -0.55, -0.3],
    modelPath: "/models/bookshelf.glb",
    isEditable: true,
  },
  {
    id: "cdPlayer",
    type: "CD_RACK",
    apiType: "CD_RACK",
    rotation: [0, Math.PI / -4.4, 0],
    position: [-0.09, -0.58, -0.03],
    modelPath: "/models/cdplayer.glb",
    isEditable: true,
  },
  {
    id: "piggyCash",
    type: "PIGGY_BANK",
    apiType: "PIGGY_BANK",
    rotation: [0, Math.PI / -4.4, 0],
    position: [-0.15, -0.55, -0.15],
    modelPath: "/models/piggycash.glb",
    isEditable: false,
  },
  {
    id: "guestBook",
    type: "GUEST_BOOK",
    apiType: "GUEST_BOOK",
    rotation: [0, Math.PI / -4.4, 0],
    position: [-0.07, -0.45, -0.1],
    modelPath: "/models/guestbook.glb",
    isEditable: false,
  },
];

export function useRoomItems(roomData: { roomId: string; furnitures?: { furnitureType: FurnitureType; isVisible: boolean }[] } | null) {
  const items = useMemo(() => {
    if (!roomData || !roomData.furnitures) {
      return defaultItems;
    }

    const visibleItems = defaultItems.filter((item) => {
      if (!item.isEditable) return true;

      const apiItem = roomData.furnitures.find(
        (furniture) => furniture.furnitureType === item.apiType
      );

      return apiItem?.isVisible;
    });

    return visibleItems.map((item) => ({
      ...item,
      id: `${item.id}-${roomData.roomId}`,
    }));
  }, [roomData]);

  return { items, allItemConfigs: defaultItems };
}