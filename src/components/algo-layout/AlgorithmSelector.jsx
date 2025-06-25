import React from 'react';

const AlgorithmSelector = ({ setSelectedAlgo }) => {
  return (
    <div className="flex gap-4">
      <button
        className="bg-blue-600 hover:bg-blue-800 px-4 py-2 rounded text-white"
        onClick={() => setSelectedAlgo('linear')}
      >
        Linear Search
      </button>
      <button
        className="bg-green-600 hover:bg-green-800 px-4 py-2 rounded text-white"
        onClick={() => setSelectedAlgo('binary')}
      >
        Binary Search
      </button>
      <button
        className="bg-purple-600 hover:bg-purple-800 px-4 py-2 rounded text-white"
        onClick={() => setSelectedAlgo('bubble')}
      >
        Bubble Sort
      </button>
    </div>
  );
};

export default AlgorithmSelector;
