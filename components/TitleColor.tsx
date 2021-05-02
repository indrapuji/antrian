import React from 'react';

interface TheProps {
  className?: string;
  color?: string;
  // eslint-disable-next-line prettier/prettier
  children: string | JSX.Element | JSX.Element[] | HTMLElement | HTMLElement[];
}

const TitleColor = ({ className, color, children }: TheProps): JSX.Element => {
  let theclass = className ? `${className} ` : '';
  theclass += 'font-bold';

  const bgColor = `bg-clip-text text-transparent ${color}`;

  return (
    <>
      <div className={theclass}>
        <span className={bgColor}>{children}</span>
      </div>
    </>
  );
};

TitleColor.defaultProps = {
  className: null,
  color: 'bg-gradient-to-r from-indigo-600 via-blue-500 to-teal-500',
};

export default TitleColor;
