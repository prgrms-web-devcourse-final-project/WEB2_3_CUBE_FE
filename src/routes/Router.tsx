import BookPage from '@pages/book/BookPage';
import BookCasePage from '@pages/bookcase/BookCasePage';
import NotFoundPage from '@pages/NotFoundPage';
import TestPage from '@pages/TestPage';
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
        path='/login'
        element={<LoginPage />}
      />
      <Route
        path='/test'
        element={<TestPage />}
      />
      <Route
        path='*'
        element={<NotFoundPage />}
     />
      <Route
        path='/cd'
        element={<CdPage />}
      />
      <Route
        path='/cdcase'
        element={<CdCasePage />}
      />
    </Routes>
  );
};

export default Router;
