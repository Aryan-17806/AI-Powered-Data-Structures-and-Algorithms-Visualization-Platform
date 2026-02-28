import React, { useState } from 'react';
import { motion } from 'framer-motion';

function PlaybackControls({ states, currentStep, onStepChange, speed, onSpeedChange, hasStates }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-4 space-y-4 border border-white border-opacity-20"
    >
      <h3 className="text-lg font-bold text-white">Playback Controls</h3>

      <div className="space-y-3">
        {/* Step Display */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-black bg-opacity-30 rounded-lg p-3">
            <div className="text-gray-300 text-sm">Current Step</div>
            <div className="text-white text-xl font-bold">{currentStep}/{states?.length || 0}</div>
          </div>
          <div className="bg-black bg-opacity-30 rounded-lg p-3">
            <div className="text-gray-300 text-sm">Speed</div>
            <div className="text-white text-xl font-bold">{speed}x</div>
          </div>
        </div>

        {/* Step Slider */}
        {hasStates && (
          <div>
            <input
              type="range"
              min="0"
              max={states?.length - 1 || 0}
              value={currentStep}
              onChange={(e) => onStepChange(parseInt(e.target.value))}
              disabled={!hasStates}
              className="w-full h-2 bg-black bg-opacity-30 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Start</span>
              <span>End</span>
            </div>
          </div>
        )}

        {/* Speed Control */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">Animation Speed</label>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.5"
            value={speed}
            onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-black bg-opacity-30 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
        </div>

        {/* Control Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onStepChange(Math.max(0, currentStep - 1))}
            disabled={!hasStates || currentStep === 0}
            className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 rounded-lg transition"
          >
            ← Previous
          </button>
          <button
            onClick={() => onStepChange(Math.min(states?.length - 1 || 0, currentStep + 1))}
            disabled={!hasStates || currentStep === (states?.length - 1 || 0)}
            className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 rounded-lg transition"
          >
            Next →
          </button>
        </div>

        {/* Reset Button */}
        <button
          onClick={() => onStepChange(0)}
          disabled={!hasStates}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 rounded-lg transition"
        >
          Reset
        </button>
      </div>
    </motion.div>
  );
}

export default PlaybackControls;
