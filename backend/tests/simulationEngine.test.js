import SimulationEngine from '../src/services/SimulationEngine.js';

describe('SimulationEngine', () => {
  let engine;

  beforeAll(() => {
    engine = new SimulationEngine();
  });

  describe('Bubble Sort', () => {
    test('should sort array correctly', () => {
      const result = engine.bubbleSort([64, 34, 25, 12, 22, 11, 90]);
      const lastState = result.states[result.states.length - 1];
      expect(lastState.dataStructureState).toEqual([11, 12, 22, 25, 34, 64, 90]);
    });

    test('should handle already sorted array', () => {
      const result = engine.bubbleSort([1, 2, 3, 4, 5]);
      expect(result.complexity.timeBest).toBe('O(n)');
    });

    test('should generate correct number of states', () => {
      const result = engine.bubbleSort([3, 1, 2]);
      expect(result.states.length).toBeGreaterThan(0);
    });
  });

  describe('Insertion Sort', () => {
    test('should sort array correctly', () => {
      const result = engine.insertionSort([64, 34, 25, 12, 22, 11, 90]);
      const lastState = result.states[result.states.length - 1];
      expect(lastState.dataStructureState).toEqual([11, 12, 22, 25, 34, 64, 90]);
    });

    test('should track operations', () => {
      const result = engine.insertionSort([3, 1, 2]);
      const lastState = result.states[result.states.length - 1];
      expect(lastState.operationCount.comparisons).toBeGreaterThan(0);
    });
  });

  describe('Binary Search', () => {
    test('should find element that exists', () => {
      const result = engine.binarySearch([1, 3, 5, 7, 9, 11], 7);
      expect(result.result.found).toBe(true);
      expect(result.result.index).toBe(3);
    });

    test('should return not found for missing element', () => {
      const result = engine.binarySearch([1, 3, 5, 7, 9, 11], 4);
      expect(result.result.found).toBe(false);
    });

    test('should track comparisons', () => {
      const result = engine.binarySearch([1, 2, 3, 4, 5], 3);
      expect(result.result.comparisons).toBeGreaterThan(0);
    });
  });

  describe('Fibonacci Recursive', () => {
    test('should calculate fibonacci correctly', () => {
      const result = engine.fibonacciRecursive(5);
      expect(result.result).toBe(5);
    });

    test('should track recursion depth', () => {
      const result = engine.fibonacciRecursive(4);
      const lastState = result.states[result.states.length - 1];
      expect(lastState.operationCount.recursionDepth).toBe(0); // Final depth is 0
    });

    test('should handle base cases', () => {
      const result0 = engine.fibonacciRecursive(0);
      const result1 = engine.fibonacciRecursive(1);
      expect(result0.result).toBe(0);
      expect(result1.result).toBe(1);
    });

    test('should reject very large numbers', () => {
      expect(() => engine.fibonacciRecursive(100)).toThrow();
    });
  });

  describe('Merge Sort', () => {
    test('should sort array correctly', () => {
      const result = engine.mergeSort([64, 34, 25, 12, 22, 11, 90]);
      const lastState = result.states[result.states.length - 1];
      expect(lastState.dataStructureState).toEqual([11, 12, 22, 25, 34, 64, 90]);
    });

    test('should have O(n log n) complexity', () => {
      const result = engine.mergeSort([5, 2, 8, 1, 9]);
      expect(result.complexity.timeAverage).toBe('O(n log n)');
    });
  });

  describe('Quick Sort', () => {
    test('should sort array correctly', () => {
      const result = engine.quickSort([64, 34, 25, 12, 22, 11, 90]);
      const lastState = result.states[result.states.length - 1];
      expect(lastState.dataStructureState).toEqual([11, 12, 22, 25, 34, 64, 90]);
    });
  });

  describe('DFS', () => {
    test('should traverse graph correctly', () => {
      const adjacencyList = {
        'A': ['B', 'C'],
        'B': ['D'],
        'C': ['E'],
        'D': [],
        'E': []
      };
      const result = engine.dfs(adjacencyList, 'A');
      expect(result.result).toContain('A');
      expect(result.result.length).toBe(5);
    });
  });

  describe('BFS', () => {
    test('should traverse graph correctly', () => {
      const adjacencyList = {
        'A': ['B', 'C'],
        'B': ['D'],
        'C': ['E'],
        'D': [],
        'E': []
      };
      const result = engine.bfs(adjacencyList, 'A');
      expect(result.result).toContain('A');
      expect(result.result.length).toBe(5);
    });
  });

  describe('General Simulation', () => {
    test('should handle bubble-sort algorithm', () => {
      const result = engine.simulate('bubble-sort', { array: [3, 1, 4, 1, 5] });
      expect(result.states).toBeDefined();
      expect(result.complexity).toBeDefined();
    });

    test('should throw error for unknown algorithm', () => {
      expect(() => engine.simulate('unknown-algorithm', { array: [1, 2, 3] }))
        .toThrow();
    });
  });
});
