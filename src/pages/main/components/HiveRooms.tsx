import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoomLighting } from '../../../components/room-models/RoomLighting';
import HiveRoomModel from './HiveRoomModel';
import useHexagonGrid from '../hooks/useHexagonGrid';
import useRooms from '../hooks/useRooms';

export default function HiveRooms({ myUserId }: HiveRoomsProps) {
  const { rooms } = useRooms(30, myUserId);
  const positionedRooms = useHexagonGrid(rooms, 0, 0);
  const [hoveredRoom, setHoveredRoom] = useState<number | null>(null);
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let isRightMouseDown = false;

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 2) { 
        isRightMouseDown = true;
        canvas.style.cursor = 'grab';
      }
    };

    const handleMouseMove = () => {
      if (isRightMouseDown) {
        canvas.style.cursor = 'grabbing';
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 2) { 
        isRightMouseDown = false;
        canvas.style.cursor = 'default';
      }
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('contextmenu', (e) => e.preventDefault()); 

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('contextmenu', (e) => e.preventDefault());
    };
  }, []);

  return (
    <div className='w-full h-screen relative'>
      <Canvas
        ref={canvasRef}
        camera={{ position: [0, 4, 10], fov: 25 }}
        shadows>
        <RoomLighting />
        <directionalLight
          position={[10, 10, 10]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        {positionedRooms.map(({ room, position }, index:number) => (
          <group
            key={index}
            position={position}
            onPointerOver={() => setHoveredRoom(index)}
            onPointerOut={() => setHoveredRoom(null)}
            onClick={() => navigate(`/room/${room.userId}`)}>
            <HiveRoomModel
              room={room}
              position={position}
            />
          </group>
        ))}
        <OrbitControls
          enableRotate={false}
          enableZoom={true}
          enablePan={true}
          minDistance={5}
          maxDistance={14}
          mouseButtons={{ RIGHT: THREE.MOUSE.PAN }}
        />
      </Canvas>
      <div
        className='absolute bottom-22 left-1/2 transform -translate-x-1/2 font-medium'
        style={{
          padding: '8px 20px',
          background: 'rgba(47, 71, 131, 0.4)',
          backdropFilter: 'blur(10px)',
          color: 'white',
          borderRadius: '40px',
          fontSize: '14px',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          opacity: hoveredRoom !== null ? 1 : 0,
          transition: 'opacity 0.2s ease-in-out',
        }}>
        {hoveredRoom !== null
          ? `✊🏻 똑똑! ${rooms[hoveredRoom]?.nickname}의 방에 들어가실래요?`
          : ''}
      </div>
    </div>
  );
}
