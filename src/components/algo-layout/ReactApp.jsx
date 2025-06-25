import React, { useState } from 'react';
import InputHandler from './InputHandler';
import AlgorithmSelector from './AlgorithmSelector';
import AlgoLayout from './AlgoLayout';

const ReactApp = () => {
  const [array, setArray] = useState([]);
  const [searchElement, setSearchElement] = useState(null);
  const [selectedAlgo, setSelectedAlgo] = useState(null);

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <InputHandler setArray={setArray} setSearchElement={setSearchElement} />
      <AlgorithmSelector setSelectedAlgo={setSelectedAlgo} />
      <AlgoLayout array={array} searchElement={searchElement} selectedAlgo={selectedAlgo} />
    </div>
  );
};

export default ReactApp;
