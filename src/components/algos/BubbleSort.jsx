import React, { useState, useRef, useEffect, useLayoutEffect, useMemo } from 'react';
import gsap from 'gsap';

// Helper to generate the sequence of comparisons and swaps for each i pass
function getBubbleSortPassesWithIds(inputArr) {
  const arr = inputArr.map((val, idx) => ({ id: idx, val }));
  const n = arr.length;
  const passes = [];
  let workingArr = arr.map(x => ({ ...x }));
  for (let i = 0; i < n - 1; i++) {
    const steps = [];
    let arrCopy = workingArr.map(x => ({ ...x }));
    for (let j = 0; j < n - i - 1; j++) {
      const shouldSwap = arrCopy[j].val > arrCopy[j + 1].val;
      steps.push({
        array: arrCopy.map(x => ({ ...x })),
        compare: [j, j + 1],
        swap: shouldSwap,
      });
      if (shouldSwap) {
        [arrCopy[j], arrCopy[j + 1]] = [arrCopy[j + 1], arrCopy[j]];
      }
    }
    // Final state for this pass (ensure full array)
    steps.push({
      array: arrCopy.map(x => ({ ...x })),
      compare: [],
      swap: false,
    });
    passes.push(steps);
    workingArr = arrCopy;
  }
  return passes;
}

const BOX_WIDTH = 56;
const ROW_HEIGHT = 64;

