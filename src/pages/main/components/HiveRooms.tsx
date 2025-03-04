import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CAMERA_CONFIG } from '../../../constants/sceneSetting';
import { RoomLighting } from '../../../components/room-models/RoomLighting';
import HiveRoomModel from '../HiveRoomModel';
import useHexagonGrid from '../hooks/useHexagonGrid';
import useRooms from '../hooks/useRooms';

export default function HiveRooms({myUserId}: HiveRoomsProps) {
  const { rooms, loading, error } = useRooms(30, myUserId);
  const positionedRooms = useHexagonGrid(rooms, 0, 0);
  const [hoveredRoom, setHoveredRoom] = useState<number | null>(null);
  const navigate = useNavigate();

  console.log('Rooms:', rooms);
  console.log('Positioned Rooms:', positionedRooms);
  console.log('Rooms:', rooms.map(r => ({ roomId: r.roomId, modelPath: r.modelPath })));

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  return (
    <div className='w-full h-screen relative'>
      <Canvas camera={CAMERA_CONFIG}>
        <RoomLighting />
        <pointLight position={[10, 10, 10]} />
        {positionedRooms.map(({ room, position }, index) =>
            <group
              key={index}
              position={position}
              onPointerOver={() => setHoveredRoom(index)}
              onPointerOut={() => setHoveredRoom(null)}
              onClick={() => navigate(`/room/${room.userId}`)}
            >
              <HiveRoomModel room={room} position={position}/>
            </group>
        )}
        <OrbitControls
          enableRotate={false}
          enableZoom={true}
          enablePan={true}
          minDistance={5}
          maxDistance={18}
          mouseButtons={{ RIGHT: THREE.MOUSE.PAN }}
        />
      </Canvas>
      <div
        className="absolute bottom-22 left-1/2 transform -translate-x-1/2 font-medium"
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
        }}
      >
        {hoveredRoom !== null ? `✊🏻 똑똑! ${rooms[hoveredRoom]?.nickname}의 방에 들어가실래요?` : ''}
      </div>
    </div>
  );
}
