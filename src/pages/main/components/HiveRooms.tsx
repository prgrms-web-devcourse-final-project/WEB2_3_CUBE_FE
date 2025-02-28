import { Canvas } from '@react-three/fiber';
import { useNavigate } from 'react-router-dom';
import useHexagonGrid from '../hooks/useHexagonGrid';
import useRooms from '../hooks/useRooms';
import HiveRoomModel from '../HiveRoomModel';

export default function HiveRooms() {
  const { rooms } = useRooms();
  const positions = useHexagonGrid(rooms, 0, 0);
  const navigate = useNavigate();

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {rooms.map((room, index) => (
        <group
          key={room.roomId}
          onClick={() => navigate(`/room/${room.userId}`)}
        >
          <HiveRoomModel
            position={positions[index]}
            room={room}
          />
        </group>
      ))}
    </Canvas>
  );
}
