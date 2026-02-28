import React from 'react';
import { motion } from 'framer-motion';

function ArrayVisualizer({ array, highlightedIndices = [], operationType = '' }) {
  if (!array || array.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-400">
        <p>No array data to display</p>
      </div>
    );
  }

  const maxValue = Math.max(...array);
  const minValue = Math.min(...array);
  const range = maxValue - minValue || 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-end justify-end space-y-4 p-6 bg-black bg-opacity-20 rounded-xl min-h-96"
    >
      <div className="flex items-end justify-center gap-1 w-full" style={{ height: '300px' }}>
        {array.map((value, idx) => {
          const height = ((value - minValue) / range) * 100 + 20;
          const isHighlighted = highlightedIndices.includes(idx);

          return (
            <motion.div
              key={idx}
              layout
              animate={{
                height: `${height}%`,
              }}
              transition={{ duration: 0.3 }}
              className={`flex-1 rounded-t-lg flex items-center justify-center font-bold text-white transition-all duration-300 ${
                isHighlighted
                  ? 'bg-gradient-to-t from-red-500 to-orange-400 shadow-lg shadow-red-500/50 scale-105'
                  : operationType === 'SWAP' && isHighlighted
                    ? 'bg-gradient-to-t from-yellow-500 to-yellow-400'
                    : 'bg-gradient-to-t from-blue-500 to-blue-400 opacity-70'
              }`}
            >
              <span className="text-xs sm:text-sm">{value}</span>
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-between w-full text-xs text-gray-400">
        <span>Min: {minValue}</span>
        <span>{operationType}</span>
        <span>Max: {maxValue}</span>
      </div>
    </motion.div>
  );
}

export default ArrayVisualizer;
