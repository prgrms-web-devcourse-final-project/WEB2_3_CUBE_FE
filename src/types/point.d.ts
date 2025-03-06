interface PointHistory {
  amount: string;
  dateTime: string;
  id: number;
  reason: string; // enum
  type: string;
}

interface Points {
  history: [];
  balance: number;
  firstId: number;
  lastId: number;
  nextCursor: number | null;
  totalCount: number;
}

interface FilteredHistory {
  history: ['string', PointHistory[]];
}
