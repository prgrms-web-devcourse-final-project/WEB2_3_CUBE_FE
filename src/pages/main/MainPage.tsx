import DockMenu from './components/DockMenu';
import RankMenu from './components/RankMenu';

const MainPage = () => {
  // const { showToast } = useToastStore();
  // useEffect(() => {
  //   showToast('메인 페이지입니다.', 'error');
  // }, [showToast]);

  // const [isClicked, setIsClicked] = useState(false);
  return (
    <main className='main-background w-full min-h-screen'>
      <DockMenu />
      <RankMenu />
    </main>
  );
};

export default MainPage;
