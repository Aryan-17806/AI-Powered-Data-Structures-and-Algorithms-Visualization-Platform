import React from 'react';
import { motion } from 'framer-motion';

function ComplexityPanel({ complexity }) {
  if (!complexity) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-white border-opacity-20 space-y-4"
    >
      <h3 className="text-lg font-bold text-white">Time & Space Complexity</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Time Complexity */}
        <div className="bg-black bg-opacity-30 rounded-lg p-4 space-y-3">
          <h4 className="text-white font-semibold">Time Complexity</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-300">Best Case:</span>
              <span className="text-green-400 font-mono font-bold">{complexity.timeBest}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Average Case:</span>
              <span className="text-yellow-400 font-mono font-bold">{complexity.timeAverage}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Worst Case:</span>
              <span className="text-red-400 font-mono font-bold">{complexity.timeWorst}</span>
            </div>
          </div>
        </div>

        {/* Space Complexity */}
        <div className="bg-black bg-opacity-30 rounded-lg p-4 space-y-3">
          <h4 className="text-white font-semibold">Space Complexity</h4>
          <div className="flex items-center justify-center h-20">
            <span className="text-purple-400 font-mono text-2xl font-bold">{complexity.spaceComplexity}</span>
          </div>
        </div>
      </div>

      {/* Interpretation Guide */}
      <div className="bg-blue-500 bg-opacity-20 border border-blue-400 border-opacity-50 rounded-lg p-3 text-sm">
        <p className="text-blue-200">
          💡 <strong>Tip:</strong> Smaller Big-O values generally mean faster algorithms for large inputs. O(n log n) is typically better than O(n²).
        </p>
      </div>
    </motion.div>
  );
}

export default ComplexityPanel;
