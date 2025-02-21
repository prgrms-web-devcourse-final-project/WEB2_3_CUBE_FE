import goPrevPage from '@assets/cd/go-prev-page.svg';
import goNextPage from '@assets/cd/go-next-page.svg';
import goFirstPage from '@assets/cd/go-first-page.svg';
import goLastPage from '@assets/cd/go-last-page.svg';

interface Pagination {
  currentPage: number;
  totalPage: number;
  onChangePage: (value: number) => void;
  color?: string;
}

export default function Pagination({
  currentPage,
  totalPage,
  onChangePage,
  color,
}: Pagination) {
  const startNum = Math.max(currentPage - 1, 1);
  const endNum = Math.min(currentPage + 1, totalPage);
  const pageNumberArr = Array.from(
    { length: endNum - startNum + 1 },
    (_, index) => startNum + index,
  );

  return (
    <div className='flex items-center justify-evenly pb-5 '>
      <button
        disabled={currentPage === 1}
        onClick={() => onChangePage(1)}>
        <img
          src={goFirstPage}
          alt='첫 페이지로 가는 버튼'
        />
      </button>

      <button
        disabled={currentPage === 1}
        onClick={() => onChangePage(currentPage - 1)}>
        <img
          src={goPrevPage}
          alt='이전 페이지로 가는 버튼'
        />
      </button>
      {currentPage - 3 > 0 && <p>...</p>}
      {pageNumberArr.map((page, index) => (
        <button
          style={{
            backgroundColor: currentPage === page ? color : 'transparent',
          }}
          className={`p-2 rounded-full w-8 h-8  item-middle`}
          onClick={() => onChangePage(page)}
          key={index}>
          {page}
        </button>
      ))}
      {currentPage + 3 <= totalPage && <p>...</p>}
      <button
        disabled={currentPage === totalPage}
        onClick={() => onChangePage(currentPage + 1)}>
        <img
          src={goNextPage}
          alt='다음 페이지로 가는 버튼'
        />
      </button>
      <button
        disabled={currentPage === totalPage}
        onClick={() => onChangePage(totalPage)}>
        <img
          src={goLastPage}
          alt='마지막 페이지로 가는 버튼'
        />
      </button>
    </div>
  );
}
