interface BookType {
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  publishedDate: string;
  imageUrl: string;
  genreNames: string[];
  page: string;
}

interface ReviewType {
  title: string;
  quote: string;
  takeaway: string;
  freeFormText: string;
  motive: string;
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
};

