/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

const Loader = () => {
  return (
    <>
      <div className="text-center h-16">
        <div className="inline-flex text-center">
          Made with&nbsp;
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-6 h-6 text-pink-500"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
          &nbsp; by&nbsp;
          <a
            href="mailto:dwi.setiyadi@gmail.com"
            className="text-lightBlue-500 font-semibold"
          >
            dwi.setiyadi@gmail.com
          </a>
        </div>
      </div>
    </>
  );
};

export default Loader;
