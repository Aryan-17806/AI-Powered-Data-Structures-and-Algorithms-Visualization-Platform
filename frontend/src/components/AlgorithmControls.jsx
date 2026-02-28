import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function AlgorithmControls({ onSimulate, loading, disabled }) {
  const [algorithm, setAlgorithm] = useState('bubble-sort');
  const [inputArray, setInputArray] = useState('64,34,25,12,22,11,90');
  const [algorithms, setAlgorithms] = useState([]);

  useEffect(() => {
    const fetchAlgorithms = async () => {
      try {
        const response = await axios.get(`${API_URL}/algorithms`);
        setAlgorithms(response.data);
      } catch (error) {
        console.error('Failed to fetch algorithms:', error);
      }
    };
    fetchAlgorithms();
  }, []);

  const handleSimulate = () => {
    try {
      const array = inputArray.split(',').map(n => parseInt(n.trim()));
      if (array.some(isNaN)) {
        alert('Please enter valid numbers separated by commas');
        return;
      }
      onSimulate(algorithm, { array });
    } catch (error) {
      alert('Invalid input');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 space-y-4 border border-white border-opacity-20"
    >
      <h2 className="text-xl font-bold text-white mb-4">Algorithm Controls</h2>

      <div>
        <label className="block text-white text-sm font-medium mb-2">
          Select Algorithm
        </label>
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          disabled={disabled || loading}
          className="w-full px-4 py-2 bg-black bg-opacity-50 border border-white border-opacity-20 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
        >
          {algorithms.map((algo) => (
            <option key={algo.id} value={algo.id}>
              {algo.name} - {algo.category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-white text-sm font-medium mb-2">
          Input Array (comma-separated)
        </label>
        <input
          type="text"
          value={inputArray}
          onChange={(e) => setInputArray(e.target.value)}
          disabled={disabled || loading}
          className="w-full px-4 py-2 bg-black bg-opacity-50 border border-white border-opacity-20 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
          placeholder="e.g., 64, 34, 25, 12, 22"
        />
      </div>

      <button
        onClick={handleSimulate}
        disabled={disabled || loading}
        className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Running Simulation...' : 'Run Simulation'}
      </button>
    </motion.div>
  );
}

export default AlgorithmControls;
