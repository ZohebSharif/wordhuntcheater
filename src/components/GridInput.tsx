import { useState, useRef } from "react";

interface GridInputProps {
  onGridChange: (grid: string[][]) => void;
}

export const GridInput = ({ onGridChange }: GridInputProps) => {
  const [grid, setGrid] = useState<string[][]>(
    Array(4).fill(null).map(() => Array(4).fill(""))
  );
  
  const refs = useRef<(HTMLInputElement | null)[][]>(
    Array(4).fill(null).map(() => Array(4).fill(null))
  );

  const handleCellChange = (row: number, col: number, value: string) => {
    const newGrid = grid.map((r, i) => 
      i === row ? r.map((c, j) => (j === col ? value.toUpperCase() : c)) : r
    );
    setGrid(newGrid);
    onGridChange(newGrid);

    // Move to next cell if input is a letter
    if (value.match(/^[a-zA-Z]$/)) {
      const nextCol = col + 1;
      const nextRow = row + (nextCol >= 4 ? 1 : 0);
      const wrappedCol = nextCol >= 4 ? 0 : nextCol;

      if (nextRow < 4) {
        refs.current[nextRow][wrappedCol]?.focus();
      }
    }
  };

  const handleBackSpace = (row: number, col: number) => {
    // Clear current cell
    const newGrid = grid.map((r, i) => 
      i === row ? r.map((c, j) => (j === col ? "" : c)) : r
    );
    setGrid(newGrid);
    onGridChange(newGrid);

    // Move to previous cell
    const prevCol = col - 1;
    const prevRow = row + (prevCol < 0 ? -1 : 0);
    const wrappedCol = prevCol < 0 ? 3 : prevCol;

    if (prevRow >= 0) {
      refs.current[prevRow][wrappedCol]?.focus();
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, row: number, col: number) => {
    if (e.key === 'Backspace' && grid[row][col] === "") {
      e.preventDefault();
      handleBackSpace(row, col);
    }
  }

  const handleClear = () => {
    const emptyGrid = Array(4).fill(null).map(() => Array(4).fill(""));
    setGrid(emptyGrid);
    onGridChange(emptyGrid);
  }; 

  return (
    <div className="w-full max-w-md mx-auto space-y-4 fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Enter Grid</h2>
        <button
          onClick={handleClear}
          className="text-sm text-muted-foreground hover:text-accent transition-colors duration-200 font-medium"
        >
          Clear
        </button>
      </div>
      
      <div className="grid grid-cols-4 gap-3 p-6 bg-card rounded-2xl border border-border shadow-medium">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              ref={(el) => (refs.current[rowIndex][colIndex] = el)}
              type="text"
              maxLength={1}
              value={cell}
              onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
              className="w-full aspect-square text-center text-2xl font-semibold uppercase 
                       bg-background rounded-xl border-2 border-border
                       focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent
                       focus:scale-105 hover:border-accent/50
                       transition-all duration-200"
              placeholder=""
            />
          ))
        )}
      </div>
    </div>
  );
};
