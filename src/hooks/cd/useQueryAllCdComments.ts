import { getCdCommentAll } from '@apis/cd';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export const useQueryAllCdComments = () => {
  const myCdId = Number(useParams().cdId);

  const { data: cdComments } = useQuery<CdComment[]>({
    queryKey: [`cdComments ${myCdId}`],
    queryFn: async () => {
      const result = await getCdCommentAll(myCdId);
      return result || [];
    },
    staleTime: 1000 * 10 * 5,
    gcTime: 1000 * 10 * 5,
    structuralSharing: true,
  });

  return { cdComments };
};
