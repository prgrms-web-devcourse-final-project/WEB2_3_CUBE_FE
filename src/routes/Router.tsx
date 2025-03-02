import BookPage from '@pages/book/BookPage';
import BookCasePage from '@pages/bookcase/BookCasePage';
import CdPage from '@pages/cd/CdPage';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '@pages/login/LoginPage';
import MainPage from '@pages/main/MainPage';
import NotFoundPage from '@pages/NotFoundPage';
import BaseLayout from '@routes/layout/BaseLayout';
import CdRackPage from '@pages/cdrack/CdRackPage';
import RoomPage from '../pages/room/RoomPage';
import RequireAuth from './layout/RequireAuth';
import ProfileCardPage from '@pages/profile-card/ProfileCardPage';
import ProfileCardEditPage from '@pages/profile-card-edit/ProfileCardEditPage';
import Redirection from '@pages/login/components/Redirection';
import TestPage from '@pages/TestPage';

const Router = () => {
  return (
    <Routes>
      <Route
        path='/oauth/callback'
        element={<Redirection />}
      />
      <Route element={<RequireAuth />}>
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
            path='/cdrack/:userId'
            element={<CdRackPage />}
          />
          <Route
            path='/room/:userId'
            element={<RoomPage />}
          />
          <Route
            path='/profile/:userId'
            element={<ProfileCardPage />}
          />
          <Route
            path='/profile/:userId/edit'
            element={<ProfileCardEditPage />}
          />
          <Route
            path='/test'
            element={<TestPage />}
          />
        </Route>
        {/* 내 서평 보기/작성/수정 */}
        <Route
          path='/book/:bookId'
          element={<BookPage />}
        />
        <Route
          path='/cd/:cdId/user/:userId'
          element={<CdPage />}
        />
        <Route
          path='*'
          element={<NotFoundPage />}
        />
        <Route
          path='/login'
          element={<LoginPage />}
        />
      </Route>
    </Routes>
  );
};
export default Router;
