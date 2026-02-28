import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function ExplanationPanel({ algorithm, complexity }) {
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const fetchExplanation = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/explain/algorithm`, { algorithm });
      setExplanation(response.data.explanation);
    } catch (error) {
      setExplanation('Failed to fetch explanation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const algorithmDescriptions = {
    'bubble-sort': 'Bubble Sort repeatedly compares adjacent elements and swaps them if they are in the wrong order. Simple but inefficient for large datasets.',
    'insertion-sort': 'Insertion Sort builds the sorted array one item at a time. It\'s efficient for small datasets and nearly sorted data.',
    'merge-sort': 'Merge Sort divides the array, sorts recursively, and merges. Guarantees O(n log n) time complexity.',
    'quick-sort': 'Quick Sort uses partitioning around a pivot. Generally faster than merge sort due to better cache locality.',
    'binary-search': 'Binary Search efficiently finds elements in sorted arrays by repeatedly dividing the search space in half.',
    'linear-search': 'Linear Search checks each element sequentially. Simple but slow for large datasets.',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl border border-white border-opacity-20 overflow-hidden"
    >
      <div className="flex border-b border-white border-opacity-20">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 px-4 py-3 font-semibold transition ${
            activeTab === 'overview'
              ? 'bg-blue-500 text-white'
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('ai-explanation')}
          className={`flex-1 px-4 py-3 font-semibold transition ${
            activeTab === 'ai-explanation'
              ? 'bg-blue-500 text-white'
              : 'text-gray-300 hover:text-white'
          }`}
        >
          AI Explanation
        </button>
      </div>

      <div className="p-6 space-y-4">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <p className="text-gray-300">
              {algorithmDescriptions[algorithm] || 'Select an algorithm to see its description.'}
            </p>
            {complexity && (
              <div className="bg-black bg-opacity-30 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Quick Facts</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>⏱️ <strong>Time Complexity:</strong> {complexity.timeAverage}</li>
                  <li>💾 <strong>Space Complexity:</strong> {complexity.spaceComplexity}</li>
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === 'ai-explanation' && (
          <div className="space-y-4">
            {!explanation ? (
              <button
                onClick={fetchExplanation}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 text-white font-bold py-2 px-4 rounded-lg transition"
              >
                {loading ? '⏳ Generating Explanation...' : '🤖 Get AI Explanation'}
              </button>
            ) : (
              <div className="bg-black bg-opacity-30 rounded-lg p-4">
                <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">
                  {explanation}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default ExplanationPanel;
