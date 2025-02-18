import MyRoom from './components/\bMyRoom';
import RankMenu from './components/RankMenu';

export default function MainPage() {
  return (
    <main className='main-background w-full min-h-screen relative overflow-hidden'>
      <RankMenu />
      <MyRoom />
    </main>
  );
}
