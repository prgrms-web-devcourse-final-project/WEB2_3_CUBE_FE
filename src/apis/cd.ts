import axios from 'axios';
import axiosInstance from './axiosInstance';

const API_URL = 'api';
const SPOTIFY_API_KEY = import.meta.env.VITE_SPOTIFY_ID;
const SPOTIFY_SECRET_KEY = import.meta.env.VITE_SPOTIFY_SECRET_KEY;
const YOUTUBE_API_KEYS = import.meta.env.VITE_YOUTUBE_KEY.split(',');

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

// 해당 노래의 제목과 관련된 youtube api의 ㅊofficial, lyrics 영상 url 가져오기
export const getYoutubeUrl = async (trackTitle: string, artistName: string) => {
  // console.log(trackTitle, artistName);

  const encodedQuery = encodeURIComponent(
    `${trackTitle} ${artistName} "official audio" OR "lyrics" `,
  );
  let apiKeyIndex = 0; //  API 키 인덱스 관리

  while (apiKeyIndex < YOUTUBE_API_KEYS.length) {
    const currentApiKey = YOUTUBE_API_KEYS[apiKeyIndex];
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodedQuery}&type=video&videoCategoryId=10&key=${currentApiKey}`,
      );
      const videos = response.data.items;

      if (!videos || videos.length === 0) {
        console.error('유튜브에서 관련 영상을 찾지 못함.');
        return { youtubeUrl: '', duration: 0 }; // 에러 시 기본값 반환
      }

      // 좀더 테스트해봐야할듯..정확성이 부족함
      const videosOnlySong = videos.find((video: any) => {
        const title = video.snippet.title
          .replace(/[^a-zA-Z0-9\s]/g, '')
          .toLowerCase();
        const channelTitle = video.snippet.channelTitle
          .replace(/[^a-zA-Z0-9\s]/g, '')
          .toLowerCase();
        const description = video.snippet.description
          .replace(/[^a-zA-Z0-9\s]/g, '')
          .toLowerCase();
        //  목소리 없는 노래만 나오는 영상 제외하기 위한 키워드
        const instrumentalKeywords = [
          'instrumental',
          'no vocals',
          'karaoke',
          'backing track',
          'instrumental version',
          'no voice',
          'music only',
        ];
        // 제목이나 설명에 instrumental 관련 키워드가 있는지 확인
        const isInstrumental = instrumentalKeywords.some(
          (keyword) => title.includes(keyword) || description.includes(keyword),
        );

        //영상 필터링 처리
        return (
          title.includes('official audio') ||
          title.includes('lyrics') ||
          channelTitle.includes('topic') ||
          channelTitle.includes('vevo') ||
          channelTitle.includes('official') ||
          (title.includes(trackTitle.toLowerCase()) &&
            channelTitle.includes(artistName.toLowerCase()) &&
            !title.includes('live') &&
            !title.includes('performance') &&
            !title.includes('mv') &&
            !isInstrumental) // 목소리 없는 노래만 나오는 영상 제외
        );
      });

      // // console.log(videosOnlySong);

      // 노래만 나오는 영상이 없는 경우
      if (!videosOnlySong) {
        console.error(' 적합한 영상을 찾지 못함. 하지만 API 키 변경 안 함.');
        return { youtubeUrl: '', duration: 0 }; // 에러 시 기본값 반환
      }

      // 영상 재생시간 가져오기
      const videoDetailsResponse = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videosOnlySong.id.videoId}&key=${currentApiKey}`,
      );

      const duration =
        videoDetailsResponse.data.items[0]?.contentDetails?.duration || 'PT0S';

      // ISO 8601 duration 형식 (예: PT3M15S)을 초 단위로 변환
      const durationInSeconds = parseDurationToSeconds(duration);

      //  특정 길이 이상(예: 30초 미만)일 경우 신뢰도 낮다고 판단
      if (durationInSeconds < 30) {
        console.error('❌ 영상 길이가 너무 짧아서 제외됨.');
        return { youtubeUrl: '', duration: 0 };
      }

      return {
        youtubeUrl: `https://www.youtube.com/watch?v=${videosOnlySong.id.videoId}`,
        duration: durationInSeconds,
      };
    } catch (error) {
      console.error(`🚨 ${apiKeyIndex}번째 API키 실패:`, error);
      apiKeyIndex++; // 다음 API 키로 변경
    }
  }
  console.error('🚨 모든 YouTube API 키가 실패했습니다.');
  return { youtubeUrl: '', duration: 0 }; // 에러 시 기본값 반환
};

// spotify api의 가수와 관련된 장르 가져오기
const getArtistsGenres = async (artistId: string, token: string) => {
  const response = await axios.get(
    `https://api.spotify.com/v1/artists/${artistId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  // 장르는 3개만
  return response.data.genres.slice(0, 3) || [];
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
    const url = `https://api.spotify.com/v1/search?q=${encodedQuery}&type=track&market=KR&limit=50`;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // 올바른 앨범 이미지, 발매일 필터링
    const filteredItems = data.tracks.items
      .filter((music: CDSearch) => {
        const releaseDate = music.album.release_date;
        const albumImage =
          music.album.images?.[0]?.url ||
          music.album.images?.[1]?.url ||
          music.album.images?.[2]?.url ||
          '';
        return (
          releaseDate &&
          /^\d{4}-\d{2}-\d{2}$/.test(releaseDate) &&
          albumImage !== ''
        );
      })
      .slice(0, 10); // 🎯 필터링 후 10개만 남기기

    const searchedCdInfo = await Promise.all(
      filteredItems.map(async (music: CDSearch) => {
        const artistId = music.artists[0]?.id;

        const genres = artistId
          ? await getArtistsGenres(artistId, token)
          : await Promise.resolve([]);

        return {
          id: music.id,
          title: music.name || 'Unknwn Title',
          artist: music.artists[0]?.name || 'Unknown Artist',
          album_title: music.album.name || 'Unknown Album',
          date: music.album.release_date,
          imageUrl: music.album.images?.[0]?.url || '',
          type: 'CD' as const,
          genres: genres,
        };
      }),
    );
    return searchedCdInfo;
  } catch (error) {
    console.error('스포티파이 API 호출 오류:', error);
    throw error;
  }
};

