/**
 * Deterministic Simulation Engine
 * Generates state snapshots for each step of an algorithm
 * No arbitrary code execution - only structured algorithm logic
 */

class SimulationEngine {
  constructor(maxRecursionDepth = 1000) {
    this.maxRecursionDepth = maxRecursionDepth;
    this.algorithms = {
      'bubble-sort': this.bubbleSort,
      'insertion-sort': this.insertionSort,
      'selection-sort': this.selectionSort,
      'merge-sort': this.mergeSort,
      'quick-sort': this.quickSort,
      'linear-search': this.linearSearch,
      'binary-search': this.binarySearch,
      'dfs': this.dfs,
      'bfs': this.bfs,
      'fibonacci-recursive': this.fibonacciRecursive,
      'dijkstra': this.dijkstra
    };
  }

  // ===== HELPER METHODS =====
  createState(step, array, highlightedIndices = [], operationType = '', operationCount = {}) {
    return {
      step,
      dataStructureState: [...array],
      highlightedIndices,
      currentLine: '',
      operationType,
      stackState: [],
      operationCount: {
        comparisons: operationCount.comparisons || 0,
        swaps: operationCount.swaps || 0,
        assignments: operationCount.assignments || 0,
        recursionDepth: operationCount.recursionDepth || 0
      },
      timestamp: new Date()
    };
  }

