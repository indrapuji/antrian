/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface TheProps {
  loading: boolean;
}

const Loader = ({ loading }: TheProps) => {
  let show =
    'w-screen h-screen fixed top-0 left-0 z-50 bg-blue-gray-800 opacity-75';
  show += loading ? ' flex' : ' hidden';

  return (
    <div className={show}>
      <span className="text-white m-auto block relative">
        <svg
          className="animate-spin -ml-1 mr-3 h-14 w-14 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </span>
    </div>
  );
};

export default Loader;
