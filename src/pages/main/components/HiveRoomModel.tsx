import { Center, useGLTF } from '@react-three/drei';
import { useEffect, useMemo } from 'react';
import * as THREE from 'three';

export default function HiveRoomModel({ room, position, onModelLoaded }: HiveRoomModelProps) {
  const { scene: originalScene } = useGLTF(room.modelPath) as GLTFResult;

  const scene = useMemo(() => {
    const clonedScene = originalScene.clone();

    clonedScene.traverse((object: THREE.Object3D) => {
      if (object instanceof THREE.Mesh) {
        object.material = (object.material as THREE.Material).clone();
        object.geometry = object.geometry.clone();

        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
    return clonedScene;
  }, [originalScene]);

  const roomScale = 0.5;

  useEffect(() => {
    if (!scene) return;

    scene.position.set(...position);
    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    box.getCenter(center);

    onModelLoaded(room.roomId);
  }, [scene, room.roomId, position, onModelLoaded]);

  return (
      <Center>
        <primitive
          object={scene}
          scale={roomScale}
          rotation={[0, -Math.PI / 4, 0]}
        />
      </Center>
  );
}
