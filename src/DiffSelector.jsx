function DifficultySelector({ currentDifficulty, onChange, disabled }) {
  const difficulties = [
    { id: 'easy', label: 'Easy (4×4)' },
    { id: 'medium', label: 'Medium (6×6)' },
    { id: 'hard', label: 'Hard (8×8)' },
  ];

  return (
    <div className="difficulty-selector">
      {difficulties.map((diff) => (
        <button
          key={diff.id}
          className={`difficulty-btn ${currentDifficulty === diff.id ? 'active' : ''}`}
          onClick={() => onChange(diff.id)}
          disabled={disabled}
        >
          {diff.label}
        </button>
      ))}
    </div>
  );
}

export default DifficultySelector;