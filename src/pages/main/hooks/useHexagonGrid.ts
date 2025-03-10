import { useMemo } from 'react';

const directions: Position[] = [
  [-1, 0, 1], // 1. 왼쪽
  [1, 0, -1], // 2. 오른쪽
  [0, -1, 1], // 3. 위 왼쪽 대각선 상단
  [1, -1, 0], // 4. 위 오른쪽 대각선 상단
  [-1, 1, 0], // 5. 아래 왼쪽 대각선 하단
  [0, 1, -1], // 6. 아래 오른쪽 대각선 하단
];

const expansions: Expansion[] = [
  // 왼쪽 확장
  { directionIndex: 2, dir: [-1, 0, 1], side: 'left' }, // 위 왼쪽
  { directionIndex: 0, dir: [-1, 0, 1], side: 'left' }, // 왼쪽
  { directionIndex: 4, dir: [-1, 0, 1], side: 'left' }, // 아래 왼쪽
  // 오른쪽 확장
  { directionIndex: 3, dir: [1, 0, -1], side: 'right' }, // 위 오른쪽
  { directionIndex: 1, dir: [1, 0, -1], side: 'right' }, // 오른쪽
  { directionIndex: 5, dir: [1, 0, -1], side: 'right' }, // 아래 오른쪽
];

function expandRing(
  expansion: Expansion,
  previousRing: number[],
  result: RoomPosition[],
  visited: Set<string>,
  rooms: Room[],
  roomIndex: number,
  placedInRing: number,
  positionsInRing: number,
): { roomIndex: number; placedInRing: number } {
  const { directionIndex, dir } = expansion;
  if (placedInRing >= positionsInRing || roomIndex >= rooms.length)
    return { roomIndex, placedInRing };

  const baseIndex = previousRing[directionIndex % previousRing.length];
  const basePos = result[baseIndex].position;
  const [dx, dy, dz] = dir;
  const newPos: Position = [basePos[0] + dx, basePos[1] + dy, basePos[2] + dz];
  const posKey = `${newPos[0]},${newPos[1]},${newPos[2]}`;

  if (!visited.has(posKey) && newPos[0] + newPos[1] + newPos[2] === 0) {
    visited.add(posKey);
    result.push({ position: newPos, room: rooms[roomIndex] });
    return { roomIndex: roomIndex + 1, placedInRing: placedInRing + 1 };
  }
  return { roomIndex, placedInRing };
}

export default function useHexagonGrid(rooms, centerX = 0, centerY = 0) {
  const positions = useMemo(() => {
    const roomCount = rooms.length;
    if (!roomCount)
      return rooms.map((room) => ({ room, position: [centerX, centerY, 0] }));

    const result: RoomPosition[] = [];
    const visited = new Set<string>();
    const ringRooms: number[][] = [[]];

    result.push({ position: [0, 0, 0], room: rooms[0] });
    visited.add('0,0,0');
    ringRooms[0] = [0];
    let roomIndex = 1;

    if (roomIndex < roomCount) {
      const firstRingIndices: number[] = [];
      for (let dir = 0; dir < 6 && roomIndex < roomCount; dir++) {
        const [dx, dy, dz] = directions[dir];
        const posKey = `${dx},${dy},${dz}`;

        if (!visited.has(posKey)) {
          visited.add(posKey);
          result.push({ position: [dx, dy, dz], room: rooms[roomIndex] });
          firstRingIndices.push(roomIndex);
          roomIndex++;
        }
      }
      ringRooms.push(firstRingIndices);
    }

    let ring = 1;
    while (roomIndex < roomCount) {
      const positionsInRing = Math.min(roomCount - roomIndex, 6);
      let placedInRing = 0;
      const previousRing = ringRooms[ring];

      if (!previousRing || previousRing.length === 0) {
        console.error('링이 존재하지 않습니다.');
        break;
      }

      for (const expansion of expansions) {
        const updated = expandRing(
          expansion,
          previousRing,
          result,
          visited,
          rooms,
          roomIndex,
          placedInRing,
          positionsInRing,
        );
        roomIndex = updated.roomIndex;
        placedInRing = updated.placedInRing;
      }

      if (placedInRing > 0) {
        const currentRingIndices: number[] = [];
        for (let i = roomIndex - placedInRing; i < roomIndex; i++) {
          currentRingIndices.push(i);
        }
        ringRooms.push(currentRingIndices);
        ring++;
      } else {
        break;
      }
    }

    const roomScale = 0.5;
    const roomWidth = 2.823 * roomScale;
    const roomHeight = 1.75 * roomScale;

    const width = roomWidth;
    const height = roomHeight * 1.33;

    const finalRooms = result.map(({ position: [q, r], room }) => {
      const x = centerX + width * (q + r / 2);
      const y = centerY - height * (2.98 / 4.2) * r;
      const z = r * 0.7;
      return { room, position: [x, y, z] };
    });

    return finalRooms;
  }, [rooms, centerX, centerY]);

  return positions;
}
