import React, { useState, useEffect } from 'react';
import ArrayBox from './ArrayBox';

const InputHandler = ({ setArray, setSearchElement, resetFlag }) => {
  const [input, setInput] = useState('');
  const [element, setElement] = useState('');
  const [localArray, setLocalArray] = useState([]);

  useEffect(() => {
    setInput('');
    setElement('');
    setLocalArray([]);
    setArray([]);
    setSearchElement(null);
  }, [resetFlag, setArray, setSearchElement]);

  const handleGenerate = () => {
    const finalArray = input
      .split(',')
      .map((num) => parseInt(num.trim()))
      .filter((n) => !isNaN(n));
    setLocalArray(finalArray);
    setArray(finalArray);
    setSearchElement(parseInt(element));
  };

  return (
    <div className="bg-[#1a1a2e] p-6 rounded-xl shadow-xl flex flex-col gap-4 w-full max-w-3xl">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Enter array (e.g. 1,2,3)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="px-3 py-2 bg-[#2e2e3e] text-white rounded w-full sm:w-2/3"
        />
        <input
          type="number"
          placeholder="Search element"
          value={element}
          onChange={(e) => setElement(e.target.value)}
          className="px-3 py-2 bg-[#2e2e3e] text-white rounded w-full sm:w-1/3"
        />
        <button
          onClick={handleGenerate}
          className="bg-purple-600 hover:bg-purple-800 px-4 py-2 rounded text-white"
        >
          Generate
        </button>
      </div>

      {localArray.length > 0 && (
  <div className="flex justify-center flex-wrap gap-2 mt-4">
    {localArray.map((val, i) => (
      <ArrayBox key={i} value={val} index={i} prefix="input-box" />
    ))}
  </div>
)}

    </div>
  );
};

export default InputHandler;
