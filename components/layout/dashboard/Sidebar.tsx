/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import Link from 'components/ActiveLink';
import FocusTrap from 'components/layout/dashboard/utils/FocusTrap';
import {
  LabelMenuProps,
  SidebarProps,
} from 'components/layout/dashboard/utils/interface';
import Transition from 'components/Transition';
import menu from 'data/sidebar-menu-dashboard';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const LabelMenu = ({
  theme,
  content,
  className,
}: LabelMenuProps): JSX.Element => {
  let color = '';
  switch (theme) {
    case 'indigo':
    default:
      color = 'sidebar-menu-label-indigo';
      break;

    case 'red':
      color = 'sidebar-menu-label-red';
      break;

    case 'green':
      color = 'sidebar-menu-label-green';
      break;
  }

  return <span className={`${color} ${className}`}>{content}</span>;
};
LabelMenu.defaultProps = {
  className: '',
};

const findActiveIndex = (
  menuArray: any,
  keyword: string,
  parent = -1
): number => {
  for (let i = 0; i < menu.length; i += 1) {
    if (menuArray[i].link !== undefined) {
      if (menuArray[i].link === keyword) {
        if (parent > -1) return parent;
        return i;
      }
    }

    if (menuArray[i].children !== undefined) {
      return findActiveIndex(menuArray[i].children, keyword, i);
    }
  }

  return -1;
};
const SidebarMenu = (): JSX.Element => {
  const [active, setActive] = useState(-1);
  const router = useRouter();

  useEffect(() => {
    const colapseIndex = findActiveIndex(menu, router.pathname);
    if (colapseIndex > -1) setActive(colapseIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const eventHandler = (e: any, index: number) => {
    e.preventDefault();
    if (active === index) setActive(-1);
    if (active !== index) setActive(index);
  };

  return (
    <ul className="sidebar-menu-ul pb-4 overflow-y-auto">
      {menu.map((item: any, index: number) => {
        const i = `${index + 1}${new Date().valueOf()}`;

        if (item.children !== undefined) {
          return (
            <li key={i}>
              {/* eslint-disable prettier/prettier */}
              <a
                className={`sidebar-menu-parent-i cursor-pointer${
                  index === active ? ' sidebar-menu-parent-i-active' : ''
                }`}
                onClick={(e) => eventHandler(e, index)}
                aria-hidden="true"
              >
                {/* eslint-enable prettier/prettier */}
                <span className="sidebar-menu-i-icon">
                  <item.icon />
                </span>
                <span className="sidebar-menu-i-title">{item.title}</span>
                {item.label !== undefined && (
                  <LabelMenu
                    theme={item.label.theme}
                    content={item.label.content}
                    className="mr-4"
                  />
                )}
                {/* eslint-disable prettier/prettier */}
                {index === active ? (
                  <svg
                    className="absolute right-0 mr-4 w-5 h5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="absolute right-0 mr-4 w-5 h5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {/* eslint-enable prettier/prettier */}
              </a>
              {/* eslint-disable prettier/prettier */}

              <div
                className={`w-full overflow-hidden${
                  index === active ? ' h-auto' : ' h-0'
                }`}
                // eslint-enable prettier/prettier
              >
                <div
                  className={
                    index === active
                      ? ' sidebar-menu-parent-i-active'
                      : ' sidebar-menu-parent-i-inactive'
                  }
                >
                  <ul className="sidebar-menu-ul pt-1">
                    {item.children.map((child: any, k: number) => {
                      return (
                        <li key={`${k + 1}${new Date().valueOf()}`}>
                          <Link
                            href={child.link}
                            activeClassName="sidebar-menu-child-i-active"
                          >
                            <a className="sidebar-menu-child-i">
                              <span className="sidebar-menu-i-title">
                                {child.title}
                              </span>
                              {child.label !== undefined && (
                                <LabelMenu
                                  theme={child.label.theme}
                                  content={child.label.content}
                                />
                              )}
                            </a>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              {/* eslint-enable prettier/prettier */}
            </li>
          );
        }

        if (item.link === undefined) {
          return (
            <li key={i} className="px-5 pt-3">
              <div className="flex flex-row items-center h-8">
                <div className="tracking-wide font-bold text-teal-600">
                  {item.title}
                </div>
              </div>
            </li>
          );
        }

        return (
          <li key={i}>
            <Link
              href={item.link}
              activeClassName="sidebar-menu-parent-i-active"
            >
              <a className="sidebar-menu-parent-i">
                <span className="sidebar-menu-i-icon">
                  <item.icon />
                </span>
                <span className="sidebar-menu-i-title">{item.title}</span>
                {item.label !== undefined && (
                  <LabelMenu
                    theme={item.label.theme}
                    content={item.label.content}
                  />
                )}
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

const Sidebar = ({
  isOpen,
  isDesktop,
  setOpen,
  isNama,
  isRole,
}: SidebarProps): JSX.Element => {
  return (
    <>
      <Transition
        appear
        show={isOpen}
        enter="transition-all duration-500"
        enterFrom="-ml-80"
        enterTo="ml-0"
        leave="transition-all duration-500"
        leaveTo="-ml-80"
      >
        {/* eslint-disable prettier/prettier */}
        <aside
          className={`w-80 min-h-screen z-20 flex flex-col bg-white -ml-80${
            !isDesktop ? '  fixed' : ''
          }`}
        >
          {/* eslint-enable prettier/prettier */}
          <div className="flex-grow border-r shadow-lg">
            <FocusTrap isActive={!isDesktop}>
              <div>
                {!isDesktop && (
                  <button
                    className="w-10 p-2 absolute top-0 right-0 mt-3 mr-3 bg-blue-gray-100 rounded-lg border-2 border-blue-gray-200 shadow-md focus:outline-none"
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>

              <div className="flex items-center w-full p-4">
                <div className="w-full">
                  <h3 className="font-semibold">{isNama}</h3>
                  <h4 className="text-sm">{isRole}</h4>
                </div>
              </div>

              <div className="flex-grow relative">
                <nav>
                  <SidebarMenu />
                </nav>
              </div>
            </FocusTrap>
          </div>
        </aside>
      </Transition>

      <Transition
        appear
        show={!isDesktop && isOpen}
        enter="transition-opacity duration-100"
        enterFrom="opacity-0"
        enterTo="opacity-50"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-50"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black z-10" />
      </Transition>
    </>
  );
};

export default Sidebar;
