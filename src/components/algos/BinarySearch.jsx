import React, { useEffect, useMemo } from 'react';
import gsap from 'gsap';
import ArrayBox from '../algo-layout/ArrayBox';

const BinarySearch = ({ array, searchElement, isPlaying }) => {
  // Sort the array once, and remember original indexes
  const sorted = useMemo(() => [...array].sort((a, b) => a - b), [array]);

  useEffect(() => {
    if (!isPlaying || sorted.length === 0 || isNaN(searchElement)) return;

    const timeline = gsap.timeline();
    let low = 0;
    let high = sorted.length - 1;
    let found = false;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const isMatch = sorted[mid] === searchElement;

      timeline.to(`#vis-box-${mid}`, {
        backgroundColor: isMatch ? '#22c55e' : '#38bdf8',
        borderColor: isMatch ? '#15803d' : '#0ea5e9',
        duration: 0.5,
      });

      if (isMatch) {
        found = true;
        break;
      }

      // Optional: fade out irrelevant side
      if (sorted[mid] < searchElement) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    return () => timeline.kill();
  }, [isPlaying, sorted, searchElement]);

  return (
    <div className="flex justify-center flex-wrap gap-2 mt-4">
      {sorted.map((val, i) => (
        <ArrayBox key={i} value={val} index={i} prefix="vis-box" />
      ))}
    </div>
  );
};

export default BinarySearch;
