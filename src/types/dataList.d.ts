interface DataListInfo {
  id: string;
  title: string;
  artist?: string;
  author?: string;
  publisher?: string;
  album?: string;
  released_year: string;
}

interface CdDataListInfo {
  data: DataListInfo[];
  nextCursor: number;
  totalCount: number;
  firstMyCdId: number;
  lastMyCdId: number;
}
