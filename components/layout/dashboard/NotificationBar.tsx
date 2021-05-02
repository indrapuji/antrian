/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface TheProps {
  show: boolean;
  message: string;
  color?: string;
  buttonText?: string;
  buttonLink?: any;
  buttonColor?: string;
}

const NotificationBar = ({
  show,
  message,
  color,
  buttonText,
  buttonLink,
  buttonColor,
}: TheProps): JSX.Element => {
  const buttonClass = `flex items-center justify-center btn ${buttonColor}`;
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (show) setOpen(show);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let theClass = isOpen ? 'block' : 'hidden';
  theClass += ` ${color} shadow`;

  return (
    <>
      <div className={theClass}>
        <div className="relative max-full mx-auto py-3 px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap">
            <div className="w-0 flex-1 flex items-center">
              <span className="flex p-2 rounded-lg bg-black opacity-10 h-10 w-10" />
              <svg
                className="h-6 w-6 text-white absolute ml-2"
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
                  d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                />
              </svg>
              <p className="ml-3 font-semibold text-white text-shadow-sm">
                {message}
              </p>
            </div>

            {buttonText !== null && (
              <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                <Link href={buttonLink}>
                  <a className={buttonClass}>{buttonText}</a>
                </Link>
              </div>
            )}

            <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
              <button
                type="button"
                className="-mr-1 flex p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
                onClick={() => setOpen(!isOpen)}
              >
                <span className="sr-only">Dismiss</span>
                <svg
                  className="h-6 w-6 text-white"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

NotificationBar.defaultProps = {
  color: 'bg-primary',
  buttonText: null,
  buttonLink: '/',
  buttonColor: 'btn-primary',
};

export default NotificationBar;
