interface EventInfo {
  eventName: string;
  eventTime: string;
  id: number;
  maxParticipants: number;
  rewardPoints: number;
}

type JoinStatus = 'idle' | 'joining' | 'success' | 'fail';
