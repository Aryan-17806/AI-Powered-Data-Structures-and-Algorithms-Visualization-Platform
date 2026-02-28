import axios from 'axios';

/**
 * AI/LLM Integration Service
 * Handles communication with LLM APIs for algorithm explanations
 */

class AIService {
  constructor() {
    this.provider = process.env.LLM_PROVIDER || 'openai';
    this.apiKey = process.env.OPENAI_API_KEY;
    this.model = process.env.OPENAI_MODEL || 'gpt-4';
    this.baseURL = 'https://api.openai.com/v1';

    this.algorithmDescriptions = {
      'bubble-sort': 'Bubble Sort: Repeatedly step through the list, compare adjacent elements, and swap them if they are in the wrong order.',
      'insertion-sort': 'Insertion Sort: Build the sorted array one item at a time by inserting each element into its correct position.',
      'selection-sort': 'Selection Sort: Find the minimum element and place it at the beginning, repeating for the remaining array.',
      'merge-sort': 'Merge Sort: Divide the array into halves, sort them recursively, and merge them back together.',
      'quick-sort': 'Quick Sort: Select a pivot element and partition the array around it, then recursively sort the partitions.',
      'linear-search': 'Linear Search: Sequential search through elements until the target is found or the end is reached.',
      'binary-search': 'Binary Search: Efficiently search a sorted array by repeatedly dividing the search space in half.',
      'dfs': 'Depth-First Search (DFS): Explore the graph by going as deep as possible before backtracking.',
      'bfs': 'Breadth-First Search (BFS): Explore the graph level by level, visiting all neighbors before moving deeper.',
      'fibonacci-recursive': 'Fibonacci Recursive: Calculate fibonacci number recursively, showing the exponential nature of naive recursion.',
      'dijkstra': 'Dijkstra\'s Algorithm: Find the shortest path from a source node to all other nodes in a weighted graph.'
    };
  }

  async explainAlgorithm(algorithmName, stepDetails = null) {
    if (!this.apiKey) {
      return this.getFallbackExplanation(algorithmName, stepDetails);
    }

    try {
      let prompt = `You are a computer science tutor. ${this.algorithmDescriptions[algorithmName] || algorithmName}

Provide:
1. A step-by-step explanation in simple terms
2. Time and space complexity analysis
3. When to use this algorithm
4. Real-world examples
5. Common pitfalls to avoid

Keep the explanation beginner-friendly and concise.`;

      if (stepDetails) {
        prompt += `\n\nCurrent step: ${JSON.stringify(stepDetails)}`;
      }

      const response = await axios.post(
        `${this.baseURL}/chat/completions`,
        {
          model: this.model,
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
          max_tokens: 1000
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          timeout: 30000
        }
      );

      return {
        explanation: response.data.choices[0].message.content,
        source: 'openai',
        model: this.model
      };
    } catch (error) {
      console.warn('OpenAI API error:', error.message);
      return this.getFallbackExplanation(algorithmName, stepDetails);
    }
  }

  async explainComplexity(algorithmName, complexity) {
    if (!this.apiKey) {
      return this.getFallbackComplexityExplanation(algorithmName, complexity);
    }

    try {
      const prompt = `Explain the time and space complexity of the ${algorithmName} algorithm:
Time Complexity: ${complexity.timeAverage} (average), ${complexity.timeBest} (best), ${complexity.timeWorst} (worst)
Space Complexity: ${complexity.spaceComplexity}

Explain why it has these complexities, how it compares to other sorting/searching algorithms, and when you'd use it.
Keep it beginner-friendly and concise.`;

      const response = await axios.post(
        `${this.baseURL}/chat/completions`,
        {
          model: this.model,
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
          max_tokens: 800
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          timeout: 30000
        }
      );

      return {
        explanation: response.data.choices[0].message.content,
        source: 'openai',
        model: this.model
      };
    } catch (error) {
      console.warn('OpenAI API error:', error.message);
      return this.getFallbackComplexityExplanation(algorithmName, complexity);
    }
  }

  async answerQuestion(algorithmName, question) {
    if (!this.apiKey) {
      return { answer: 'AI service not configured. Please set OPENAI_API_KEY environment variable.' };
    }

    try {
      const prompt = `You are a computer science tutor. A student is asking about the ${algorithmName} algorithm.

Question: ${question}

Provide a clear, beginner-friendly answer that helps the student understand. If the question is about code or implementation, explain the concept rather than writing code.`;

      const response = await axios.post(
        `${this.baseURL}/chat/completions`,
        {
          model: this.model,
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
          max_tokens: 1200
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          timeout: 30000
        }
      );

      return {
        answer: response.data.choices[0].message.content,
        source: 'openai',
        model: this.model
      };
    } catch (error) {
      console.warn('OpenAI API error:', error.message);
      return { answer: 'Unable to generate response. Please try again later.' };
    }
  }

