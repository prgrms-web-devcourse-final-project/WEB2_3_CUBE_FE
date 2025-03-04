import { useMemo } from "react";

export default function useHexagonGrid(rooms, centerX = 0, centerY = 0) {
  const positions = useMemo(() => {
    const roomCount = rooms.length;
    if (!roomCount) return rooms.map(room => ({ room, position: [centerX, centerY, 0] }));

    const directions = [
      [1, 0, -1],    // 1. 오른쪽
      [1, -1, 0],    // 6. 위 오른쪽 대각선 상단
      [0, -1, 1],   // 5. 위 왼쪽 대각선 상단
      [0, 1, 1],    // 4. 아래 왼쪽 대각선 하단
      [-1, 1, 1],    // 3. 아래 오른쪽 대각선 하단
      [-1, 0, 1],    // 2. 왼쪽
    ];

    const result = [];
    const visited = new Set();

    result.push({ position: [0, 0, 0], room: rooms[0] });
    visited.add('0,0,0');
    
    let roomIndex = 1;
    let currentRing = 1;

    while (result.length < roomCount) {
      if (currentRing === 1) {
        for (let i = 0; i < 6 && roomIndex < roomCount; i++) {
          const [dx, dy, dz] = directions[i];
          const posKey = `${dx},${dy},${dz}`;
          if (!visited.has(posKey)) {
            visited.add(posKey);
            result.push({ position: [dx, dy, dz], room: rooms[roomIndex] });
            roomIndex++;
          }
        }
      }

      if (result.length < roomCount) {
        let cubeX = currentRing;
        let cubeY = 0;
        let cubeZ = -currentRing;

        for (let side = 0; side < 6 && result.length < roomCount; side++) {
          const steps = side === 0 ? currentRing : currentRing + 1; 
          for (let step = 0; step < steps && result.length < roomCount; step++) {
            const posKey = `${cubeX},${cubeY},${cubeZ}`;
            if (!visited.has(posKey)) {
              visited.add(posKey);
              result.push({ position: [cubeX, cubeY, cubeZ], room: rooms[roomIndex] });
              roomIndex++;
            }
            cubeX += directions[side][0];
            cubeY += directions[side][1];
            cubeZ += directions[side][2];
          }
        }
      }

    currentRing++;
  }
    const roomScale = 0.5;
    const roomWidth = 2.823 * roomScale; 
    const roomHeight = 1.75 * roomScale; 

    const width = roomWidth
    const height = roomHeight * 1.33

    const finalRooms = result.map(({ position: [q, r, ], room }) => {
      const x = centerX + width * (q + r / 2);
      const y = centerY - height * (3 / 4) * r;
      const z = r * 0.7;
      return { room, position: [x, y, z] };
    });

    console.log(`Generated ${finalRooms.length} room positions for ${roomCount} rooms`);
    return finalRooms;
  }, [rooms, centerX, centerY]);

  return positions;
}