import React, { useEffect, useMemo } from 'react';
import gsap from 'gsap';
import ArrayBox from '../algo-layout/ArrayBox';

/**
 * BinarySearch component visualizes the binary search algorithm.
 * It sorts the array, then highlights the mid element at each step,
 * marking the found element in green and others in blue.
 *
 * Props:
 * - array: Array of numbers to search through.
 * - searchElement: The value to search for.
 * - isPlaying: Boolean to control whether the animation runs.
 */
const BinarySearch = ({ array, searchElement, isPlaying }) => {
  // Sort the array once and memoize it to avoid unnecessary re-sorting
  const sorted = useMemo(() => [...array].sort((a, b) => a - b), [array]);

  useEffect(() => {
    // Only run animation if playing, array is not empty, and searchElement is a number
    if (!isPlaying || sorted.length === 0 || isNaN(searchElement)) return;

    // Create a GSAP timeline for the animation
    const timeline = gsap.timeline();
    let low = 0;
    let high = sorted.length - 1;
    let found = false;

    // Binary search loop
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const isMatch = sorted[mid] === searchElement;

      // Animate the mid box: blue if not found, green if found
      timeline.to(`#vis-box-${mid}`, {
        backgroundColor: isMatch ? '#22c55e' : '#38bdf8',
        borderColor: isMatch ? '#15803d' : '#0ea5e9',
        duration: 0.5,
      });

      // If found, stop further animation
      if (isMatch) {
        found = true;
        break;
      }

      // Move search bounds based on comparison
      if (sorted[mid] < searchElement) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    // Cleanup: kill the timeline if component unmounts or dependencies change
    return () => timeline.kill();
  }, [isPlaying, sorted, searchElement]);

  return (
    <div className="flex justify-center flex-wrap gap-2 mt-4">
      {/* Render each sorted array value as an ArrayBox with a unique id for GSAP */}
      {sorted.map((val, i) => (
        <ArrayBox key={i} value={val} index={i} prefix="vis-box" />
      ))}
    </div>
  );
};

export default BinarySearch;
