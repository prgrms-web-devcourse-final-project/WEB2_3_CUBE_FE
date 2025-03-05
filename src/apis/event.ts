import axiosInstance from './axiosInstance';

const API_URL = 'api';

/**
 *
 * @param eventId  참여할 이벤트 id
 * @returns
 */
export const addEventJoin = async (eventId: number) => {
  const response = await axiosInstance.post(
    `/${API_URL}/events/${eventId}/join`,
  );
  return response.data;
};

export const getOngoingEvent = async () => {
  const response = await axiosInstance.get(`/${API_URL}/events/ongoing`);
  return response.data;
};
