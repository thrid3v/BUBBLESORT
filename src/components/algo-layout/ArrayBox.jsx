import React from 'react';

const ArrayBox = ({ value, index, prefix = 'box' }) => {
  return (
    <div
      id={`${prefix}-${index}`}
      className="w-14 h-16 rounded-lg border-2 text-center flex flex-col justify-center items-center font-mono bg-[#2e2e3e] border-white"
    >
      <div className="text-xs">i={index}</div>
      <div className="text-lg font-bold">{value}</div>
    </div>
  );
};

export default ArrayBox;
