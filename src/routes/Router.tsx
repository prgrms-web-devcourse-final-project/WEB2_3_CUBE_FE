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
import ProfileCardPage from '@pages/profile-card/ProfileCardPage';
import ProfileCardEditPage from '@pages/profile-card-edit/ProfileCardEditPage';
import Redirection from '@pages/login/components/Redirection';
import EventPage from '@pages/event/EventPage';
import PointPage from '@pages/point/PointPage';
import PaymentPage from '@pages/payment/PaymentPage';
import PaymentSuccessPage from '@pages/payment/PaymentSuccessPage';
import PaymentFailPage from '@pages/payment/PaymentFailPage';

const Router = () => {
  return (
    <Routes>
      <Route
        path='/oauth/callback'
        element={<Redirection />}
      />
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
          path='/point/:userId'
          element={<PointPage />}
        />
        <Route
          path='/payment'
          element={<PaymentPage />}
        />

      </Route>
      {/* 내 서평 보기/작성/수정 */}
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
        path='/cd/:cdId/user/:userId'
        element={<CdPage />}
      />
      <Route
        path='*'
        element={<NotFoundPage />}
      />
      <Route
        path='/event'
        element={<EventPage />}
      />
      <Route
        path='/login'
        element={<LoginPage />}
      />
      <Route
        path='/payment/success'
        element={<PaymentSuccessPage />}
      />
      <Route
        path='/payment/fail'
        element={<PaymentFailPage />}
      />
    </Routes>
  );
};
export default Router;
