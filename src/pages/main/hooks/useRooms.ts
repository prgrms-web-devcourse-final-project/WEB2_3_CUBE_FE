import { useEffect, useState } from 'react'
import { housemateAPI } from '../../../apis/housemate';
import { roomAPI } from '../../../apis/room';

export default function useRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const houseMateUsers = await housemateAPI.getFollowing();
        const roomData = await Promise.all(
          houseMateUsers.map((user) => roomAPI.getRoomById(user.userId))
        );
        setRooms(roomData);
      } catch (error){
        setError(error);
        console.error('방 정보 패치 실패:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  return { rooms, loading, error };
}
