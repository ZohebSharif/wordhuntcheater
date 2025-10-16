// Set to store valid words
let VALID_WORDS: Set<string> = new Set();

// Load words from file
const loadWords = async () => {
  try {
    const response = await fetch('./listofwords.txt');
    const text = await response.text();
    VALID_WORDS = new Set(
      text.split('\n')
          .map(word => word.trim().toUpperCase())
          .filter(word => word.length >= 3 && word.length <= 8)
    );
    console.log(`Loaded ${VALID_WORDS.size} words from dictionary`);
  } catch (error) {
    console.error('Error loading words:', error);
  }
};

// Initialize word loading
loadWords();

interface Word {
  text: string;
  points: number;
}

const POINTS = {
  3: 100,
  4: 400,
  5: 800,
  6: 1400,
  7: 1800,
  8: 2200,
};

export const findWords = (grid: string[][]): Word[] => {
  // If dictionary isn't loaded yet, try loading it
  if (VALID_WORDS.size === 0) {
    loadWords();
    return [];
  }

  const words: Set<string> = new Set();
  const visited = Array(4).fill(null).map(() => Array(4).fill(false));

  const isValid = (row: number, col: number): boolean => {
    return row >= 0 && row < 4 && col >= 0 && col < 4 && !visited[row][col];
  };

  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1],
  ];

  const dfs = (row: number, col: number, current: string) => {
    if (current.length >= 3 && VALID_WORDS.has(current)) {
      words.add(current);
    }

    if (current.length >= 8) return;

    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;

      if (isValid(newRow, newCol)) {
        visited[newRow][newCol] = true;
        dfs(newRow, newCol, current + grid[newRow][newCol]);
        visited[newRow][newCol] = false;
      }
    }
  };

  // Start DFS from each cell
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j]) {
        visited[i][j] = true;
        dfs(i, j, grid[i][j]);
        visited[i][j] = false;
      }
    }
  }

  // Convert to array with points and sort by points (descending)
  return Array.from(words)
    .map(word => ({
      text: word,
      points: POINTS[word.length as keyof typeof POINTS] || 0,
    }))
    .sort((a, b) => b.points - a.points);
};
