interface BookListIconProps {
  fill?: string;
  className?: string;
}

const BookListIcon = ({
  fill = 'white',
  className = '',
}: BookListIconProps) => {
  return (
    <svg
      width='26'
      height='26'
      viewBox='0 0 26 26'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <g clip-path='url(#clip0_324_3277)'>
        <path
          className={className}
          fill-rule='evenodd'
          clip-rule='evenodd'
          d='M0 3.59051C0 2.10331 1.20561 0.897705 2.6928 0.897705H22.44C23.9271 0.897705 25.1328 2.10331 25.1328 3.59051V6.28331C25.1328 7.7705 23.9271 8.97611 22.44 8.97611H2.6928C1.20561 8.97611 0 7.7705 0 6.28331V3.59051ZM23.3376 11.2201H1.7952V21.5425C1.7952 23.0296 3.0008 24.2353 4.488 24.2353H20.6448C22.1319 24.2353 23.3376 23.0296 23.3376 21.5425V11.2201ZM9.8736 14.1373C9.25393 14.1373 8.7516 14.6396 8.7516 15.2593C8.7516 15.879 9.25393 16.3813 9.8736 16.3813H15.2592C15.8789 16.3813 16.3812 15.879 16.3812 15.2593C16.3812 14.6396 15.8789 14.1373 15.2592 14.1373H9.8736Z'
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id='clip0_324_3277'>
          <rect
            width='25.1328'
            height='25.1328'
            fill='white'
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default BookListIcon;
