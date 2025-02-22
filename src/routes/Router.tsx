import BookPage from '@pages/book/BookPage';
import BookCasePage from '@pages/bookcase/BookCasePage';
import CdPage from '@pages/cd/CdPage';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '@pages/login/LoginPage';
import MainPage from '@pages/main/MainPage';
import NotFoundPage from '@pages/NotFoundPage';
import TestPage from '@pages/TestPage';
import BaseLayout from '@routes/layout/BaseLayout';
import CdRackPage from '@pages/cdrack/CdRackPage';
import RoomPage from '../pages/room/RoomPage';

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
          path='/bookcase/:userId'
          element={<BookCasePage />}
        />
        <Route
          path='/room'
          element={<RoomPage />}
        />
        <Route
          path='/cdrack'
          element={<CdRackPage />}
        />
      </Route>

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

      {/* 내 서평 보기/수정 */}
      <Route
        path='/book/:bookId'
        element={<BookPage />}
      />
      {/* 다른 유저의 서평 보기 */}
      <Route
        path='/book/:bookId/user/:userId'
        element={<BookPage />}
      />
      <Route
        path='/cd'
        element={<CdPage />}
      />
      <Route
        path='*'
        element={<NotFoundPage />}
      />
    </Routes>
  );
};

export default Router;