// -------------------- cd API ------------------------
/**
 *
 * @param targetUserId 조회 대상 id
 * @param size  페이지 크기
 * @param cursor 마지막으로 조회한 Cd id (첫 페이지 조회 시 제외)
 *
 * @returns cd 목록
 *
 *
 */
export const getCdRack = async (
  targetUserId: number,
  size?: number,
  cursor?: number,
) => {
  const url = cursor
    ? `/${API_URL}/my-cd?targetUserId=${targetUserId}&size=${
        size || 14
      }&cursor=${cursor}`
    : `/${API_URL}/my-cd?targetUserId=${targetUserId}&size=${size || 14}`;

  const response = await axiosInstance.get(url);

  return response.data;
};

/**
 *
 * @param targetUserId  조회 대상 id
 * @param keyword 키워드
 * @param size  페이지 크기
 * @param cursor 마지막으로 조회한 Cd id (첫 페이지 조회 시 제외)
 * @returns
 */
export const getCdRackSearch = async (
  targetUserId: number,
  keyword: string,
  size?: number,
  cursor?: number,
) => {
  const url = cursor
    ? `/${API_URL}/my-cd?targetUserId=${targetUserId}&size=${
        size || 14
      }&keyword=${keyword}&cursor=${cursor}`
    : `/${API_URL}/my-cd?size=${size || 14}&keyword=${keyword}`;

  const response = await axiosInstance.get(url);

  return response.data;
};

/**
 *
 * @param myCdId 사용자의 고유cdId
 * @param targetUserId 조회대상 id
 * @returns
 */
export const getCdInfo = async (myCdId: number, targetUserId: number) => {
  const response = await axiosInstance(
    `/${API_URL}/my-cd/${myCdId}?targetUserId=${targetUserId}`,
  );
  return response.data;
};

/**
 * @param cdData 추가할 cd 정보
 * @returns 추가한 cd 상세정보
 */
export const addCdToMyRack = async (cdData: PostCDInfo) => {
  const response = await axiosInstance.post(`/${API_URL}/my-cd`, cdData);
  return response.data;
};

/**
 * CD 삭제 API
 * @param myCdIds 삭제할 CD ID 목록 (쉼표로 구분된 문자열)
 * @returns
 */
export const deleteCdsFromMyRack = async (myCdIds: number[]) => {
  const response = await axiosInstance.delete(
    `/${API_URL}/my-cd?myCdIds=${myCdIds}`,
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
 * @param contents 템플릿에 담긴 4가지 댓글 내용들
 * @returns
 */
export const addCdTemplate = async (
  myCdId: number,
  contents: {
    comment1: string;
    comment2: string;
    comment3: string;
    comment4: string;
  },
) => {
  const response = await axiosInstance.post(
    `/${API_URL}/my-cd/${myCdId}/template`,
    contents,
  );
  return response.data;
};

/**
 *
 * @param myCdId 특정 cd에대한 사용자 고유ID
 * @param contents 템플릿에 담긴 4가지 댓글 내용들
 * @returns
 */
export const updateTemplate = async (
  myCdId: number,
  contents: {
    comment1: string;
    comment2: string;
    comment3: string;
    comment4: string;
  },
) => {
  const response = await axiosInstance.patch(
    `/${API_URL}/my-cd/${myCdId}/template`,
    contents,
  );
  return response.data;
};

export const deleteTemplate = async (myCdId: number) => {
  const response = await axiosInstance.delete(
    `/${API_URL}/my-cd/${myCdId}/template`,
  );
  return response;
};

// ------------------------cd 댓글 API--------------------------

export const addCdComment = async (
  myCdId: number,
  commentInfo: CdCommentPost,
) => {
  const response = await axiosInstance.post(
    `/${API_URL}/my-cd/${myCdId}/comments`,
    commentInfo,
  );
  return response.data;
};

export const getCdComment = async (
  myCdId: number,
  page?: number,
  size?: number,
  keyword?: string,
) => {
  const response = await axiosInstance.get(
    keyword
      ? `/${API_URL}/my-cd/${myCdId}/comments?page=${page}&size=${size}&keyword=${keyword}`
      : `/${API_URL}/my-cd/${myCdId}/comments?page=${page}&size=${size}`,
  );
  return response.data;
};

export const getCdCommentAll = async (myCdId: number) => {
  const response = await axiosInstance.get(
    `/${API_URL}/my-cd/${myCdId}/comments/all`,
  );
  return response.data;
};

export const deleteCdComment = async (myCdId: number, commentId: number) => {
  const response = await axiosInstance.delete(
    `/${API_URL}/my-cd/${myCdId}/comments/${commentId}`,
  );
  return response;
};

// ------------ CD  레벨 업그레이드 -----------------

/**
 * CD 업그레이드
 * @param roomId 방 ID
 * @returns
 */

export const upgradeCdLevel = async (roomId: number) => {
  const response = await axiosInstance.patch(
    `/${API_URL}/rooms/${roomId}/furniture/cd-rack/upgrade`,
  );
  return response.data;
};
