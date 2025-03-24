import { getCdRack, getCdRackSearch } from '@apis/cd';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

export const useFetchSearchCdLists = (userId: number) => {
  const [cdRackInfo, setCdRackInfo] = useState<CdDataListInfo>({
    data: [],
    nextCursor: 0,
    totalCount: 0,
    firstMyCdId: 0,
    lastMyCdId: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [cursor, setCursor] = useState(0);

  const firstMyCdId = useRef(0);
  const lastMyCdId = useRef(0);

  const fetchSearchCdData = async () => {
    try {
      const result = searchInput
        ? await getCdRackSearch(userId, searchInput, 7, cursor)
        : await getCdRack(userId, 7, cursor);

      const formattedDatas = result.data.map((item: CDInfo) => ({
        id: String(item.myCdId),
        title: item.title,
        artist: item.artist,
        album: item.album,
        released_year: item.releaseDate,
      }));
      firstMyCdId.current = result.firstMyCdId;
      lastMyCdId.current = result.lastMyCdId;
      setCdRackInfo((prev) => ({
        ...result,
        data:
          cursor === 0
            ? formattedDatas // 첫 페이지(cursor=0)이면 데이터 대체
            : [...prev.data, ...formattedDatas], // 아니면 데이터 추가
      }));
    } catch (error) {
      if (cursor === 0) {
        setCdRackInfo((prev) => ({ ...prev, data: [] }));
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setCursor(0);
    fetchSearchCdData();
  }, [searchInput]);

  return {
    cdRackInfo,
    isLoading,
    lastMyCdId,
    setSearchInput,
    setCursor,
  };
};
