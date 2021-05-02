/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { CSSTransition as ReactCSSTransition } from 'react-transition-group';

const TransitionContext = React.createContext({
  parent: {},
});

function useIsInitialRender() {
  const isInitialRender = React.useRef(true);
  React.useEffect(() => {
    isInitialRender.current = false;
  }, []);
  return isInitialRender.current;
}

interface CSSTransitionProps {
  show: boolean;
  enter: string;
  enterFrom: string;
  enterTo: string;
  leave: string;
  leaveFrom: string;
  leaveTo: string;
  appear: string;
  children: string | JSX.Element | JSX.Element[] | HTMLElement | HTMLElement[];
}
function CSSTransition({
  show,
  enter = '',
  enterFrom = '',
  enterTo = '',
  leave = '',
  leaveFrom = '',
  leaveTo = '',
  appear,
  children,
}: CSSTransitionProps): JSX.Element {
  const enterClasses = enter.split(' ').filter((s) => s.length);
  const enterFromClasses = enterFrom.split(' ').filter((s) => s.length);
  const enterToClasses = enterTo.split(' ').filter((s) => s.length);
  const leaveClasses = leave.split(' ').filter((s) => s.length);
  const leaveFromClasses = leaveFrom.split(' ').filter((s) => s.length);
  const leaveToClasses = leaveTo.split(' ').filter((s) => s.length);

  function addClasses(node: any, classes: any) {
    classes.length && node.classList.add(...classes);
  }

  function removeClasses(node: any, classes: any) {
    classes.length && node.classList.remove(...classes);
  }

  return (
    <ReactCSSTransition
      appear={appear}
      unmountOnExit
      in={show}
      addEndListener={(node, done) => {
        node.addEventListener('transitionend', done, false);
      }}
      onEnter={(node: any) => {
        removeClasses(node, [...leaveToClasses]);
        addClasses(node, [...enterClasses, ...enterFromClasses]);
      }}
      onEntering={(node: any) => {
        removeClasses(node, [...enterFromClasses]);
        addClasses(node, [...enterToClasses]);
      }}
      onEntered={(node: any) => {
        removeClasses(node, [...enterClasses]);
      }}
      onExit={(node: any) => {
        removeClasses(node, [...enterToClasses]);
        addClasses(node, [...leaveClasses, ...leaveFromClasses]);
      }}
      onExiting={(node: any) => {
        removeClasses(node, [...leaveFromClasses]);
        addClasses(node, [...leaveToClasses]);
      }}
      onExited={(node: any) => {
        removeClasses(node, [...leaveClasses]);
      }}
    >
      {children}
    </ReactCSSTransition>
  );
}

function Transition({ show, appear, ...rest }: any): JSX.Element {
  const { parent }: any = React.useContext(TransitionContext);
  const isInitialRender = useIsInitialRender();
  const isChild = show === undefined;

  if (isChild) {
    return (
      <CSSTransition
        appear={parent.appear || !parent.isInitialRender}
        show={parent.show}
        {...rest}
      />
    );
  }

  return (
    <TransitionContext.Provider
      value={{
        parent: {
          show,
          isInitialRender,
          appear,
        },
      }}
    >
      <CSSTransition appear={appear} show={show} {...rest} />
    </TransitionContext.Provider>
  );
}

export default Transition;
