import axios from 'axios';
import axiosInstance from './axiosInstance';

const API_URL = 'api';
const SPOTIFY_API_KEY = import.meta.env.VITE_SPOTIFY_ID;
const SPOTIFY_SECRET_KEY = import.meta.env.VITE_SPOTIFY_SECRET_KEY;
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_KEY;

// ------------------------------  SPOTIFY & YOUTUBE 검색  API ------------------------------

// 스포티파이 토큰 받기
const getSpotifyToken = async () => {
  const auth = btoa(`${SPOTIFY_API_KEY}:${SPOTIFY_SECRET_KEY}`);

  const res = await axios.post(
    'https://accounts.spotify.com/api/token',
    'grant_type=client_credentials',
    {
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
  return res.data.access_token;
};

// ISO 8601 형식의 duration을 초 단위로 변환하는 함수
const parseDurationToSeconds = (isoDuration: string): number => {
  const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  if (!match) return 0;
  const hours = parseInt(match[1] || '0', 10) || 0;
  const minutes = parseInt(match[2] || '0', 10) || 0;
  const seconds = parseInt(match[3] || '0', 10) || 0;

  return hours * 3600 + minutes * 60 + seconds;
};

/**
 *
 * @param searchQuery 입력된 값
 * @returns
 */
export const searchSpotifyCds = async (
  searchQuery: string,
): Promise<SearchItemType[]> => {
  if (!searchQuery.trim()) return [];

  try {
    // spotify api로 검색어와 관련된 기본 정보 가져오기
    const token = await getSpotifyToken();
    const encodedQuery = encodeURIComponent(searchQuery);
    const url = `https://api.spotify.com/v1/search?q=${encodedQuery}&type=track&market=KR&limit=3`;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // spotify api의 가수와 관련된 장르 가져오기
    const getArtistsGenres = async (artistId: string) => {
      const response = await axios.get(
        `https://api.spotify.com/v1/artists/${artistId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data.genres || [];
    };

    // youtube api의 해당 노래의 제목과 관련된 official, lyrics 영상 url 가져오기
    const getYoutubeUrl = async (trackTitle: string, artistName: string) => {
      const encodedQuery = encodeURIComponent(
        `${trackTitle} ${artistName} official audio OR lyrics `,
      );
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodedQuery}&type=video&videoCategoryId=10&key=${YOUTUBE_API_KEY}`,
        );
        const videos = response.data.items;

        if (!videos || videos.length === 0) {
          throw new Error('❌ 유튜브에서 관련 영상을 찾을 수 없음.');
        }

        // 좀더 테스트해봐야할듯..정확성이 부족함
        const videosOnlySong = videos.find((video: any) => {
          const title = video.snippet.title
            .replace(/[^a-zA-Z0-9\s]/g, '')
            .toLowerCase();
          const channelTitle = video.snippet.channelTitle
            .replace(/[^a-zA-Z0-9\s]/g, '')
            .toLowerCase();

          //영상 필터링 처리
          return (
            // ✅ "official audio", "lyrics", "topic" 키워드 포함 → 신뢰도 높음
            title.includes('official audio') ||
            title.includes('lyrics') ||
            channelTitle.includes('topic') ||
            channelTitle.includes('vevo') ||
            channelTitle.includes('official') ||
            // ✅ 아티스트 이름이 채널 제목 또는 영상 제목에 포함된 경우
            (title.includes(trackTitle.toLowerCase()) &&
              channelTitle.includes(artistName.toLowerCase()) &&
              // ❌ "live", "performance", "mv" 포함된 영상 제거
              !title.includes('live') &&
              !title.includes('performance') &&
              !title.includes('mv'))
          );
        });
        // 적합한 영상이 없는 경우
        if (!videosOnlySong) {
          throw new Error('❌ 공식 오디오 영상 찾기 실패.');
        }
        console.log(videosOnlySong);

        // 영상의 재생시간 가져오기
        const videoDetailsResponse = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videosOnlySong.id.videoId}&key=${YOUTUBE_API_KEY}`,
        );

        const duration =
          videoDetailsResponse.data.items[0]?.contentDetails?.duration ||
          'PT0S';

        // ISO 8601 duration 형식 (예: PT3M15S)을 초 단위로 변환
        const durationInSeconds = parseDurationToSeconds(duration);

        // 🎯 특정 길이 이상(예: 30초 미만)일 경우 신뢰도 낮다고 판단
        if (durationInSeconds < 30) {
          throw new Error('❌ 영상 길이가 너무 짧아서 제외됨.');
        }

        return {
          youtubeUrl: `https://www.youtube.com/watch?v=${videosOnlySong.id.videoId}`,
          duration: durationInSeconds,
        };
      } catch (error) {
        console.error('🚨 YouTube API 호출 실패:', error);
        return { youtubeUrl: '', duration: 0 }; // 에러 시 기본값 반환
      }
    };

    const trackInfo = await Promise.all(
      data.tracks.items.map(async (music: CDSearch) => {
        const artistId = music.artists[0]?.id;
        const genres = artistId ? await getArtistsGenres(artistId) : [];
        const { youtubeUrl, duration } = await getYoutubeUrl(
          music.name,
          music.artists[0]?.name,
        );

        return {
          id: music.id,
          title: music.name,
          artist: music.artists[0]?.name || 'Unknown Artist',
          album_title: music.album.name,
          date: music.album.release_date,
          imageUrl:
            music.album.images?.[0]?.url || music.album.images?.[1]?.url || '',
          type: 'CD' as const,
          genres: genres,
          youtubeUrl: youtubeUrl || '유튜브 영상이 없을때 보여줄 url',
          duration: duration,
        };
      }),
    );
    return trackInfo;
  } catch (error) {
    console.error('스포티파이 API 호출 오류:', error);
    throw error;
  }
};

