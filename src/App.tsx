import { BrowserRouter } from 'react-router-dom';
import Router from './routes/Router';
import { Toast } from '@components/Toast';

function App() {
  return (
    <BrowserRouter>
      <Toast />
      <Router />
    </BrowserRouter>
  );
}

export default App;
