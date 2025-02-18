interface BaseLayoutProps {
  children: React.ReactNode;
  hasHeader?: boolean;
}

const BaseLayout = ({ children, hasHeader = true }: BaseLayoutProps) => {
  return (
    <div className='min-h-screen'>
      {hasHeader && <Header />}
      <main className={`${hasHeader ? 'pt-[header높이값]' : ''}`}>
        {children}
      </main>
    </div>
  );
};
