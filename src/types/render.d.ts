type GLTFResult = {
  scene: THREE.Group;
  nodes: Record<string, THREE.Object3D>;
  materials: Record<string, THREE.Material>;
};

interface FurnitureData {
  id: string;
  type: 'bookShelf' | 'cdPlayer' | 'piggyCash' | 'guestBook';
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  modelPath: string;
  isEditable: boolean;
}

interface FurnitureProps {
  item: FurnitureData;
}
