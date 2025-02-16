import { SearchModal } from "@components/search-modal/SearchModal";

const BookPage = () => {
  return (
    <div className="bg-blue-100 h-screen">
      BookPage
      <SearchModal
        title='책장에 담을 책 찾기'
        type='BOOK'
        onClose={() => {}}
      />
    </div>
  );
};

export default BookPage;
