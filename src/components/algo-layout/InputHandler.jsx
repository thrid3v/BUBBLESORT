import React, { useState, useEffect } from 'react';
import ArrayBox from './ArrayBox';

const MAX_ARRAY_LENGTH = 8;
const MIN_VALUE = -100;
const MAX_VALUE = 100;

const InputHandler = ({ setArray, setSearchElement, resetFlag }) => {
  const [input, setInput] = useState('');
  const [element, setElement] = useState('');
  const [localArray, setLocalArray] = useState([]);
  const [warning, setWarning] = useState('');

  useEffect(() => {
    setInput('');
    setElement('');
    setLocalArray([]);
    setArray([]);
    setSearchElement(null);
    setWarning('');
  }, [resetFlag, setArray, setSearchElement]);

  const handleGenerate = () => {
    let invalid = false;
    const finalArray = input
      .split(',')
      .map((num) => {
        const trimmed = num.trim();
        if (!/^[-+]?\d+$/.test(trimmed)) {
          invalid = true;
          return null;
        }
        const parsed = parseInt(trimmed);
        if (isNaN(parsed) || parsed < MIN_VALUE || parsed > MAX_VALUE) {
          invalid = true;
          return null;
        }
        return parsed;
      })
      .filter((n) => n !== null);
    if (finalArray.length > MAX_ARRAY_LENGTH) {
      setWarning(`Maximum allowed array length is ${MAX_ARRAY_LENGTH}.`);
      return;
    }
    if (invalid) {
      setWarning(`Only numbers between ${MIN_VALUE} and ${MAX_VALUE} are allowed. Invalid entries were ignored.`);
    } else {
      setWarning('');
    }
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
      {warning && (
        <div className="text-red-400 font-mono text-sm text-center">{warning}</div>
      )}
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
