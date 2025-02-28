import { useMemo } from "react";

export default function useHexagonGrid(housemateRooms, centerX = 0, centerY = 0) {
  const positions = useMemo(() => {
    const radius = housemateRooms.length > 0 ? Math.ceil(Math.sqrt(housemateRooms.length)) : 1;
    const angle = Math.PI / 3;
    const grid = [];

    let index = 0;
    for(let i=0; i<radius; i++){
      for(let j=0; j<6; j++){
        if(index >= housemateRooms.length) break;

        const x = centerX + i * Math.cos(angle * j);
        const y = centerY + i *Math.sin(angle * j);
        grid.push([x, y]);
        index++;
      }
    }
    return grid;
  }, [housemateRooms, centerX, centerY])
  return positions;
}
