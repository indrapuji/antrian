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
              strokeWidth="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <TitleColor className="text-2xl m-0 p-0 ml-1" color="bg-dark">
            Antrian
          </TitleColor>

          <div className="flex flex-grow items-center justify-end">&nbsp;</div>
        </div>

        <div className="card rounded-3xl mb-6">
          <div className="px-4 py-5 bg-white rounded-t-3xl sm:p-6">
            <div className="font-bold mb-4">Status Sistem Antrian</div>
            <div className="mt-4 space-y-4">
              <div className="flex items-center">
                <input
                  id="openqueue"
                  name="openqueue"
                  type="radio"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label
                  htmlFor="openqueue"
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  Buka
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="openqueue"
                  name="openqueue"
                  type="radio"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label
                  htmlFor="closequeue"
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  Tutup
                </label>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right rounded-b-3xl sm:px-6">
            <button type="submit" className="btn btn-warning">
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

        <div className="card rounded-3xl mb-6">
          <div className="px-4 py-5 bg-white rounded-t-3xl sm:p-6">
            <label htmlFor="maxqueue" className="block font-bold mb-4">
              Batas Maksimal Antrian
            </label>
            <div className="mt-4 space-y-4">
              <input
                type="number"
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

        <div className="card rounded-3xl">
          <div className="px-4 py-5 bg-white rounded-t-3xl sm:p-6">
            <label htmlFor="resetqueue" className="block font-bold mb-4">
              Start / Reset Antrian
            </label>
            <input
              type="number"
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
