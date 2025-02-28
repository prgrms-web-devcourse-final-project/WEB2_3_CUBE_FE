import { LIGHT_CONFIG } from "@constants/sceneSetting";

export function RoomLighting() {
  const { mainLight, ambient, fill } = LIGHT_CONFIG;

  return (
    <>
      <ambientLight intensity={ambient.intensity} color={ambient.color} />
      <directionalLight
        position={[mainLight.position[0], mainLight.position[1], mainLight.position[2]]}
        intensity={mainLight.intensity}
        color={mainLight.color}
        castShadow
        shadow-mapSize-width={mainLight.shadowConfig.mapSize[0]}
        shadow-mapSize-height={mainLight.shadowConfig.mapSize[1]}
        shadow-camera-near={mainLight.shadowConfig.camera.near}
        shadow-camera-far={mainLight.shadowConfig.camera.far}
        shadow-bias={mainLight.shadowConfig.bias}
      />
      <pointLight
        position={[fill.position[0], fill.position[1], fill.position[2]]} 
        intensity={fill.intensity}
        color={fill.color}
      />
    </>
  );
}