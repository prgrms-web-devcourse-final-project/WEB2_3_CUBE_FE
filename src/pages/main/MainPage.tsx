import MyRoom from './components/MyRoom';
import RankMenu from './components/RankMenu';

export default function MainPage() {
  return (
    <main className='main-background w-full min-h-screen relative overflow-hidden'>
      <RankMenu />
      <MyRoom />
    </main>
  );
}
