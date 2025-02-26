import axiosInstance from './axiosInstance';

const API_URL = 'mock';

export interface UserProfileResponse {
  id: string;
  nickname: string;
  profileImage: string;
  bio: string;
  musicGenres: string[];
  bookGenres: string[];
  myProfile: boolean;
}

export interface RecommendedUserResponse {
  userId: string;
  nickname: string;
  profileImage: string;
}

export const profileAPI = {
  /**
   * 음악 장르 목록 조회
   * @returns 전체 음악 장르 목록
   * @example
   * const musicGenres = await profileAPI.getMusicGenres();
   * // ['HIPHOP', 'ROCK', 'JAZZ', ...]
   */
  getMusicGenres: async () => {
    const { data } = await axiosInstance.get<string[]>(
      `${API_URL}/users/music-genres`,
    );
    return data;
  },

  /**
   * 독서 장르 목록 조회
   * @returns 전체 독서 장르 목록
   * @example
   * const bookGenres = await profileAPI.getBookGenres();
   * // ['SF', 'ROMANCE', 'MYSTERY', ...]
   */
  getBookGenres: async () => {
    const { data } = await axiosInstance.get<string[]>(
      `${API_URL}/users/book-genres`,
    );
    return data;
  },

  /**
   * 특정 사용자의 프로필 정보 조회
   * @param userId - 조회할 사용자의 ID
   * @returns 사용자의 프로필 정보 (닉네임, 프로필 이미지, 자기소개, 취향 등)
   * @example
   * const userProfile = await profileAPI.getUserProfile('123');
   * // {
   * //   id: '123',
   * //   nickname: '찰스엔터',
   * //   profileImage: 'https://...',
   * //   bio: '내가 선생이야 누나야',
   * //   musicGenres: ['HIPHOP'],
   * //   bookGenres: ['SF'],
   * //   myProfile: false
   * // }
   */
  getUserProfile: async (userId: string) => {
    const { data } = await axiosInstance.get<UserProfileResponse>(
      `${API_URL}/users/${userId}`,
    );
    return data;
  },

  /**
   * 특정 사용자와 취향이 비슷한 추천 유저 목록 조회
   * @param userId - 기준이 되는 사용자의 ID
   * @returns 추천된 유저들의 정보 목록 (닉네임, 프로필 이미지)
   * @example
   * const recommendedUsers = await profileAPI.getRecommendedUsers('123');
   * // [
   * //   {
   * //     userId: '456',
   * //     nickname: '추천유저1',
   * //     profileImage: 'https://...'
   * //   },
   * //   ...
   * // ]
   */
  getRecommendedUsers: async (userId: string) => {
    const { data } = await axiosInstance.get<RecommendedUserResponse[]>(
      `${API_URL}/users/${userId}/recommendations`,
    );
    return data;
  },
};
