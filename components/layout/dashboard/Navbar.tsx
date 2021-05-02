/* eslint-disable jsx-a11y/anchor-is-valid */
import { NavbarProps } from 'components/layout/dashboard/utils/interface';
import cookieCutter from 'cookie-cutter';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const Navbar = ({
  isOpen,
  setOpen,
  isNavRightMenuUser,
  setNavRightMenuUser,
}: NavbarProps): JSX.Element => {
  const router = useRouter();

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    cookieCutter.set('token', '', { expires: new Date(0) });
    cookieCutter.set('nama', '', { expires: new Date(0) });
    cookieCutter.set('role', '', { expires: new Date(0) });
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
            <Image src="/images/daihatsu.png" alt="" layout="fill" />
          </div>
        </div>

        <div className="hidden md:flex md:items-center md:ml-4 md:w-auto md:h-full md:text-2xl md:font-bold md:truncate">
          Klinik Sehat
        </div>

        <nav className="flex flex-grow items-center justify-end m-2">
          {/* 
          <div className="mx-2 relative">
            <Link href="/">
              <button type="button" className="focus:outline-none tooltip">
                <svg
                  className="h-10 w-10 p-2 mt-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </Link>
          </div>

          <div className="mx-2 relative">
            <Link href="/">
              <button type="button" className="focus:outline-none tooltip">
                <span className="relative inline-block">
                  <svg
                    className="h-10 w-10 p-2 mt-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="absolute top-4 right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    99
                  </span>
                </span>
              </button>
            </Link>
          </div>
          */}

          {/* <!-- Profile dropdown --> */}
          {/*
          <div className="ml-2 relative">
            <div>
              <button
                className="flex items-center focus:outline-none tooltip"
                type="button"
                id="user-menu"
                aria-haspopup="true"
                onClick={() => setNavRightMenuUser(!isNavRightMenuUser)}
              >
                <span className="sr-only">Open user menu</span>
                <div className="relative w-8 h-8">
                  <Image
                    src="/images/photo-dummy-1.jpg"
                    alt=""
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
                <strong className="hidden md:block md:ml-6 md:truncate">
                  Jhon Doe
                </strong>
              </button>
            </div>

            <Transition
              show={isNavRightMenuUser}
              enter="transition ease-out duration-400"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-100"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <div
                className="origin-top-right absolute z-20 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white text-cool-gray-600 ring-1 ring-black ring-opacity-5"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu"
              >
                <a
                  href="#"
                  className="flex items-center px-4 py-2 hover:bg-cool-gray-100"
                  role="menuitem"
                >
                  <svg
                    className="h-8 w-8 p-2 text-light-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Data diri
                </a>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 hover:bg-cool-gray-100"
                  role="menuitem"
                >
                  <svg
                    className="h-8 w-8 p-2 text-light-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                  Pengaturan
                </a>
                <Link href="/login">
                  <a
                    href="/login"
                    className="flex items-center px-4 py-2 hover:bg-cool-gray-100"
                    role="menuitem"
                  >
                    <svg
                      className="h-8 w-8 p-2 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Logout
                  </a>
                </Link>
              </div>
            </Transition>
          </div>
          */}

          <div className="mx-2 relative">
            <Link href="/login">
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
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
