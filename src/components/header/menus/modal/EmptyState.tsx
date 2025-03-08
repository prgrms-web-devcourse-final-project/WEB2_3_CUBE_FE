interface EmptyStateProps {
  message: string;
}

export const EmptyState = ({ message }: EmptyStateProps) => {
  return <div className='text-center text-[#3E507D]/70 h-full item-middle pb-20'>{message}</div>;
};
