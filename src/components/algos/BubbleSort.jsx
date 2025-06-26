import React, { useState, useRef } from 'react';
import ArrayBox from '../algo-layout/ArrayBox';

// Helper to generate the array state after each outer loop iteration
function getBubbleSortPasses(inputArr) {
  const arr = [...inputArr];
  const n = arr.length;
  const history = [[...arr]]; // First row: input array
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
    history.push([...arr]); // After each outer loop iteration
  }
  return history;
}

const BubbleSort = ({ array }) => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef(null);

  // Precompute the history for the current array
  const history = getBubbleSortPasses(array);

  // Controls
  const play = () => {
    if (intervalRef.current) return;
    setIsPlaying(true);
    intervalRef.current = setInterval(() => {
      setStep(s => {
        if (s < history.length - 1) return s + 1;
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsPlaying(false);
        return s;
      });
    }, 800);
  };
  const pause = () => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  const stepForward = () => {
    setStep(s => Math.min(s + 1, history.length - 1));
  };
  const stepBack = () => {
    setStep(s => Math.max(s - 1, 0));
  };
  // Reset on array change
  React.useEffect(() => {
    setStep(0);
    pause();
  }, [array]);
  React.useEffect(() => () => pause(), []);

  // Render the grid: each row is a pass, each cell is an array value
  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Visualization Grid */}
      <div className="bg-[#18182a] p-6 rounded-xl flex-1">
        <div className="mb-4 text-xl font-bold text-center">Visualisation</div>
        <div className="overflow-x-auto">
          <div className="flex flex-col gap-2">
            {history.slice(0, step + 1).map((row, rowIdx) => (
              <div key={rowIdx} className="flex gap-2 justify-center">
                {row.map((val, i) => {
                  // Highlight sorted portion in green for all but the first row
                  let boxClass = '';
                  if (rowIdx > 0 && i >= row.length - rowIdx) boxClass = 'bg-green-700 border-green-400';
                  return (
                    <div
                      key={i}
                      className={`w-12 h-12 rounded-lg border-2 text-center flex flex-col justify-center items-center font-mono text-lg font-bold transition-all duration-200 ${boxClass}`}
                      style={{ color: '#fff' }}
                    >
                      {val}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        {/* Controls */}
        <div className="flex gap-2 justify-center mt-4">
          <button onClick={stepBack} className="bg-gray-600 px-3 py-1 rounded text-white" disabled={step === 0}>Prev</button>
          <button onClick={play} className="bg-yellow-600 px-3 py-1 rounded text-white" disabled={isPlaying || step === history.length - 1}>Play</button>
          <button onClick={pause} className="bg-gray-600 px-3 py-1 rounded text-white" disabled={!isPlaying}>Pause</button>
          <button onClick={stepForward} className="bg-gray-600 px-3 py-1 rounded text-white" disabled={step === history.length - 1}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default BubbleSort; 