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

interface DataListProps {
  datas: DataListInfo[];
  type: string;
  onDelete?: (deletedIds: string[]) => void;
  hasMore: boolean;
  isLoading: boolean;
  fetchMore: () => void;
  userId: number;
  totalCount?: number;
  setSearchInput?: (value: string) => void;
  count?: number;
}
