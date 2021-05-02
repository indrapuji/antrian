/* eslint-disable @typescript-eslint/no-explicit-any */
import Transition from 'components/Transition';
import React from 'react';

interface TheProps {
  show: boolean;
  title?: string;
  desc?: string | JSX.Element | JSX.Element[] | HTMLElement | HTMLElement[];
  modalStyle?: string;
  icon?: 'exclamation' | 'check' | 'x';
  btnCloseShow?: boolean;
  btnCloseTitle?: string;
  btnCloseStyle?: string;
  // eslint-disable-next-line react/require-default-props
  btnCloseAction?: any;
  btnProcessShow?: boolean;
  btnProcessTitle?: string;
  btnProcessStyle?: string;
  // eslint-disable-next-line react/require-default-props
  btnProcessAction?: any;
}

const ProgressBar = ({
  show,
  title,
  desc,
  modalStyle,
  icon,
  btnCloseShow,
  btnCloseTitle,
  btnCloseStyle,
  btnCloseAction,
  btnProcessShow,
  btnProcessTitle,
  btnProcessStyle,
  btnProcessAction,
}: TheProps): JSX.Element => {
  let parseStyle;
  switch (modalStyle) {
    case 'primary':
      parseStyle = 'bg-light-blue-100 text-light-blue-600';
      break;

    case 'secondary':
      parseStyle = 'bg-cyan-100 text-cyan-600';
      break;

    case 'success':
      parseStyle = 'bg-green-100 text-green-600';
      break;

    case 'warning':
      parseStyle = 'bg-yellow-100 text-yellow-600';
      break;

    case 'danger':
      parseStyle = 'bg-red-100 text-red-600';
      break;

    case 'dark':
      parseStyle = 'bg-blue-gray-100 text-blue-gray-600';
      break;
  }

  let parseIcon: any;
  switch (icon) {
    case 'exclamation':
      parseIcon = () => (
        <svg
          className="h-6 w-6"
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
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      );
      break;

    case 'check':
      parseIcon = () => (
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      );
      break;

    case 'x':
      parseIcon = () => (
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      );
      break;
  }

  return (
    <>
      <Transition appear show={show}>
        <div className="fixed z-30 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition
              appear
              show={show}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-blue-gray-800 opacity-75" />
              </div>
            </Transition>
            {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition
              appear
              show={show}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div
                      className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${parseStyle} sm:mx-0 sm:h-10 sm:w-10`}
                    >
                      {parseIcon()}
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="leading-6 text-xl font-semibold mb-2"
                        id="modal-headline"
                      >
                        {title}
                      </h3>
                      {desc}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  {btnProcessShow && (
                    <button
                      type="button"
                      className={`btn ml-4 ${btnProcessStyle}`}
                      onClick={(e) => btnProcessAction(e)}
                    >
                      {btnProcessTitle}
                    </button>
                  )}

                  {btnCloseShow && (
                    <button
                      type="button"
                      className={`btn ${btnCloseStyle}`}
                      onClick={() => btnCloseAction(!show)}
                    >
                      {btnCloseTitle}
                    </button>
                  )}
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </Transition>
    </>
  );
};

ProgressBar.defaultProps = {
  title: '',
  desc: '',
  modalStyle: 'danger',
  icon: 'exclamation',
  btnCloseShow: false,
  btnCloseTitle: 'cancel',
  btnCloseStyle: 'text-gray-700 hover:bg-gray-200',
  btnProcessShow: false,
  btnProcessTitle: 'ok',
  btnProcessStyle: 'btn-primary',
};

export default ProgressBar;
