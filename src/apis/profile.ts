import axiosInstance from './axiosInstance';

const API_URL = 'mock';

export interface UpdateProfileRequest {
  nickname?: string;
  bio?: string;
  musicGenres?: string[];
  bookGenres?: string[];
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
   * @returns 사용자의 프로필 정보 (닉네임, 프로필 이미지, 자기소개, 취향, 추천 유저 등)
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
   * 프로필 정보 수정 (닉네임, 자기소개, 장르)
   * @param profileData - 수정할 프로필 정보
   */
  updateProfile: async (profileData: UpdateProfileRequest) => {
    const { data } = await axiosInstance.patch(
      `${API_URL}/users/profile`,
      profileData,
    );
    return data;
  },

  /**
   * 프로필 이미지 업로드
   * @param image - 업로드할 이미지 파일
   */
  uploadProfileImage: async (image: File) => {
    const formData = new FormData();
    formData.append('image', image);

    const { data } = await axiosInstance.post<{ imageUrl: string }>(
      `${API_URL}/users/profile/image`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return data;
  },

  /**
   * 프로필 이미지 수정
   * @param image - 수정할 이미지 파일
   */
  updateProfileImage: async (image: File) => {
    const formData = new FormData();
    formData.append('image', image);

    const { data } = await axiosInstance.put<{ imageUrl: string }>(
      `${API_URL}/users/profile/image`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return data;
  },
};
