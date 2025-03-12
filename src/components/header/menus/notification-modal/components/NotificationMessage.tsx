
interface NotificationMessageProps {
  notification: Notification;
}

export const NotificationMessage = ({
  notification,
}: NotificationMessageProps) => {
  const nickName = (
    <span className='font-bold'>{notification.senderNickName}</span>
  );

  switch (notification.type) {
    case 'GUESTBOOK':
      return <>{nickName}님이 방명록을 남겼어요!</>;
    case 'MUSIC_COMMENT':
      return <>{nickName}님이 내 음악에 댓글을 남겼어요!</>;
    case 'EVENT':
      return <>내일 저녁 6시에 타임어택 이벤트가 있습니다!</>;
    case 'HOUSE_MATE':
      return <>{nickName}님이 하우스 메이트로 추가했어요!</>;
    case 'POINT':
      return <>출석 이벤트로 포인트를 획득했어요!</>;
    default:
      return <>{notification.content || ''}</>;
  }
};
