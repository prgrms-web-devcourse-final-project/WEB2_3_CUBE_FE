interface BookType {
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  publishedDate: string;
  imageUrl: string;
  genreNames: string[];
  page: number;
}

interface ReviewType {
  title: string;
  quote: string;
  takeaway: string;
  freeFormText: string;
  motivate: string;
  topic: string;
  coverColor: string;
}

interface BookCaseListType {
  id: number;
  title: string;
  author: string;
  publisher: string;
  publishedDate: string;
  imageURL: string;
  category: string;
  page: number;
}
