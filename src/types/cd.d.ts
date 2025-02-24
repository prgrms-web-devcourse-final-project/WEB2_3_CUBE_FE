interface CDInfo {
  trackId: string;
  title: string;
  artist: string;
  release_date: string;
  genres: string[];
  imgUrl: string;
}

interface CDSearch {
  id: string;
  name: string;
  artists: { name: string }[]; // 가수 정보가 배열로 옴
  album: {
    name: string;
    release_date: string;
    images: { url: string }[]; // 앨범 이미지도 배열
  };
}
