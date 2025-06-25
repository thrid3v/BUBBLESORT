import React, { useState } from 'react';
import InputHandler from './InputHandler';
import AlgorithmSelector from './AlgorithmSelector';
import AlgoLayout from './AlgoLayout';

/**
 * ReactApp is the main container for the DSA Visualizer.
 * It manages the global state for the array, search element, selected algorithm, and reset trigger.
 */
const ReactApp = () => {
  // State for the array to be visualized/processed
  const [array, setArray] = useState([]);
  // State for the search element (used in search algorithms)
  const [searchElement, setSearchElement] = useState(null);
  // State for the currently selected algorithm
  const [selectedAlgo, setSelectedAlgo] = useState(null);
  // State to trigger a reset in child components (toggle value)
  const [resetFlag, setResetFlag] = useState(false);

  /**
   * handleReset clears all relevant state and triggers a reset in InputHandler.
   * This allows the user to start fresh with a new array and algorithm.
   */
  const handleReset = () => {
    setArray([]);
    setSearchElement(null);
    setSelectedAlgo(null);
    setResetFlag(flag => !flag); // toggle to trigger InputHandler reset
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {/* Handles user input for the array and search element */}
      <InputHandler setArray={setArray} setSearchElement={setSearchElement} resetFlag={resetFlag} />
      {/* Allows user to select which algorithm to visualize */}
      <AlgorithmSelector setSelectedAlgo={setSelectedAlgo} />
      {/* Reset button to clear all state and start over */}
      <div className="flex gap-4">
        <button
          className="bg-red-600 hover:bg-red-800 px-4 py-2 rounded text-white"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      {/* Main visualization area for the selected algorithm */}
      <AlgoLayout array={array} searchElement={searchElement} selectedAlgo={selectedAlgo} />
    </div>
  );
};

export default ReactApp;
