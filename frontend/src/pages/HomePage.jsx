import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function HomePage() {
  const features = [
    {
      icon: '🎨',
      title: 'Interactive Visualization',
      description: 'Watch algorithms come to life with smooth animations',
    },
    {
      icon: '⏯️',
      title: 'Step-by-Step Execution',
      description: 'Control the pace with play, pause, and step controls',
    },
    {
      icon: '📊',
      title: 'Complexity Analysis',
      description: 'Understand time and space complexity with real-time tracking',
    },
    {
      icon: '🤖',
      title: 'AI-Powered Explanations',
      description: 'Get intelligent, beginner-friendly explanations powered by LLMs',
    },
    {
      icon: '📚',
      title: 'Multiple Algorithms',
      description: 'Explore sorting, searching, graph traversal, and more',
    },
    {
      icon: '📱',
      title: 'Fully Responsive',
      description: 'Learn on desktop, tablet, or mobile devices',
    },
  ];

  const algorithms = [
    'Bubble Sort',
    'Insertion Sort',
    'Merge Sort',
    'Quick Sort',
    'Binary Search',
    'Linear Search',
    'DFS & BFS',
    'Dijkstra',
  ];

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Master Data Structures & Algorithms
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8">
          Interactive visualization + AI explanations = Deep understanding
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            to="/visualizer"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105"
          >
            Start Visualizing →
          </Link>
          <Link
            to="/signup"
            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-bold py-3 px-8 rounded-lg transition border border-white border-opacity-50"
          >
            Create Account
          </Link>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
      >
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Why Use Our Platform?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded-xl p-6 hover:bg-opacity-20 transition"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Algorithms Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
      >
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Algorithms Covered
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {algorithms.map((algo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-4 text-white font-semibold text-center hover:shadow-lg hover:shadow-blue-500/50 transition"
            >
              {algo}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded-xl p-12 text-center"
      >
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Learn?
        </h2>
        <p className="text-gray-200 mb-8 text-lg">
          Start visualizing algorithms today and understand how they work under the hood.
        </p>
        <Link
          to="/visualizer"
          className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-10 rounded-lg transition transform hover:scale-105"
        >
          Open Visualizer 🚀
        </Link>
      </motion.section>
    </div>
  );
}

export default HomePage;
