import BookPage from '@pages/book/BookPage';
import BookCasePage from '@pages/bookcase/BookCasePage';
import NotFoundPage from '@pages/NotFoundPage';
import TestPage from '@pages/TestPage';
import CdPage from '@pages/cd/CdPage';
import CdCasePage from '@pages/cdcase/CdCasePage';
import MainPage from '@pages/main/MainPage';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '@pages/login/LoginPage';
import RoomPage from '../pages/room/RoomPage';

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
      <Route
        path='/test'
        element={<TestPage />}
      />
      <Route
        path='/room'
        element={<RoomPage />}
      />
      <Route
        path='*'
        element={<NotFoundPage />}
      />
    </Routes>
  );
};

export default Router;