  // Fallback explanations when API is not available
  getFallbackExplanation(algorithmName, stepDetails) {
    const fallbacks = {
      'bubble-sort': {
        explanation: `Bubble Sort works by repeatedly stepping through the list, comparing adjacent elements, and swapping them if they're in the wrong order. The process continues until the entire list is sorted.

How it works:
1. Start at the beginning of the array
2. Compare the first two elements
3. If the first is greater than the second, swap them
4. Move to the next pair and repeat
5. After each pass, the largest element "bubbles" to the end
6. Repeat until no more swaps are needed

Time Complexity:
- Best: O(n) - when array is already sorted
- Average: O(n²) - typical case
- Worst: O(n²) - when array is reverse sorted

Space Complexity: O(1) - sorts in place

When to use: Educational purposes, small datasets, nearly sorted data`,
        source: 'fallback'
      },
      'insertion-sort': {
        explanation: `Insertion Sort builds the sorted array one item at a time by inserting each element into its correct position in the already-sorted portion.

How it works:
1. Start with the second element (first element is considered sorted)
2. Compare it with elements to the left
3. Shift larger elements one position to the right
4. Insert the current element in its correct position
5. Move to the next element and repeat

Time Complexity:
- Best: O(n) - when array is already sorted
- Average: O(n²)
- Worst: O(n²)

Space Complexity: O(1) - sorts in place

When to use: Small datasets, nearly sorted data, online sorting (as you receive data)`,
        source: 'fallback'
      },
      'merge-sort': {
        explanation: `Merge Sort uses a divide-and-conquer approach: divide the array in half, recursively sort each half, then merge them back together.

How it works:
1. Divide the array into two halves
2. Recursively sort the left half
3. Recursively sort the right half
4. Merge the two sorted halves

Time Complexity:
- Best: O(n log n)
- Average: O(n log n)
- Worst: O(n log n)

Space Complexity: O(n) - requires extra space for merging

When to use: Large datasets, when consistent O(n log n) performance is needed, external sorting`,
        source: 'fallback'
      },
      'quick-sort': {
        explanation: `Quick Sort selects a pivot element and partitions the array around it, then recursively sorts the partitions.

How it works:
1. Choose a pivot element
2. Partition: move elements < pivot to left, > pivot to right
3. Recursively sort the left partition
4. Recursively sort the right partition

Time Complexity:
- Best: O(n log n)
- Average: O(n log n)
- Worst: O(n²) - when pivot is always smallest/largest

Space Complexity: O(log n) - recursion depth

When to use: General-purpose sorting, large datasets, cache-efficient`,
        source: 'fallback'
      },
      'linear-search': {
        explanation: `Linear Search sequentially checks each element until the target is found or the end is reached.

How it works:
1. Start at the first element
2. Check if it equals the target
3. If yes, return the index
4. If no, move to the next element
5. Repeat until found or end of array

Time Complexity:
- Best: O(1) - target is first element
- Average: O(n)
- Worst: O(n) - target is last or not found

Space Complexity: O(1)

When to use: Unsorted data, small datasets, when you need all occurrences`,
        source: 'fallback'
      },
      'binary-search': {
        explanation: `Binary Search efficiently searches a sorted array by repeatedly dividing the search space in half.

How it works:
1. Start with the middle element
2. If it equals target, return the index
3. If target < middle, search the left half
4. If target > middle, search the right half
5. Repeat until found or space is exhausted

Time Complexity:
- Best: O(1) - target is in the middle
- Average: O(log n)
- Worst: O(log n)

Space Complexity: O(1) - iterative version

When to use: Sorted data, large datasets, when you need efficient searching`,
        source: 'fallback'
      },
      'fibonacci-recursive': {
        explanation: `Fibonacci Recursive calculates the nth Fibonacci number using recursion, demonstrating exponential time complexity.

How it works:
1. Base case: if n <= 1, return n
2. Recursive case: return fib(n-1) + fib(n-2)
3. Build up the solution from smaller subproblems

Time Complexity:
- O(2^n) - exponential, many redundant calculations

Space Complexity:
- O(n) - recursion stack depth

When to use: Educational purposes, small values of n, teaching recursion concepts

Optimization: Use dynamic programming or memoization to reduce to O(n)`,
        source: 'fallback'
      }
    };

    return fallbacks[algorithmName] || {
      explanation: `Algorithm: ${algorithmName}. For detailed explanation, please configure the OpenAI API with OPENAI_API_KEY environment variable.`,
      source: 'fallback'
    };
  }

  getFallbackComplexityExplanation(algorithmName, complexity) {
    return {
      explanation: `Complexity Analysis for ${algorithmName}:

Time Complexity:
- Best case: ${complexity.timeBest}
- Average case: ${complexity.timeAverage}
- Worst case: ${complexity.timeWorst}

Space Complexity: ${complexity.spaceComplexity}

This means the algorithm's performance depends on the input size (n) according to these growth rates. Smaller Big-O values generally mean faster algorithms for large inputs.`,
      source: 'fallback'
    };
  }
}

export default new AIService();
