import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoomLighting } from '../../../components/room-models/RoomLighting';
import HiveRoomModel from './HiveRoomModel';
import useHexagonGrid from '../hooks/useHexagonGrid';
import useRooms from '../hooks/useRooms';
import Loading from '../../../components/Loading';

export default function HiveRooms({ myUserId, onLoadingComplete }: HiveRoomsProps) {
  const { rooms } = useRooms(30, myUserId);
  const positionedRooms = useHexagonGrid(rooms, 0, 0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedRooms, setLoadedRooms] = useState(new Set());
  const [hoveredRoom, setHoveredRoom] = useState<number | null>(null);
  const [clickedRoom, setClickedRoom] = useState<number | null>(null);
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const dragThreshold = 4;

  const handleMouseDown = useCallback((e: MouseEvent) => {
    if (e.button === 0) {
      setStartPos({ x: e.clientX, y: e.clientY });
      setClickedRoom(hoveredRoom);
      setIsDragging(false);
      if (canvasRef.current) canvasRef.current.style.cursor = "grab";
    }
  }, [hoveredRoom, canvasRef]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (startPos && canvasRef.current) {
      const dx = e.clientX - startPos.x;
      const dy = e.clientY - startPos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > dragThreshold && !isDragging) {
        setIsDragging(true);
        canvasRef.current.style.cursor = "grabbing";
      }
    }
  }, [startPos, isDragging, dragThreshold, canvasRef]);

  const handleMouseUp = useCallback((e: MouseEvent) => {
    if (e.button === 0 && startPos && canvasRef.current) {

      if (!isDragging && clickedRoom !== null) {
        const room = rooms[clickedRoom];
        if (room?.userId) {
          navigate(`/room/${room.userId}`);
        }
      }
      setIsDragging(false);
      setStartPos(null);
      canvasRef.current.style.cursor = "default";
    }
  }, [clickedRoom, isDragging, navigate, rooms, startPos, canvasRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("contextmenu", (e) => e.preventDefault());

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("contextmenu", (e) => e.preventDefault());
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp]);

  const handlePointerOver = useCallback((index: number) => {
    if (!isDragging) {
      setHoveredRoom(index);
    }
  }, [isDragging]);

  const handlePointerOut = useCallback(() => {
    if (!isDragging) {
      setHoveredRoom(null);
    }
  }, [isDragging]);

  const handleModelLoaded = useCallback((roomId: string) => {
    setLoadedRooms((prev) => {
      if (prev.has(roomId)) return prev; 
      const newSet = new Set(prev);
      newSet.add(roomId);
      if (newSet.size === rooms.length && rooms.length > 0) {
        setIsLoading(false); 
        if (onLoadingComplete) onLoadingComplete();
      }
      return newSet;
    });
  }, [rooms.length, onLoadingComplete]);

  useEffect(() => {
    if (loadedRooms.size === rooms.length && rooms.length > 0) {
      setIsLoading(false);
    }
  }, [loadedRooms, rooms.length]);

  return (
    <div className='w-full h-screen relative'>
      {isLoading && <Loading />}
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
            onPointerOver={() => handlePointerOver(index)}
            onPointerOut={handlePointerOut}
            >
            <HiveRoomModel
              room={room}
              position={position}
              onModelLoaded={handleModelLoaded}
            />
          </group>
        ))}
        <OrbitControls
          enableRotate={false}
          enableZoom={true}
          enablePan={true}
          minDistance={5}
          maxDistance={14}
          mouseButtons={{ LEFT: THREE.MOUSE.PAN }}
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
