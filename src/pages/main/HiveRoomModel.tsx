import { Center, useGLTF } from '@react-three/drei';
import { useEffect, useMemo } from 'react';
import Furnitures from '../../components/room-models/Furnitures';
import { useRoomItems } from '../../hooks/useRoomItems';
import * as THREE from 'three';

export default function HiveRoomModel({ room, position }: HiveRoomModelProps) {
  const { scene: originalScene } = useGLTF(room.modelPath) as GLTFResult;

  const scene = useMemo(() => {
    const clonedScene = originalScene.clone();

    clonedScene.traverse((object) => {
      if (object.isMesh) {
        object.material = object.material.clone();
        object.geometry = object.geometry.clone();
      }
    });
    return clonedScene;
  }, [originalScene]);

  const { items } = useRoomItems({
    roomId: parseInt(room.roomId),
    furnitures: room.furnitures,
  });

  // console.log(`Room ${room.roomId} items:`, items);

  const roomScale = 0.5;
  const roomRotation = -Math.PI / 4;

  useEffect(() => {
    if (!scene) return;

    scene.position.set(...position);
    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    box.getCenter(center);
    const size = new THREE.Vector3().subVectors(box.max, box.min);
    console.log(`Room ${room.roomId} dimensions:`, { center, size });
    // console.log(`Room ${room.roomId} items:`, items);

    scene.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
  }, [scene, room.roomId, position]);

  const adjustedItems = useMemo(() => {
    if (!scene || !items.length) return [];

    const scaleRatio = roomScale / 0.68; // 0.7353
    return items.map((item) => {
      const itemPos = new THREE.Vector3(...item.position);

      itemPos.applyAxisAngle(new THREE.Vector3(0, 1, 0), roomRotation);

      itemPos.multiplyScalar(scaleRatio);

      console.log(`Room ${room.roomId} Item ${item.id} adjusted position:`, itemPos.toArray());

      return {
        ...item,
        position: itemPos.toArray() as [number, number, number],
      };
    });
  }, [scene, items, roomRotation, room.roomId]);

  if (!scene || !adjustedItems.length) return null;


  return (
      <Center>
        <primitive
          object={scene}
          scale={roomScale}
          rotation={[0, -Math.PI / 4, 0]}
        />
        {adjustedItems.map((item) => (
          <Furnitures
            key={item.id}
            item={{ ...item, scale: roomScale }}
          />
        ))}
      </Center>
  );
}
