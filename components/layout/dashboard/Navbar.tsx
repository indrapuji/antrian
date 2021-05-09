/* eslint-disable jsx-a11y/anchor-is-valid */
import { NavbarProps } from 'components/layout/dashboard/utils/interface';
import cookieCutter from 'cookie-cutter';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

const Navbar = ({
  isOpen,
  setOpen,
  isNavRightMenuUser,
  setNavRightMenuUser,
  isName,
  isLogo,
}: NavbarProps): JSX.Element => {
  const router = useRouter();

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    cookieCutter.set('token', '', { expires: new Date(0) });
    cookieCutter.set('nama', '', { expires: new Date(0) });
    cookieCutter.set('role', '', { expires: new Date(0) });
    cookieCutter.set('id', '', { expires: new Date(0) });
    router.push('/login');
  };

  return (
    <>
      <header className="h-16 flex items-center p-2 shadow bg-gradient-to-r from-indigo-500 via-blue-500 to-teal-500 text-cool-gray-100 text-shadow-sm">
        {/* eslint-disable prettier/prettier */}
        {!isOpen ? (
          <button
            className="w-10 p-2 focus:outline-none"
            type="button"
            tabIndex={0}
            aria-hidden={!isOpen}
            aria-label="Open menu"
            title="Open menu"
            onClick={() => setOpen(!isOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        ) : (
          <button
            className="w-10 p-2 focus:outline-none"
            type="button"
            aria-label="Close menu"
            title="Close menu"
            onClick={() => setOpen(!isOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}
        {/* eslint-enable prettier/prettier */}

        <div className="p-1 bg-white rounded-xl">
          <div className="relative h-8 w-8">
            <Image src={`/images/${isLogo}`} alt="" layout="fill" />
          </div>
        </div>

        <div className="hidden md:flex md:items-center md:ml-4 md:w-auto md:h-full md:text-2xl md:font-bold md:truncate">
          <p>{isName}</p>
        </div>

        <nav className="flex flex-grow items-center justify-end m-2">
          <div className="mx-2 relative">
            <button
              type="button"
              className="focus:outline-none tooltip inline-flex"
              onClick={(e) => handleLogout(e)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-5 w-5 mt-1 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span className="font-bold mt-1">Logout</span>
            </button>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