  // ===== SORTING ALGORITHMS =====
  bubbleSort(array) {
    const arr = [...array];
    const states = [];
    let step = 0;
    let comparisons = 0;
    let swaps = 0;
    let assignments = 0;

    states.push(this.createState(step++, arr, [], 'START', { comparisons, swaps, assignments }));

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        comparisons++;
        states.push(this.createState(step++, arr, [j, j + 1], 'COMPARE', { comparisons, swaps, assignments }));

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swaps++;
          assignments += 2;
          states.push(this.createState(step++, arr, [j, j + 1], 'SWAP', { comparisons, swaps, assignments }));
        }
      }
    }

    states.push(this.createState(step++, arr, [], 'COMPLETE', { comparisons, swaps, assignments }));
    return {
      states,
      complexity: { timeAverage: 'O(n²)', timeBest: 'O(n)', timeWorst: 'O(n²)', spaceComplexity: 'O(1)' }
    };
  }

  insertionSort(array) {
    const arr = [...array];
    const states = [];
    let step = 0;
    let comparisons = 0;
    let swaps = 0;
    let assignments = 0;

    states.push(this.createState(step++, arr, [], 'START', { comparisons, swaps, assignments }));

    for (let i = 1; i < arr.length; i++) {
      const key = arr[i];
      assignments++;
      let j = i - 1;

      while (j >= 0) {
        comparisons++;
        states.push(this.createState(step++, arr, [j, i], 'COMPARE', { comparisons, swaps, assignments }));

        if (arr[j] > key) {
          arr[j + 1] = arr[j];
          assignments++;
          j--;
          states.push(this.createState(step++, arr, [j + 1, j], 'SHIFT', { comparisons, swaps, assignments }));
        } else {
          break;
        }
      }

      arr[j + 1] = key;
      assignments++;
      swaps++;
      states.push(this.createState(step++, arr, [j + 1, i], 'INSERT', { comparisons, swaps, assignments }));
    }

    states.push(this.createState(step++, arr, [], 'COMPLETE', { comparisons, swaps, assignments }));
    return {
      states,
      complexity: { timeAverage: 'O(n²)', timeBest: 'O(n)', timeWorst: 'O(n²)', spaceComplexity: 'O(1)' }
    };
  }

  selectionSort(array) {
    const arr = [...array];
    const states = [];
    let step = 0;
    let comparisons = 0;
    let swaps = 0;
    let assignments = 0;

    states.push(this.createState(step++, arr, [], 'START', { comparisons, swaps, assignments }));

    for (let i = 0; i < arr.length - 1; i++) {
      let minIdx = i;
      states.push(this.createState(step++, arr, [i], 'SELECT_MIN', { comparisons, swaps, assignments }));

      for (let j = i + 1; j < arr.length; j++) {
        comparisons++;
        states.push(this.createState(step++, arr, [j, minIdx], 'COMPARE', { comparisons, swaps, assignments }));

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }

      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        swaps++;
        assignments += 2;
        states.push(this.createState(step++, arr, [i, minIdx], 'SWAP', { comparisons, swaps, assignments }));
      }
    }

    states.push(this.createState(step++, arr, [], 'COMPLETE', { comparisons, swaps, assignments }));
    return {
      states,
      complexity: { timeAverage: 'O(n²)', timeBest: 'O(n²)', timeWorst: 'O(n²)', spaceComplexity: 'O(1)' }
    };
  }

  mergeSort(array) {
    const arr = [...array];
    const states = [];
    let step = 0;
    let comparisons = 0;
    let swaps = 0;
    let assignments = 0;

    states.push(this.createState(step++, arr, [], 'START', { comparisons, swaps, assignments }));

    const merge = (left, mid, right) => {
      const leftArr = arr.slice(left, mid + 1);
      const rightArr = arr.slice(mid + 1, right + 1);
      let i = 0, j = 0, k = left;

      while (i < leftArr.length && j < rightArr.length) {
        comparisons++;
        states.push(this.createState(step++, arr, [left + i, mid + 1 + j], 'COMPARE', { comparisons, swaps, assignments }));

        if (leftArr[i] <= rightArr[j]) {
          arr[k++] = leftArr[i++];
          assignments++;
        } else {
          arr[k++] = rightArr[j++];
          assignments++;
        }
        states.push(this.createState(step++, arr, [k - 1], 'MERGE_INSERT', { comparisons, swaps, assignments }));
      }

      while (i < leftArr.length) {
        arr[k++] = leftArr[i++];
        assignments++;
        states.push(this.createState(step++, arr, [k - 1], 'MERGE_INSERT', { comparisons, swaps, assignments }));
      }

      while (j < rightArr.length) {
        arr[k++] = rightArr[j++];
        assignments++;
        states.push(this.createState(step++, arr, [k - 1], 'MERGE_INSERT', { comparisons, swaps, assignments }));
      }
    };

    const mergeSort_Helper = (left, right) => {
      if (left < right) {
        const mid = Math.floor((left + right) / 2);
        mergeSort_Helper(left, mid);
        mergeSort_Helper(mid + 1, right);
        merge(left, mid, right);
      }
    };

    mergeSort_Helper(0, arr.length - 1);
    states.push(this.createState(step++, arr, [], 'COMPLETE', { comparisons, swaps, assignments }));

    return {
      states,
      complexity: { timeAverage: 'O(n log n)', timeBest: 'O(n log n)', timeWorst: 'O(n log n)', spaceComplexity: 'O(n)' }
    };
  }

  quickSort(array) {
    const arr = [...array];
    const states = [];
    let step = 0;
    let comparisons = 0;
    let swaps = 0;
    let assignments = 0;

    states.push(this.createState(step++, arr, [], 'START', { comparisons, swaps, assignments }));

    const partition = (low, high) => {
      const pivot = arr[high];
      let i = low - 1;

      for (let j = low; j < high; j++) {
        comparisons++;
        states.push(this.createState(step++, arr, [j, high], 'COMPARE', { comparisons, swaps, assignments }));

        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          swaps++;
          assignments += 2;
          states.push(this.createState(step++, arr, [i, j], 'SWAP', { comparisons, swaps, assignments }));
        }
      }

      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      swaps++;
      assignments += 2;
      states.push(this.createState(step++, arr, [i + 1, high], 'PIVOT_SWAP', { comparisons, swaps, assignments }));
      return i + 1;
    };

    const quickSort_Helper = (low, high) => {
      if (low < high) {
        const pi = partition(low, high);
        quickSort_Helper(low, pi - 1);
        quickSort_Helper(pi + 1, high);
      }
    };

    quickSort_Helper(0, arr.length - 1);
    states.push(this.createState(step++, arr, [], 'COMPLETE', { comparisons, swaps, assignments }));

    return {
      states,
      complexity: { timeAverage: 'O(n log n)', timeBest: 'O(n log n)', timeWorst: 'O(n²)', spaceComplexity: 'O(log n)' }
    };
  }

  // ===== SEARCHING ALGORITHMS =====
  linearSearch(array, target) {
    const arr = [...array];
    const states = [];
    let step = 0;
    let comparisons = 0;

    states.push(this.createState(step++, arr, [], 'START', { comparisons }));

    for (let i = 0; i < arr.length; i++) {
      comparisons++;
      states.push(this.createState(step++, arr, [i], 'CHECK', { comparisons }));

      if (arr[i] === target) {
        states.push(this.createState(step++, arr, [i], 'FOUND', { comparisons }));
        return {
          states,
          result: { found: true, index: i, comparisons }
        };
      }
    }

    states.push(this.createState(step++, arr, [], 'NOT_FOUND', { comparisons }));
    return {
      states,
      result: { found: false, index: -1, comparisons }
    };
  }

  binarySearch(array, target) {
    const arr = [...array].sort((a, b) => a - b); // Binary search requires sorted array
    const states = [];
    let step = 0;
    let comparisons = 0;

    states.push(this.createState(step++, arr, [], 'START', { comparisons }));

    let left = 0, right = arr.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      comparisons++;
      states.push(this.createState(step++, arr, [left, mid, right], 'CHECK', { comparisons }));

      if (arr[mid] === target) {
        states.push(this.createState(step++, arr, [mid], 'FOUND', { comparisons }));
        return {
          states,
          result: { found: true, index: mid, comparisons }
        };
      } else if (arr[mid] < target) {
        left = mid + 1;
        states.push(this.createState(step++, arr, [mid], 'GO_RIGHT', { comparisons }));
      } else {
        right = mid - 1;
        states.push(this.createState(step++, arr, [mid], 'GO_LEFT', { comparisons }));
      }
    }

    states.push(this.createState(step++, arr, [], 'NOT_FOUND', { comparisons }));
    return {
      states,
      result: { found: false, index: -1, comparisons }
    };
  }

  // ===== GRAPH TRAVERSAL =====
  dfs(adjacencyList, startNode = 'A') {
    const states = [];
    let step = 0;
    const visited = new Set();
    const stack = [startNode];
    const dfsOrder = [];

    states.push({
      step: step++,
      dataStructureState: { adjacencyList, visited: Array.from(visited), stack: [...stack], dfsOrder },
      operationType: 'START'
    });

    while (stack.length > 0) {
      const node = stack.pop();

      if (!visited.has(node)) {
        visited.add(node);
        dfsOrder.push(node);
        states.push({
          step: step++,
          dataStructureState: { adjacencyList, visited: Array.from(visited), stack: [...stack], dfsOrder },
          operationType: 'VISIT',
          highlightedIndices: [node]
        });

        if (adjacencyList[node]) {
          const neighbors = adjacencyList[node].filter(n => !visited.has(n)).reverse();
          stack.push(...neighbors);
          states.push({
            step: step++,
            dataStructureState: { adjacencyList, visited: Array.from(visited), stack: [...stack], dfsOrder },
            operationType: 'ADD_TO_STACK'
          });
        }
      }
    }

    states.push({
      step: step++,
      dataStructureState: { adjacencyList, visited: Array.from(visited), stack: [], dfsOrder },
      operationType: 'COMPLETE'
    });

    return {
      states,
      result: dfsOrder,
      complexity: { timeAverage: 'O(V+E)', timeBest: 'O(V+E)', timeWorst: 'O(V+E)', spaceComplexity: 'O(V)' }
    };
  }

  bfs(adjacencyList, startNode = 'A') {
    const states = [];
    let step = 0;
    const visited = new Set([startNode]);
    const queue = [startNode];
    const bfsOrder = [];

    states.push({
      step: step++,
      dataStructureState: { adjacencyList, visited: Array.from(visited), queue: [...queue], bfsOrder },
      operationType: 'START'
    });

    while (queue.length > 0) {
      const node = queue.shift();
      bfsOrder.push(node);
      states.push({
        step: step++,
        dataStructureState: { adjacencyList, visited: Array.from(visited), queue: [...queue], bfsOrder },
        operationType: 'VISIT',
        highlightedIndices: [node]
      });

      if (adjacencyList[node]) {
        adjacencyList[node].forEach(neighbor => {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            queue.push(neighbor);
          }
        });
        states.push({
          step: step++,
          dataStructureState: { adjacencyList, visited: Array.from(visited), queue: [...queue], bfsOrder },
          operationType: 'ADD_TO_QUEUE'
        });
      }
    }

    states.push({
      step: step++,
      dataStructureState: { adjacencyList, visited: Array.from(visited), queue: [], bfsOrder },
      operationType: 'COMPLETE'
    });

    return {
      states,
      result: bfsOrder,
      complexity: { timeAverage: 'O(V+E)', timeBest: 'O(V+E)', timeWorst: 'O(V+E)', spaceComplexity: 'O(V)' }
    };
  }

  // ===== RECURSION ALGORITHMS =====
  fibonacciRecursive(n) {
    const states = [];
    let step = 0;
    let callCount = 0;
    const recursionStack = [];

    const fib = (num, depth) => {
      if (callCount > 10000) throw new Error('Max recursion limit exceeded');
      if (depth > this.maxRecursionDepth) throw new Error('Recursion depth exceeded');

      callCount++;
      recursionStack.push({ n: num, depth, status: 'ENTERING' });

      states.push({
        step: step++,
        dataStructureState: { n: num, result: null },
        operationType: 'CALL',
        stackState: JSON.parse(JSON.stringify(recursionStack)),
        operationCount: { recursionDepth: depth, comparisons: 0, swaps: 0, assignments: 0 }
      });

      let result;
      if (num <= 1) {
        result = num;
        recursionStack[recursionStack.length - 1].status = 'RETURN';
        recursionStack[recursionStack.length - 1].result = result;

        states.push({
          step: step++,
          dataStructureState: { n: num, result },
          operationType: 'BASE_CASE',
          stackState: JSON.parse(JSON.stringify(recursionStack)),
          operationCount: { recursionDepth: depth, comparisons: 1 }
        });
      } else {
        const fib1 = fib(num - 1, depth + 1);
        const fib2 = fib(num - 2, depth + 1);
        result = fib1 + fib2;

        recursionStack[recursionStack.length - 1].status = 'RETURN';
        recursionStack[recursionStack.length - 1].result = result;

        states.push({
          step: step++,
          dataStructureState: { n: num, result, fib1, fib2 },
          operationType: 'RETURN',
          stackState: JSON.parse(JSON.stringify(recursionStack)),
          operationCount: { recursionDepth: depth }
        });
      }

      recursionStack.pop();
      return result;
    };

    const result = fib(n, 0);

    states.push({
      step: step++,
      dataStructureState: { n, result },
      operationType: 'COMPLETE',
      stackState: [],
      operationCount: { recursionDepth: 0, comparisons: callCount }
    });

    return {
      states,
      result,
      complexity: { timeAverage: 'O(2^n)', timeBest: 'O(2^n)', timeWorst: 'O(2^n)', spaceComplexity: 'O(n)' }
    };
  }

  // ===== GRAPH ALGORITHMS =====
  dijkstra(adjacencyList, startNode = 'A') {
    const states = [];
    let step = 0;
    const distances = {};
    const visited = new Set();
    const previous = {};

    // Initialize
    for (const node in adjacencyList) {
      distances[node] = Infinity;
      previous[node] = null;
    }
    distances[startNode] = 0;

    states.push({
      step: step++,
      dataStructureState: { distances: { ...distances }, visited: Array.from(visited), previous: { ...previous } },
      operationType: 'INITIALIZE'
    });

    while (visited.size < Object.keys(adjacencyList).length) {
      let minNode = null;
      let minDistance = Infinity;

      for (const node in distances) {
        if (!visited.has(node) && distances[node] < minDistance) {
          minDistance = distances[node];
          minNode = node;
        }
      }

      if (minNode === null) break;

      visited.add(minNode);
      states.push({
        step: step++,
        dataStructureState: { distances: { ...distances }, visited: Array.from(visited), previous: { ...previous } },
        operationType: 'SELECT_MIN',
        highlightedIndices: [minNode]
      });

      if (adjacencyList[minNode]) {
        for (const [neighbor, weight] of Object.entries(adjacencyList[minNode])) {
          const newDistance = distances[minNode] + weight;

          states.push({
            step: step++,
            dataStructureState: { distances: { ...distances }, visited: Array.from(visited), previous: { ...previous } },
            operationType: 'RELAX',
            highlightedIndices: [minNode, neighbor]
          });

          if (newDistance < distances[neighbor]) {
            distances[neighbor] = newDistance;
            previous[neighbor] = minNode;

            states.push({
              step: step++,
              dataStructureState: { distances: { ...distances }, visited: Array.from(visited), previous: { ...previous } },
              operationType: 'UPDATE',
              highlightedIndices: [neighbor]
            });
          }
        }
      }
    }

    states.push({
      step: step++,
      dataStructureState: { distances: { ...distances }, visited: Array.from(visited), previous: { ...previous } },
      operationType: 'COMPLETE'
    });

    return {
      states,
      result: distances,
      complexity: { timeAverage: 'O((V+E)logV)', timeBest: 'O((V+E)logV)', timeWorst: 'O(V²)', spaceComplexity: 'O(V)' }
    };
  }

  // ===== TREE TRAVERSALS =====
  inorderTraversal(treeData) {
    const states = [];
    let step = 0;
    const result = [];

    const traverse = (node, depth = 0) => {
      if (!node) return;

      traverse(node.left, depth + 1);
      result.push(node.value);

      states.push({
        step: step++,
        dataStructureState: { tree: treeData, traversalResult: [...result] },
        operationType: 'VISIT',
        highlightedIndices: [node.value]
      });

      traverse(node.right, depth + 1);
    };

    traverse(treeData.root);

    states.push({
      step: step++,
      dataStructureState: { tree: treeData, traversalResult: result },
      operationType: 'COMPLETE'
    });

    return {
      states,
      result,
      complexity: { timeAverage: 'O(n)', timeBest: 'O(n)', timeWorst: 'O(n)', spaceComplexity: 'O(h)' }
    };
  }

  // Main simulate method
  simulate(algorithm, input) {
    if (!this.algorithms[algorithm]) {
      throw new Error(`Algorithm '${algorithm}' not found`);
    }

    const algorithmFunc = this.algorithms[algorithm].bind(this);

    try {
      if (['linear-search', 'binary-search'].includes(algorithm)) {
        return algorithmFunc(input.array, input.target);
      } else if (['dfs', 'bfs'].includes(algorithm)) {
        return algorithmFunc(input.adjacencyList, input.startNode);
      } else if (algorithm === 'fibonacci-recursive') {
        return algorithmFunc(input.value);
      } else if (algorithm === 'dijkstra') {
        return algorithmFunc(input.adjacencyList, input.startNode);
      } else {
        return algorithmFunc(input.array);
      }
    } catch (error) {
      throw new Error(`Simulation error: ${error.message}`);
    }
  }
}

export default SimulationEngine;
