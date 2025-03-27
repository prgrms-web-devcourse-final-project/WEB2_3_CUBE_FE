import { getCdComment } from '@apis/cd';
import { useDebounce } from '@hooks/useDebounce';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

export const useFetchCdComments = (
  currentPage: number,
  currentInput: string,
) => {
  const [cdComments, setCdComments] = useState<CdComment[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const myCdId = Number(useParams().cdId);
  const totalPage = useRef<number>(1);
  const debouncedQuery = useDebounce(currentInput, 500);

  useEffect(() => {
    const fetchCdComments = async () => {
      try {
        setIsSearching(true);
        const result =
          debouncedQuery === ''
            ? await getCdComment(myCdId, currentPage, 5)
            : await getCdComment(myCdId, currentPage, 5, debouncedQuery);
        totalPage.current = result.totalPages;

        setCdComments(result.data);
      } catch (error) {
        console.error(error);
        setCdComments([]);
      } finally {
        setIsSearching(false);
      }
    };
    fetchCdComments();
  }, [currentPage, debouncedQuery]);

  useEffect(() => {
    if (currentInput !== debouncedQuery) {
      setIsSearching(true);
    }
  }, [currentInput, debouncedQuery]);

  return {
    cdComments,
    isSearching,
    setCdComments,
    totalPage,
  };
};
