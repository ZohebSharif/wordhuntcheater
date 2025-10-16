import { Trophy, Star } from "lucide-react";

interface Word {
  text: string;
  points: number;
}

interface WordResultsProps {
  words: Word[];
}

export const WordResults = ({ words }: WordResultsProps) => {
  const totalScore = words.reduce((sum, word) => sum + word.points, 0);

  if (words.length === 0) {
    return (
      <div className="bg-card rounded-2xl border border-border p-12 text-center shadow-soft fade-in">
        <Star className="w-12 h-12 mx-auto mb-4 text-accent/30" />
        <p className="text-sm text-muted-foreground font-medium">Enter letters to find words</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 fade-in">
      {/* Total Score Card */}
      <div className="bg-gradient-to-br from-accent to-primary text-white rounded-2xl p-6 shadow-medium">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider mb-1 opacity-90">Total Score</p>
              <p className="text-3xl font-bold">{totalScore.toLocaleString()}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wider mb-1 opacity-90">Words</p>
            <p className="text-2xl font-bold">{words.length}</p>
          </div>
        </div>
      </div>

      {/* Words List */}
      <div className="bg-card rounded-2xl border border-border p-6 max-h-[500px] overflow-y-auto shadow-medium">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Found Words</h3>
        <div className="space-y-2">
          {words.map((word, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-xl bg-muted/50
                       hover:bg-accent/10 hover:border-accent/20 border border-transparent
                       transition-all duration-200 card-hover"
            >
              <span className="font-semibold text-foreground uppercase tracking-wide">
                {word.text}
              </span>
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground font-medium px-2 py-1 bg-background rounded-md">
                  {word.text.length}L
                </span>
                <span className="font-bold text-accent text-lg">
                  {word.points}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
