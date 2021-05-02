import React from 'react';

interface TheProps {
  percentage: string;
  color?: string;
}

const ProgressBar = ({ percentage, color }: TheProps): JSX.Element => {
  const theclass = `h-full absolute ${color}`;

  return (
    <>
      <div className="h-2 relative w-full rounded-full shadow overflow-hidden">
        <div className="w-full h-full bg-gray-200 absolute" />
        <div className={theclass} style={{ width: percentage }} />
      </div>
    </>
  );
};

ProgressBar.defaultProps = {
  color: 'bg-primary',
};

export default ProgressBar;
