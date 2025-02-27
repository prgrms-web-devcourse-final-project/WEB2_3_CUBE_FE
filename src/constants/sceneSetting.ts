import { Vector3 } from "three";

export const CAMERA_CONFIG = {
  position: new Vector3(0, 4, 10),
  fov: 30,

};

export const LIGHT_CONFIG = {

  mainLight: {
    position: [3, 8, 8],
    intensity: 2.5,
    color: '#ffefd5',
    castShadow: true,
    shadowConfig: {
      mapSize: [2048, 2048],
      bias: -0.001,
      camera: {
        near: 1,
        far: 30
      }
    }
  },

  ambient: {
    intensity: 1.5,
    color: '#fff5f8'
  },

  fill: {
    position: [-4, 2, -4],
    intensity: 0.4,
    color: '#ffecf2'
  }
};