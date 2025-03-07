import Header from '@components/header/Header';
import { Outlet } from 'react-router-dom';

interface BaseLayoutProps {
  hasHeader?: boolean;
}

const BaseLayout = ({ hasHeader = true }: BaseLayoutProps) => {
  return (
    <div className='min-h-screen relative'>
      <main className={`${hasHeader ? 'pt-[header높이값]' : ''} relative`}>
        <Outlet />
      </main>
      {hasHeader && <Header />}
    </div>
  );
};

export default BaseLayout;
