import mongoose from 'mongoose';

const simulationSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    algorithm: {
      type: String,
      required: true,
      enum: [
        'bubble-sort',
        'insertion-sort',
        'selection-sort',
        'merge-sort',
        'quick-sort',
        'linear-search',
        'binary-search',
        'dfs',
        'bfs',
        'fibonacci-recursive',
        'dijkstra'
      ]
    },
    input: {
      array: [Number],
      value: Number,
      startNode: String
    },
    states: [{
      step: Number,
      dataStructureState: mongoose.Schema.Types.Mixed,
      highlightedIndices: [Number],
      currentLine: String,
      operationType: String,
      stackState: [mongoose.Schema.Types.Mixed],
      operationCount: {
        comparisons: Number,
        swaps: Number,
        assignments: Number,
        recursionDepth: Number
      },
      timestamp: Date
    }],
    complexity: {
      timeAverage: String,
      timeBest: String,
      timeWorst: String,
      spaceComplexity: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

const SimulationSession = mongoose.model('SimulationSession', simulationSessionSchema);
export default SimulationSession;
