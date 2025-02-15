import BookPage from '@pages/book/BookPage';
import BookCasePage from '@pages/bookcase/BookCasePage';
import CdPage from '@pages/cd/CdPage';
import CdCasePage from '@pages/cdcase/CdCasePage';
import LoginPage from '@pages/LoginPage';
import MainPage from '@pages/main/MainPage';
import { Routes, Route } from 'react-router-dom';

const Router = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={<MainPage />}
      />
      <Route
        path='/book'
        element={<BookPage />}
      />
      <Route
        path='/bookcase'
        element={<BookCasePage />}
      />
      <Route
        path='/cd'
        element={<CdPage />}
      />
      <Route
        path='/cdcase'
        element={<CdCasePage />}
      />
      <Route
        path='/login'
        element={<LoginPage />}
      />
    </Routes>
  );
};

export default Router;
