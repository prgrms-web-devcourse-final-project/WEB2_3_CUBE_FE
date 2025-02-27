interface EmptyStateProps {
  message: string;
}

export const EmptyState = ({ message }: EmptyStateProps) => {
  return <div className='text-center text-[#3E507D]/70'>{message}</div>;
};
