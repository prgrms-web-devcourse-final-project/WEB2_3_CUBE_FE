import { useEffect, useState } from 'react'
import { housemateAPI } from '../../../apis/housemate';
import { roomAPI } from '../../../apis/room';
import { themeData } from '../../../constants/roomTheme';

export default function useRooms(limit=30, myUserId:number) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try{
        let myRoom = null;
        if (typeof myUserId === 'number') {
          const myRoomData = await roomAPI.getRoomById(myUserId);
          const myThemeKey = myRoomData.theme as keyof typeof themeData;
          const myTheme = themeData[myThemeKey] || themeData.BASIC;
          myRoom = { ...myRoomData, modelPath: myTheme.modelPath };
        } else {
          console.warn('myUserId가 유효하지 않음:', myUserId);
        }
        
        const houseMateUsers = await housemateAPI.getFollowing(undefined, limit);

        const roomData = await Promise.all(
          houseMateUsers.housemates.map((mate: Housemate) => roomAPI.getRoomById(mate.userId))
        );

        const modelRooms = roomData.map((room) => {
          const themeKey = room.theme as keyof typeof themeData;
          const theme = themeData[themeKey] || themeData.BASIC; 
          return {
            ...room,
            modelPath: theme.modelPath,
          };
        });

        const allRooms = myRoom ? [myRoom, ...modelRooms] : modelRooms;
        setRooms(allRooms);

        console.log('allRooms:', allRooms);
      } catch (error){
        setError(error);
        console.error('방 정보 패치 실패:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [limit, myUserId]);
  
  return { rooms, loading, error };
}
