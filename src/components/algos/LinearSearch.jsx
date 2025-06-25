import React, { useEffect } from 'react';
import gsap from 'gsap';
import ArrayBox from '../algo-layout/ArrayBox';

const LinearSearch = ({ array, searchElement, isPlaying }) => {
  useEffect(() => {
    if (!isPlaying || array.length === 0 || isNaN(searchElement)) return;

    const timeline = gsap.timeline();
    let found = false;

    for (let i = 0; i < array.length; i++) {
      const isMatch = array[i] === searchElement;

      timeline.to(`#vis-box-${i}`, {
        backgroundColor: isMatch ? '#22c55e' : '#f59e0b',
        borderColor: isMatch ? '#15803d' : '#d97706',
        duration: 0.5,
      });

      if (isMatch) {
        found = true;
        break;
      }
    }

    return () => timeline.kill();
  }, [isPlaying, array, searchElement]);

  return (
    <div className="flex justify-center flex-wrap gap-2 mt-4">
      {array.map((val, i) => (
        <ArrayBox key={i} value={val} index={i} prefix="vis-box" />
      ))}
    </div>
  );
};

export default LinearSearch;