// -------------------- cd API ------------------------
/**
 *
 * @param userId 사용자의 고유한 id
 * @param size  페이지 크기
 * @param cursor 마지막으로 조회한 Cd id (첫 페이지 조회 시 제외)
 * @param keyword 검색 입력값
 *
 * @returns cd 목록
 *
 *
 */
export const getCdRack = async (
  userId: number,
  size?: number,
  cursor?: number,
) => {
  const url = cursor
    ? `/${API_URL}/my-cd?userId=${userId}&size=${size || 14}&cursor=${cursor}`
    : `/${API_URL}/my-cd?userId=${userId}&size=${size || 14}`;

  const response = await axiosInstance.get(url);

  return response.data;
};

export const getCdRackSearch = async (
  userId: number,
  keyword: string,
  size?: number,
  cursor?: number,
) => {
  const url = cursor
    ? `/${API_URL}/my-cd?userId=${userId}&keyword=${keyword}&size=${size}&cursor=${cursor}`
    : `/${API_URL}/my-cd?userId=${userId}&keyword=${keyword}&size=${size}`;

  const response = await axiosInstance.get(url);

  return response.data;
};

/**
 *
 * @param myCdId 사용자의 고유cdId
 * @param userId 사용자 id
 * @returns
 */
export const getCdInfo = async (myCdId: number, userId: number) => {
  const response = await axiosInstance(
    `/${API_URL}/my-cd/${myCdId}?userId=${userId}`,
  );
  return response.data;
};

/**
 * @param cdData 추가할 cd 정보
 * @param userId cd를 추가할 사용자id
 * @returns 추가한 cd 상세정보
 */
export const addCdToMyRack = async (userId: number, cdData: PostCDInfo) => {
  const response = await axiosInstance.post(
    `/${API_URL}/my-cd?userId=${userId}`,
    cdData,
  );
  console.log(response.data);
  return response.data;
};

/**
 * CD 삭제 API
 * @param userId 사용자 ID
 * @param myCdIds 삭제할 CD ID 목록 (쉼표로 구분된 문자열)
 * @returns
 */
export const deleteCdsFromMyRack = async (userId: number, myCdIds: string) => {
  const response = await axiosInstance.delete(
    `/${API_URL}/my-cd?userId=${userId}&myCdIds=${myCdIds}`,
  );
  return response.data;
};

//  ------------- cd 템플릿 CRUD ------------

/**
 * 
 * @param myCdId 특정 cd에대한 사용자 고유ID
 * @returns 

 */
export const getCdTemplate = async (myCdId: number) => {
  const response = await axiosInstance.get(
    `/${API_URL}/my-cd/${myCdId}/template`,
  );
  return response.data;
};

/**
 *
 * @param myCdId 특정 cd에대한 사용자 고유ID
 * @param userId 사용자 ID
 * @param contents 템플릿에 담긴 4가지 댓글 내용들
 * @returns
 */
export const addCdTemplate = async (
  myCdId: number,
  userId: number,
  contents: {
    comment1: string;
    comment2: string;
    comment3: string;
    comment4: string;
  },
) => {
  const response = await axiosInstance.post(
    `/${API_URL}/my-cd/${myCdId}/template?userId=${userId}`,
    contents,
  );
  return response.data;
};

/**
 *
 * @param myCdId 특정 cd에대한 사용자 고유ID
 * @param userId 사용자 ID
 * @param contents 템플릿에 담긴 4가지 댓글 내용들
 * @returns
 */
export const updateTemplate = async (
  myCdId: number,
  userId: number,
  contents: {
    comment1: string;
    comment2: string;
    comment3: string;
    comment4: string;
  },
) => {
  const response = await axiosInstance.patch(
    `/${API_URL}/my-cd/${myCdId}/template?userId=${userId}`,
    contents,
  );
  return response.data;
};

export const deleteTemplate = async (myCdId: number, userId: number) => {
  const response = await axiosInstance.delete(
    `/${API_URL}/my-cd/${myCdId}/template?userId=${userId}`,
  );
  return response;
};

// -------------cd 댓글 API---------------

export const addCdComment = async (
  userId: number,
  myCdId: number,
  commentInfo: CdCommentPost,
) => {
  const response = await axiosInstance.post(
    `/${API_URL}/my-cd/${myCdId}/comment?userId=${userId}`,
    commentInfo,
  );
  return response.data;
};

export const getCdComment = async (
  myCdId: number,
  page?: number,
  size?: number,
) => {
  const response = await axiosInstance.get(
    `/${API_URL}/my-cd/${myCdId}/comments?page=${page}&size=${size}`,
  );
  return response.data;
};

export const getCdCommentAll = async (myCdId: number) => {
  const response = await axiosInstance.get(
    `/${API_URL}/my-cd/${myCdId}/comments/all`,
  );
  return response.data;
};

export const getCdCommentSearch = async (
  myCdId: number,
  query: string,
  page?: number,
  size?: number,
) => {
  const response = await axiosInstance.get(
    `/${API_URL}/my-cd/${myCdId}/comments/search?query=${query}&page=${page}&size=${size}`,
  );
  return response.data;
};

export const deleteCdComment = async (userId: number, commentId: number) => {
  const response = await axiosInstance.delete(
    `/${API_URL}/my-cd/comments/${commentId}?userId=${userId}`,
  );
  return response;
};
