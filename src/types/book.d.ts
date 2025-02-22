interface BookType {
  isbn?: string;
  title: string;
  author: string;
  publisher: string;
  publishedDate: string;
  imageUrl: string;
  category: string[];
  page?: string;
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
