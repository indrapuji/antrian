import Link from 'next/link';
import { withRouter } from 'next/router';
import React, { Children } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ActiveLink = (props: any) => {
  const { router, children, href, activeClassName } = props;

  const child = Children.only(children);

  let className = child.props.className || '';
  if (router.pathname === href && activeClassName) {
    className = `${className} ${activeClassName}`.trim();
  }

  // eslint-disable-next-line
  // delete props.activeClassName;

  return <Link {...props}>{React.cloneElement(child, { className })}</Link>;
};

export default withRouter(ActiveLink);
