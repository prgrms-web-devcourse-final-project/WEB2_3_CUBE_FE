import Header from '@components/header/Header';
import { Outlet } from 'react-router-dom';

interface BaseLayoutProps {
  hasHeader?: boolean;
}

const BaseLayout = ({ hasHeader = true }: BaseLayoutProps) => {
  return (
    <div className='min-h-screen'>
      {hasHeader && <Header />}
      <main className={`${hasHeader ? 'pt-[header높이값]' : ''}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default BaseLayout;
