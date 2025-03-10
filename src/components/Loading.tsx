import loding from '@assets/loading.svg';

const Loading = () => {
  return (
    <div
      className='w-full h-screen bg-[#1E3675]/80 backdrop-blur-xs flex place-content-center relative z-99 '
    >
      <div className="container">
      <img src={loding} alt="loading" className="box box-1 w-30 h-30" />
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
      </div>
    </div>
  );
};

export default Loading;
