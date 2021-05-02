/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

interface FocusTrapProps {
  children: JSX.Element | JSX.Element[];
  isActive: boolean;
}

export default function FocusTrap({
  children,
  isActive,
}: FocusTrapProps): JSX.Element {
  const topTabTrap = React.useRef();
  const bottomTabTrap = React.useRef();
  const container = React.useRef();

  React.useEffect(() => {
    document.addEventListener('focusin', trapFocus);

    return () => document.removeEventListener('focusin', trapFocus);

    function trapFocus(event: any) {
      // Only trap focus in modal form
      if (!isActive) return;

      let elements;
      if (event.target === topTabTrap.current) {
        elements = getFocusableElements();

        if (elements.length > 0) {
          const lastElement: any = elements[elements.length - 1];
          lastElement.focus();
        }
      }

      if (event.target === bottomTabTrap.current) {
        elements = getFocusableElements();

        if (elements.length > 0) {
          const firstElement: any = elements[0];
          firstElement.focus();
        }
      }
    }

    function getFocusableElements() {
      if (!container.current) return [];

      const FOCUSABLE_SELECTOR = [
        'button',
        'a[href]',
        'input',
        'select',
        'textarea',
        '[tabindex]',
        '[contenteditable]',
      ]
        .map((selector) => `${selector}:not(:disabled):not([disabled])`)
        .join(', ');

      // @ts-ignore
      return Array.from(container.current.querySelectorAll(FOCUSABLE_SELECTOR))
        .filter((element) => element !== topTabTrap.current)
        .filter((element) => element !== bottomTabTrap.current);
    }
  }, [isActive, topTabTrap, bottomTabTrap, container]);

  return (
    // @ts-ignore
    <div ref={container}>
      {/* @ts-ignore */}
      {isActive && <span ref={topTabTrap} tabIndex="0" />}
      {children}
      {/* @ts-ignore */}
      {isActive && <span ref={bottomTabTrap} tabIndex="0" />}
    </div>
  );
}
