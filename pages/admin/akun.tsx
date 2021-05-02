/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
import LayoutDashboard from 'components/layout/dashboard';
import MetaSeo from 'components/MetaSeo';
import TitleColor from 'components/TitleColor';
// import Image from 'next/image';
// import Link from 'next/link';
import React from 'react';

const Antrian = () => {
  // const [toggleActive, setToggleActive] = useState(false);
  // console.log(toggleActive);

  return (
    <>
      <MetaSeo title="Dashboard" description="Admin User Antrian" />
      <LayoutDashboard>
        <div className="flex justify-center items-center m-0 p-0 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <TitleColor className="text-2xl m-0 p-0 ml-1" color="bg-dark">
            Informasi Akun
          </TitleColor>

          <div className="flex flex-grow items-center justify-end">&nbsp;</div>
        </div>

        <div className="card rounded-3xl mb-6">
          <div className="px-4 py-5 bg-white rounded-t-3xl sm:p-6">
            <label htmlFor="maxqueue" className="block font-bold mb-4">
              Username
            </label>
            <div className="mt-4 space-y-4">
              <input
                type="text"
                name="maxqueue"
                id="maxqueue"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="px-4 py-5 bg-white rounded-t-3xl sm:p-6">
            <label htmlFor="maxqueue" className="block font-bold mb-4">
              Nama
            </label>
            <div className="mt-4 space-y-4">
              <input
                type="text"
                name="maxqueue"
                id="maxqueue"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right rounded-b-3xl sm:px-6">
            <button type="submit" className="btn btn-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5 -mt-1 mr-1 inline-flex"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              Simpan
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center m-0 p-0 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 mr-1"
          >
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          <TitleColor className="text-2xl m-0 p-0 ml-1" color="bg-dark">
            Ubah Password
          </TitleColor>

          <div className="flex flex-grow items-center justify-end">&nbsp;</div>
        </div>

        <div className="card rounded-3xl">
          <div className="px-4 py-5 bg-white rounded-t-3xl sm:p-6">
            <label htmlFor="resetqueue" className="block font-bold mb-4">
              Password Lama
            </label>
            <input
              type="text"
              name="resetqueue"
              id="resetqueue"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="px-4 py-5 bg-white rounded-t-3xl sm:p-6">
            <label htmlFor="resetqueue" className="block font-bold mb-4">
              Password Baru
            </label>
            <input
              type="text"
              name="resetqueue"
              id="resetqueue"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="px-4 py-5 bg-white rounded-t-3xl sm:p-6">
            <label htmlFor="resetqueue" className="block font-bold mb-4">
              Konfirmasi Password Baru
            </label>
            <input
              type="text"
              name="resetqueue"
              id="resetqueue"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right rounded-b-3xl sm:px-6">
            <button type="submit" className="btn btn-danger">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5 -mt-1 mr-1 inline-flex"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              Simpan
            </button>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default Antrian;
