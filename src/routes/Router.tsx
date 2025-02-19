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
import BaseLayout from '@routes/layout/BaseLayout';

const Router = () => {
  return (
    <Routes>
      {/* 헤더가 필요한 페이지 */}
      <Route element={<BaseLayout hasHeader={true} />}>
        <Route
          path='/'
          element={<MainPage />}
        />
        <Route
          path='/bookcase'
          element={<BookCasePage />}
        />
      </Route>
      <Route
        path='/cdcase'
        element={<CdCasePage />}
      />
      <Route
        path='/test'
        element={<TestPage />}
      />

      {/* 헤더가 필요없는 페이지 */}
      <Route element={<BaseLayout hasHeader={false} />}>
        <Route
          path='/login'
          element={<LoginPage />}
        />
      </Route>

      <Route
        path='/book'
        element={<BookPage />}
      />
      <Route
        path='/cd'
        element={<CdPage />}
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
