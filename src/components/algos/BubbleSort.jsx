import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import ArrayBox from '../algo-layout/ArrayBox';

const ANIMATION_SPEED = 400; // ms per step

/**
 * BubbleSort component visualizes the bubble sort algorithm.
 * It highlights compared elements in orange, swaps in blue, and sorted elements in green.
 *
 * Props:
 * - array: Array of numbers to sort.
 * - isPlaying: Boolean to control whether the animation runs.
 */
const BubbleSort = ({ array, isPlaying }) => {
  const [displayArray, setDisplayArray] = useState([...array]);

  useEffect(() => {
    setDisplayArray([...array]);
  }, [array]);

  useEffect(() => {
    if (!isPlaying || displayArray.length === 0) return;

    let isCancelled = false;

    const animate = async () => {
      let arr = [...displayArray];
      const n = arr.length;

      // Reset all boxes to default color
      for (let i = 0; i < n; i++) {
        gsap.to(`#bubble-box-${i}`, {
          backgroundColor: '#f3f4f6',
          borderColor: '#d1d5db',
          opacity: 1,
          duration: 0.1,
        });
      }

      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          if (isCancelled) return;
          // Highlight compared elements
          gsap.to([`#bubble-box-${j}`, `#bubble-box-${j + 1}`], {
            backgroundColor: '#f59e0b',
            borderColor: '#d97706',
            duration: 0.2,
          });
          await new Promise(res => setTimeout(res, ANIMATION_SPEED));

          if (arr[j] > arr[j + 1]) {
            // Highlight swap
            gsap.to([`#bubble-box-${j}`, `#bubble-box-${j + 1}`], {
              backgroundColor: '#2563eb',
              borderColor: '#1d4ed8',
              duration: 0.2,
            });
            await new Promise(res => setTimeout(res, ANIMATION_SPEED / 2));
            // Blinking (fade out, then in)
            await new Promise(resolve => {
              gsap.to([`#bubble-box-${j}`, `#bubble-box-${j + 1}`], {
                opacity: 0,
                duration: 0.2,
                yoyo: true,
                repeat: 1,
                onComplete: resolve
              });
            });
            // Swap values
            const temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
            setDisplayArray(arr.slice());
            await new Promise(res => setTimeout(res, ANIMATION_SPEED / 2));
          }
          // Unhighlight after comparison
          gsap.to([`#bubble-box-${j}`, `#bubble-box-${j + 1}`], {
            backgroundColor: '#f3f4f6',
            borderColor: '#d1d5db',
            opacity: 1,
            duration: 0.2,
          });
          await new Promise(res => setTimeout(res, ANIMATION_SPEED / 2));
        }
        // Mark the last sorted element
        gsap.to(`#bubble-box-${n - i - 1}`, {
          backgroundColor: '#22c55e',
          borderColor: '#15803d',
          opacity: 1,
          duration: 0.3,
        });
      }
      // Mark all as sorted at the end
      for (let i = 0; i < n; i++) {
        gsap.to(`#bubble-box-${i}`, {
          backgroundColor: '#22c55e',
          borderColor: '#15803d',
          opacity: 1,
          duration: 0.3,
        });
      }
    };

    animate();
    return () => {
      isCancelled = true;
    };
  }, [isPlaying, displayArray.length]);

  return (
    <div className="flex justify-center flex-wrap gap-2 mt-4">
      {displayArray.map((val, i) => (
        <ArrayBox key={i} value={val} index={i} prefix="bubble-box" />
      ))}
    </div>
  );
};

export default BubbleSort; 