const BubbleSort = ({ array }) => {
  if (!array || array.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full">
        <div className="text-white text-xl mt-12">Please enter an array and click Generate to visualize Bubble Sort.</div>
      </div>
    );
  }
  const n = array.length;
  const initialArray = useMemo(() => array.map((val, idx) => ({ id: idx, val })), [array]);
  const passes = useMemo(() => getBubbleSortPassesWithIds(array), [array]);
  const [currentPass, setCurrentPass] = useState(0); // i
  const [step, setStep] = useState(0); // j
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const itemRefs = useRef({});

  // For centering: calculate total width
  const totalWidth = n * BOX_WIDTH;
  const totalRows = passes.length;

  // Current steps and array for the active pass
  const currentSteps = passes[currentPass] || [];
  const current = currentSteps[step] || { array: initialArray, compare: [], swap: false };

  // Map: id -> current index in the current array
  const idToIndex = {};
  current.array.forEach((item, idx) => {
    idToIndex[item.id] = idx;
  });

  // Animate comparison color
  useEffect(() => {
    if (!current || !current.compare.length) return;
    const [i, j] = current.compare;
    const color = current.swap ? '#dc2626' : '#22c55e';
    setIsAnimating(true);
    const idA = current.array[i]?.id;
    const idB = current.array[j]?.id;
    const elA = idA !== undefined ? itemRefs.current[idA] : null;
    const elB = idB !== undefined ? itemRefs.current[idB] : null;
    if (!elA || !elB) {
      setIsAnimating(false);
      return;
    }
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to([elA, elB], { backgroundColor: '#18182a', duration: 0.2 });
        setIsAnimating(false);
      }
    });
    tl.to([elA, elB], { backgroundColor: color, duration: 0.3 })
      .to([elA, elB], { backgroundColor: '#18182a', duration: 0.2 }, "+=0.2");
    return () => tl.kill();
  }, [step, currentPass]);

  // Animate position swaps
  useLayoutEffect(() => {
    initialArray.forEach((item, origIdx) => {
      const el = itemRefs.current[item.id];
      if (!el) return;
      const newIdx = idToIndex[item.id];
      const x = (newIdx - origIdx) * BOX_WIDTH;
      gsap.to(el, { x, duration: 0.4, ease: 'power2.inOut' });
    });
  }, [step, currentPass, initialArray, idToIndex]);

  // Play mode: advance after animation
  useEffect(() => {
    if (isPlaying && !isAnimating) {
      if (step < currentSteps.length - 1) {
        const timeout = setTimeout(() => setStep(s => s + 1), 500);
        return () => clearTimeout(timeout);
      } else if (currentPass < passes.length - 1) {
        // Move to next pass
        const timeout = setTimeout(() => {
          setCurrentPass(p => p + 1);
          setStep(0);
        }, 700);
        return () => clearTimeout(timeout);
      } else {
        setIsPlaying(false);
      }
    }
  }, [isPlaying, isAnimating, step, currentSteps.length, currentPass, passes.length]);

  // Controls
  const play = () => {
    if (isPlaying || (currentPass === passes.length - 1 && step === currentSteps.length - 1)) return;
    setIsPlaying(true);
  };
  const pause = () => {
    setIsPlaying(false);
  };
  const stepForward = () => {
    if (isAnimating) return;
    if (step < currentSteps.length - 1) {
      setStep(s => s + 1);
    } else if (currentPass < passes.length - 1) {
      setCurrentPass(p => p + 1);
      setStep(0);
    }
  };
  const stepBack = () => {
    if (isAnimating) return;
    if (step > 0) {
      setStep(s => s - 1);
    } else if (currentPass > 0) {
      setCurrentPass(p => p - 1);
      setStep(passes[currentPass - 1].length - 1);
    }
  };
  // Reset on array change
  useEffect(() => {
    setCurrentPass(0);
    setStep(0);
    setIsPlaying(false);
  }, [array]);

  // Render all previous passes as static rows
  return (
    <div className="flex flex-col gap-8 w-full items-center">
      <div className="bg-[#18182a] p-8 rounded-2xl shadow-lg flex flex-col items-center w-full max-w-fit mx-auto min-h-[400px] justify-center">
        <div className="mb-4 text-2xl font-bold text-center text-white">Visualisation</div>
        {/* Header row for indices */}
        <div className="flex justify-center mb-2 gap-2 w-full">
          {initialArray.map((_, i) => (
            <div
              key={i}
              className="w-14 h-6 text-xs text-center text-gray-300 font-mono"
              style={{ lineHeight: '1.5rem' }}
            >
              i={i}
            </div>
          ))}
        </div>
        <div
          className="flex flex-col items-center gap-2 scrollbar-hide w-full"
          style={{ minHeight: ROW_HEIGHT * totalRows + 'px' }}
        >
          {/* First row at the top with the default values before animation starts */}
          <div className="flex gap-2 justify-center">
            {Array.from({ length: n }).map((_, colIdx) => (
              <div
                key={colIdx}
                className="w-14 h-14 rounded-lg flex flex-col justify-center items-center font-mono text-lg font-bold border-2 border-white bg-[#23233a] text-white"
                style={{ margin: 0 }}
              >
                {initialArray[colIdx]?.val ?? ''}
              </div>
            ))}
          </div>
          {/* Render all previous passes as static rows */}
          {passes.slice(0, currentPass).map((steps, i) => {
            const lastStep = steps[steps.length - 1];
            return (
              <div
                key={i}
                className="flex gap-2 justify-center"
              >
                {Array.from({ length: n }).map((_, colIdx) => {
                  const item = lastStep.array[colIdx];
                  let cellClass = 'bg-[#23233a] border-2 border-white';
                  // Only apply green in the last step of each pass
                  if (colIdx >= n - (i + 1)) cellClass = 'bg-green-600 border-green-400';
                  return (
                    <div
                      key={colIdx}
                      className={`w-14 h-14 rounded-lg flex flex-col justify-center items-center font-mono text-lg font-bold text-white transition-all duration-200 ${cellClass}`}
                      style={{ margin: 0 }}
                    >
                      {item?.val ?? ''}
                    </div>
                  );
                })}
              </div>
            );
          })}
          {/* Render the current pass as an animated row */}
          <div
            className="flex gap-2 justify-center"
          >
            {Array.from({ length: n }).map((_, colIdx) => {
              const item = current.array[colIdx];
              let cellClass = 'bg-[#23233a] border-2 border-white';
              // Animate compared cells by index
              if (
                current.compare.length &&
                (colIdx === current.compare[0] || colIdx === current.compare[1])
              ) {
                cellClass = current.swap ? 'bg-red-600 border-red-400' : 'bg-yellow-500 border-yellow-400';
              }
              // Only apply green if on the very last step of the last pass
              if (
                currentPass === passes.length - 1 &&
                step === passes[passes.length - 1].length - 1 &&
                colIdx >= n - (currentPass + 1)
              ) {
                cellClass = 'bg-green-600 border-green-400';
              }
              return (
                <div
                  key={colIdx}
                  className={`w-14 h-14 rounded-lg flex flex-col justify-center items-center font-mono text-lg font-bold text-white transition-all duration-200 ${cellClass}`}
                  style={{ margin: 0 }}
                >
                  {item?.val ?? ''}
                </div>
              );
            })}
          </div>
          {/* Final green row after sorting is complete */}
          {currentPass === passes.length - 1 && step === passes[passes.length - 1].length - 1 && (
            <div className="flex gap-2 justify-center mt-2">
              {Array.from({ length: n }).map((_, colIdx) => {
                const item = current.array[colIdx];
                return (
                  <div
                    key={colIdx}
                    className="w-14 h-14 rounded-lg flex flex-col justify-center items-center font-mono text-lg font-bold text-white bg-green-600 border-2 border-green-400"
                    style={{ margin: 0 }}
                  >
                    {item?.val ?? ''}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {/* Controls */}
        <div className="flex gap-2 justify-center mt-6">
          <button onClick={stepBack} className="bg-gray-600 hover:bg-gray-800 px-4 py-2 rounded text-white" disabled={currentPass === 0 && step === 0 || isAnimating}>Prev</button>
          <button onClick={play} className="bg-yellow-600 hover:bg-yellow-800 px-4 py-2 rounded text-white" disabled={isPlaying || (currentPass === passes.length - 1 && step === currentSteps.length - 1) || isAnimating}>Play</button>
          <button onClick={pause} className="bg-gray-600 hover:bg-gray-800 px-4 py-2 rounded text-white" disabled={!isPlaying}>Pause</button>
          <button onClick={stepForward} className="bg-gray-600 hover:bg-gray-800 px-4 py-2 rounded text-white" disabled={(currentPass === passes.length - 1 && step === currentSteps.length - 1) || isAnimating}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default BubbleSort;