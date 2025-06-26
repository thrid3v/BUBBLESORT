import React, { useState } from 'react';
import LinearSearch from '../algos/LinearSearch';
import BinarySearch from '../algos/BinarySearch';
import BubbleSort from '../algos/BubbleSort';

const AlgoLayout = ({ array, searchElement, selectedAlgo }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const renderAlgorithm = () => {
    if (selectedAlgo === 'linear')
      return (
        <LinearSearch
          array={array}
          searchElement={searchElement}
          isPlaying={isPlaying}
        />
      );
    if (selectedAlgo === 'binary')
      return (
        <BinarySearch
          array={array}
          searchElement={searchElement}
          isPlaying={isPlaying}
        />
      );
    if (selectedAlgo === 'bubble')
      return (
        <BubbleSort
          array={array}
          isPlaying={isPlaying}
        />
      );
    return null;
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-6 w-full max-w-3xl">
      {/* <div className="flex gap-4">
        <button
          className="bg-yellow-600 hover:bg-yellow-800 px-4 py-2 rounded text-white"
          onClick={() => setIsPlaying(true)}
        >
          Play
        </button>
        <button
          className="bg-gray-600 hover:bg-gray-800 px-4 py-2 rounded text-white"
          onClick={() => setIsPlaying(false)}
        >
          Pause
        </button>
      </div> */}
      {renderAlgorithm()}
    </div>
  );
};

export default AlgoLayout;
