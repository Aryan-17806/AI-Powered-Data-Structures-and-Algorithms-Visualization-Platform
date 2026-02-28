export const getStructures = (req, res) => {
  const structures = [
    {
      id: 'array',
      name: 'Array',
      description: 'Contiguous collection of elements with random access',
      visualization: 'rectangles'
    },
    {
      id: 'stack',
      name: 'Stack',
      description: 'LIFO (Last In First Out) data structure',
      visualization: 'vertical-blocks'
    },
    {
      id: 'queue',
      name: 'Queue',
      description: 'FIFO (First In First Out) data structure',
      visualization: 'horizontal-blocks'
    },
    {
      id: 'linked-list',
      name: 'Linked List',
      description: 'Nodes connected by pointers/references',
      visualization: 'circles-with-arrows'
    },
    {
      id: 'binary-tree',
      name: 'Binary Tree',
      description: 'Hierarchical structure with at most 2 children per node',
      visualization: 'hierarchical-tree'
    },
    {
      id: 'graph',
      name: 'Graph',
      description: 'Nodes connected by edges with various properties',
      visualization: 'force-directed'
    }
  ];

  res.json(structures);
};

export const getAlgorithms = (req, res) => {
  const algorithms = [
    {
      id: 'bubble-sort',
      name: 'Bubble Sort',
      category: 'Sorting',
      description: 'Repeatedly compares and swaps adjacent elements',
      timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
      spaceComplexity: 'O(1)'
    },
    {
      id: 'insertion-sort',
      name: 'Insertion Sort',
      category: 'Sorting',
      description: 'Builds sorted array by inserting elements at correct position',
      timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
      spaceComplexity: 'O(1)'
    },
    {
      id: 'selection-sort',
      name: 'Selection Sort',
      category: 'Sorting',
      description: 'Finds minimum element and places it at beginning',
      timeComplexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
      spaceComplexity: 'O(1)'
    },
    {
      id: 'merge-sort',
      name: 'Merge Sort',
      category: 'Sorting',
      description: 'Divide and conquer: divide, sort, merge',
      timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
      spaceComplexity: 'O(n)'
    },
    {
      id: 'quick-sort',
      name: 'Quick Sort',
      category: 'Sorting',
      description: 'Partitions array around pivot and recursively sorts',
      timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
      spaceComplexity: 'O(log n)'
    },
    {
      id: 'linear-search',
      name: 'Linear Search',
      category: 'Searching',
      description: 'Sequential search through elements',
      timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
      spaceComplexity: 'O(1)'
    },
    {
      id: 'binary-search',
      name: 'Binary Search',
      category: 'Searching',
      description: 'Efficient search on sorted arrays',
      timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
      spaceComplexity: 'O(1)'
    },
    {
      id: 'dfs',
      name: 'Depth-First Search',
      category: 'Traversal',
      description: 'Explores graph depth before breadth',
      timeComplexity: { best: 'O(V+E)', average: 'O(V+E)', worst: 'O(V+E)' },
      spaceComplexity: 'O(V)'
    },
    {
      id: 'bfs',
      name: 'Breadth-First Search',
      category: 'Traversal',
      description: 'Explores graph level by level',
      timeComplexity: { best: 'O(V+E)', average: 'O(V+E)', worst: 'O(V+E)' },
      spaceComplexity: 'O(V)'
    },
    {
      id: 'fibonacci-recursive',
      name: 'Fibonacci (Recursive)',
      category: 'Recursion',
      description: 'Calculates fibonacci number using recursion',
      timeComplexity: { best: 'O(2^n)', average: 'O(2^n)', worst: 'O(2^n)' },
      spaceComplexity: 'O(n)'
    },
    {
      id: 'dijkstra',
      name: "Dijkstra's Algorithm",
      category: 'Graph',
      description: 'Finds shortest path in weighted graph',
      timeComplexity: { best: 'O((V+E)log V)', average: 'O((V+E)log V)', worst: 'O(V²)' },
      spaceComplexity: 'O(V)'
    }
  ];

  res.json(algorithms);
};
