import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { GridInput } from "@/components/GridInput";
import { WordResults } from "@/components/WordResults";
import { findWords } from "@/utils/wordFinder";

interface Word {
  text: string;
  points: number;
}

const Index = () => {
  const [grid, setGrid] = useState<string[][]>(
    Array(4).fill(null).map(() => Array(4).fill(""))
  );
  const [words, setWords] = useState<Word[]>([]);

  useEffect(() => {
    const hasValidLetters = grid.some(row => row.some(cell => cell.trim() !== ""));
    
    if (hasValidLetters) {
      const foundWords = findWords(grid);
      setWords(foundWords);
    } else {
      setWords([]);
    }
  }, [grid]);

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <header className="text-center space-y-3 fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Word Hunt Cheater
          </h1>
          <p className="text-base text-muted-foreground font-medium">
            Find all valid words on your 4×4 board
          </p>
        </header>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <GridInput onGridChange={setGrid} />
          <WordResults words={words} />
        </div>
      </div>
    </div>
  );
};

export default Index;
