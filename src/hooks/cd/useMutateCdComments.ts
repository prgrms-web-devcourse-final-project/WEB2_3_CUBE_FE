import { useUserStore } from '@/store/useUserStore';
import { addCdComment } from '@apis/cd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export const useMutateCdComments = (currentTime: number, commentInputRef) => {
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);
  const myCdId = Number(useParams().cdId);

  const { mutate, error, isPending, isError } = useMutation({
    mutationFn: async (newComment: CdCommentPost) => {
      const result = await addCdComment(myCdId, newComment);
      return result;
    },
    onMutate: async () => {
      // await queryClient.cancelQueries({ queryKey: [`cdComments ${myCdId}`] });

      const previousComments =
        queryClient.getQueryData<CdComment[]>([`cdComments ${myCdId}`]) || [];

      const newComment = {
        id: Date.now(),
        myCdId: myCdId,
        userId: user.userId,
        nickname: user.nickname,
        timestamp: currentTime,
        content: commentInputRef.current.value,
        createdAt: new Date().toISOString(),
      };

      console.log(newComment);

      // 낙관적 업데이트
      if (previousComments) {
        queryClient.setQueryData<CdComment[]>(
          [`cdComments ${myCdId}`],
          [...previousComments, newComment].sort(
            (a, b) => a.timestamp - b.timestamp,
          ),
        );
      }

      return { previousComments };
    },
    onError: (error, newComment, context) => {
      if (context) {
        queryClient.setQueryData(
          [`cdComments ${myCdId}`],
          context.previousComments,
        );
      }
    },
    onSettled() {
      if (commentInputRef.current) {
        commentInputRef.current.value = '';
      }
    },
  });

  return {
    mutate,
    error,
    isPending,
    isError,
  };
};
