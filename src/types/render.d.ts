type GLTFResult = {
  scene: THREE.Group;
  nodes: Record<string, THREE.Object3D>;
  materials: Record<string, THREE.Material>;
};

interface FurnitureData {
  id: string;
  type: FurnitureType;
  apiType: FurnitureType;
  rotation: [number, number, number];
  position: [number, number, number];
  modelPath: string;
  isEditable: boolean;
  scale?: number
}

interface FurnitureProps {
  item: FurnitureData;
  onInteract?: (itemType: string) => void;
  onHover?: (type: string, isHovering: boolean) => void;
}

interface RoomModelProps {
  modelPath: string;
  activeSettings: string;
  ownerName: string;
  ownerId: number;
  roomId: number;
  furnitures: { furnitureType: FurnitureType; isVisible: boolean }[]; 
};