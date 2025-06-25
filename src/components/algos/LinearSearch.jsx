import React, { useEffect } from 'react';
import gsap from 'gsap';
import ArrayBox from '../algo-layout/ArrayBox';

/**
 * LinearSearch component visualizes the linear search algorithm.
 * It highlights each array element in sequence, and marks the found element in green.
 *
 * Props:
 * - array: Array of numbers to search through.
 * - searchElement: The value to search for.
 * - isPlaying: Boolean to control whether the animation runs.
 */
const LinearSearch = ({ array, searchElement, isPlaying }) => {
  useEffect(() => {
    // Only run animation if playing, array is not empty, and searchElement is a number
    if (!isPlaying || array.length === 0 || isNaN(searchElement)) return;

    // Create a GSAP timeline for the animation
    const timeline = gsap.timeline();
    let found = false;

    // Step through each array element
    for (let i = 0; i < array.length; i++) {
      const isMatch = array[i] === searchElement;

      // Animate the current box: orange if not found, green if found
      timeline.to(`#vis-box-${i}`, {
        backgroundColor: isMatch ? '#22c55e' : '#f59e0b',
        borderColor: isMatch ? '#15803d' : '#d97706',
        duration: 0.5,
      });

      // If found, stop further animation
      if (isMatch) {
        found = true;
        break;
      }
    }

    // Cleanup: kill the timeline if component unmounts or dependencies change
    return () => timeline.kill();
  }, [isPlaying, array, searchElement]);

  return (
    <div className="flex justify-center flex-wrap gap-2 mt-4">
      {/* Render each array value as an ArrayBox with a unique id for GSAP */}
      {array.map((val, i) => (
        <ArrayBox key={i} value={val} index={i} prefix="vis-box" />
      ))}
    </div>
  );
};

export default LinearSearch;
