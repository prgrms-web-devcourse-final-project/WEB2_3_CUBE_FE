import axiosInstance from './axiosInstance';

const API_URL = 'api';

export const housemateAPI = {
  /**
   * 하우스메이트 팔로잉 목록 조회
   * @param cursor - 페이지네이션 커서 (마지막으로 받은 userId)
   * @param limit - 한 페이지당 조회할 메이트 수 (1-100)
   * @param nickname - 닉네임으로 검색
   * @returns 팔로잉 목록 조회 결과
   * @example
   * const result = await housemateAPI.getFollowing(10, 20, "김철수");
   */
  getFollowing: async (
    cursor?: number,
    limit: number = 20,
    nickname?: string,
  ) => {
    const params = new URLSearchParams();
    if (cursor) params.append('cursor', cursor.toString());
    if (limit) params.append('limit', limit.toString());
    if (nickname) params.append('nickname', nickname);

    const response = await axiosInstance.get(`/${API_URL}/mates/following`, {
      params,
    });
    return response.data;
  },

  /**
   * 하우스메이트 팔로워 목록 조회
   * @param cursor - 페이지네이션 커서 (마지막으로 받은 userId)
   * @param limit - 한 페이지당 조회할 메이트 수 (1-100)
   * @param nickname - 닉네임으로 검색
   * @returns 팔로워 목록 조회 결과
   * @example
   * const result = await housemateAPI.getFollowers(10, 20, "김철수");
   */
  getFollowers: async (
    cursor?: number,
    limit: number = 20,
    nickname?: string,
  ) => {
    const params = new URLSearchParams();
    if (cursor) params.append('cursor', cursor.toString());
    if (limit) params.append('limit', limit.toString());
    if (nickname) params.append('nickname', nickname);

    const response = await axiosInstance.get(`/${API_URL}/mates/followers`, {
      params,
    });
    return response.data;
  },

  /**
   * 하우스메이트 팔로우
   * @param targetId - 팔로우할 사용자의 ID
   * @returns 팔로우 성공 여부
   * @throws {Error} 400 - 유효하지 않은 사용자 ID / 하우스메이트로 추가되지 않은 사용자
   * @throws {Error} 404 - 존재하지 않는 사용자
   * @throws {Error} 409 - 이미 팔로우한 하우스메이트
   * @example
   * const result = await housemateAPI.followHousemate(1);
   */
  followHousemate: async (targetId: number) => {
    const response = await axiosInstance.post(
      `/${API_URL}/mates/${targetId}`,
    );
    return response.data;
  },

  /**
   * 하우스메이트 언팔로우
   * @param targetId - 언팔로우할 사용자의 ID
   * @returns 언팔로우 성공 여부
   * @throws {Error} 400 - 유효하지 않은 사용자 ID / 하우스메이트로 추가되지 않은 사용자
   * @throws {Error} 404 - 존재하지 않는 사용자
   * @example
   * const result = await housemateAPI.unfollowHousemate(1);
   */
  unfollowHousemate: async (targetId: number) => {
    const response = await axiosInstance.delete(
      `/${API_URL}/mates/${targetId}`,
    );
    return response.data;
  },
};
