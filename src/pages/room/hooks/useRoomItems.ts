import { useMemo, useState } from "react";

const FURNITURE_TYPE_MAPPING = {
  BOOKSHELF: "bookShelf",
  CD_RACK: "cdPlayer",
  PIGGY_BANK: "piggyCash",
  GUEST_BOOK: "guestBook"
};

export function useRoomItems(roomData = null) {
  // const [items, setItems] = useState<FurnitureData[]>([
  //   {
  //     id: "bookShelf",
  //     type: "bookShelf",
  //     rotation: [0, Math.PI / -4.4, 0],
  //     position: [-0.13, -0.55, -0.3],
  //     modelPath: "/models/bookshelf.glb",
  //     isEditable: true,
  //   },
  //   {
  //     id: "cdPlayer",
  //     type: "cdPlayer",
  //     rotation: [0, Math.PI / -4.4, 0],
  //     position: [-0.09, -0.58, -0.03],
  //     modelPath: "/models/cdplayer.glb",
  //     isEditable: true,
  //   },
  //   {
  //     id: "piggyCash",
  //     type: "piggyCash",
  //     rotation: [0, Math.PI / -4.4, 0],
  //     position: [-0.15, -0.55, -0.15],
  //     modelPath: "/models/piggycash.glb",
  //     isEditable: false,
  //   },
  //   {
  //     id: "guestBook",
  //     type: "guestBook",
  //     rotation: [0, Math.PI / -4.4, 0],
  //     position: [-0.07, -0.45, -0.1],
  //     modelPath: "/models/guestbook.glb",
  //     isEditable: false,
  //   },
  // ]);

  const defaultItems = [
    {
      id: "bookShelf",
      type: "bookShelf",
      apiType: "BOOKSHELF", 
      rotation: [0, Math.PI / -4.4, 0],
      position: [-0.13, -0.55, -0.3],
      modelPath: "/models/bookshelf.glb",
      isEditable: true,
    },
    {
      id: "cdPlayer",
      type: "cdPlayer",
      apiType: "CD_RACK", 
      rotation: [0, Math.PI / -4.4, 0],
      position: [-0.09, -0.58, -0.03],
      modelPath: "/models/cdplayer.glb",
      isEditable: true,
    },
    {
      id: "piggyCash",
      type: "piggyCash",
      apiType: "PIGGY_BANK", 
      rotation: [0, Math.PI / -4.4, 0],
      position: [-0.15, -0.55, -0.15],
      modelPath: "/models/piggycash.glb",
      isEditable: false,
    },
    {
      id: "guestBook",
      type: "guestBook",
      apiType: "GUEST_BOOK", 
      rotation: [0, Math.PI / -4.4, 0],
      position: [-0.07, -0.45, -0.1],
      modelPath: "/models/guestbook.glb",
      isEditable: false,
    },
  ];

  const [items, setItems] = useState(defaultItems);

  const roomItems = useMemo(() => {
    if (!roomData || !roomData.furnitures) {
      return items;
    }
    
    const updatedItems = [...defaultItems];
    
    const visibleItems = updatedItems.filter(item => {
      
      if (!item.isEditable) return true;
      
      const apiItem = roomData.furnitures.find(
        furniture => furniture.furnitureType === item.apiType
      );
      
      return apiItem && apiItem.isVisible;
    });
    
    // 고유 ID 부여 (방 ID와 결합)
    return visibleItems.map(item => ({
      ...item,
      id: `${item.id}-${roomData.roomId}`
    }));
  }, [roomData]);

  const addItem = (newItem) => {
    setItems([...items, newItem]);
  };

  return { 
    items: roomData ? roomItems : items, 
    addItem,
    allItemConfigs: defaultItems 
  };
}