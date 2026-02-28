import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../context/authStore';
import AlgorithmControls from '../components/AlgorithmControls';
import ArrayVisualizer from '../components/ArrayVisualizer';
import PlaybackControls from '../components/PlaybackControls';
import ComplexityPanel from '../components/ComplexityPanel';
import ExplanationPanel from '../components/ExplanationPanel';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function VisualizerPage() {
  const navigate = useNavigate();
  const { token } = useAuthStore();
  
  const [states, setStates] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble-sort');
  const [complexity, setComplexity] = useState(null);

  const handleSimulation = async (algorithm, input) => {
    setLoading(true);
    setError('');
    setCurrentStep(0);
    setSelectedAlgorithm(algorithm);

    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.post(
        `${API_URL}/simulate/run`,
        { algorithm, input },
        { headers }
      );

      setStates(response.data.states);
      setComplexity(response.data.complexity);

      if (response.data.states.length === 0) {
        setError('No states generated for this simulation');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to run simulation');
      setStates([]);
    } finally {
      setLoading(false);
    }
  };

  const currentState = states[currentStep];

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white mb-8 text-center"
        >
          Algorithm Visualizer
        </motion.h1>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-500 bg-opacity-30 border border-red-500 text-white rounded-lg p-4 mb-6"
          >
            {error}
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column: Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1 space-y-6"
          >
            <AlgorithmControls
              onSimulate={handleSimulation}
              loading={loading}
              disabled={loading}
            />
            
            <PlaybackControls
              states={states}
              currentStep={currentStep}
              onStepChange={setCurrentStep}
              speed={animationSpeed}
              onSpeedChange={setAnimationSpeed}
              hasStates={states.length > 0}
            />

            <ExplanationPanel algorithm={selectedAlgorithm} complexity={complexity} />
          </motion.div>

          {/* Right Column: Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Main Visualization */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 / animationSpeed }}
              className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl border border-white border-opacity-20 overflow-hidden"
            >
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-white">Visualization</h2>
                  {currentState && (
                    <div className="text-sm text-gray-300">
                      Step: {currentStep + 1}/{states.length}
                    </div>
                  )}
                </div>

                {states.length > 0 ? (
                  <ArrayVisualizer
                    array={currentState?.dataStructureState}
                    highlightedIndices={currentState?.highlightedIndices}
                    operationType={currentState?.operationType}
                  />
                ) : (
                  <div className="h-96 flex items-center justify-center text-gray-400">
                    <p>Run a simulation to see visualization</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Info Panel */}
            {currentState && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-4 border border-white border-opacity-20"
              >
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Operation Type:</span>
                    <span className="ml-2 text-white font-semibold">{currentState.operationType}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Comparisons:</span>
                    <span className="ml-2 text-white font-semibold">{currentState.operationCount?.comparisons || 0}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Swaps:</span>
                    <span className="ml-2 text-white font-semibold">{currentState.operationCount?.swaps || 0}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Assignments:</span>
                    <span className="ml-2 text-white font-semibold">{currentState.operationCount?.assignments || 0}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Complexity Panel */}
            {complexity && <ComplexityPanel complexity={complexity} />}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default VisualizerPage;
