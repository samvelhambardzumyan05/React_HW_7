import { useState } from 'react';
import GameBoard from './GameBoard';
import DiffSelector from './DiffSelector';
import GameStats from './GameStats';
import './App.css';

function App() {
  const [difficulty, setDifficulty] = useState('medium');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [stats, setStats] = useState({
    startTime: Date.now(),
    endTime: null,
    attempts: 0,
    matchedPairs: 0,
    totalPairs: difficulty === 'easy' ? 8 : difficulty === 'medium' ? 12 : 18
  });
  const [gameKey, setGameKey] = useState(0);

  const setDiffChange = (newDiff) => {
    setDifficulty(newDiff);
    resetGame();
  };

  const startGame = () => {
    const totalPairs = difficulty === 'easy' ? 8 : difficulty === 'medium' ? 12 : 18;
    setGameStarted(true);
    setGameCompleted(false);
    setStats({
      startTime: Date.now(),
      endTime: null,
      attempts: 0,
      matchedPairs: 0,
      totalPairs
    });
  };

  const endGame = (finalStats) => {
    setGameCompleted(true);
    setStats(prev => ({
      ...prev,
      endTime: Date.now(),
      ...finalStats
    }));
  };

  const handleStatsUpdate = (newStats) => {
    setStats(prev => ({
      ...prev,
      ...newStats
    }));
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameCompleted(false);
    setStats({
      startTime: null,
      endTime: null,
      attempts: 0,
      matchedPairs: 0,
      totalPairs: difficulty === 'easy' ? 8 : difficulty === 'medium' ? 12 : 18
    });
    setGameKey(prevKey => prevKey + 1);
  };

  return (
    <div className="app">
      <h1>Memory Card Game</h1>
      <DiffSelector 
        currentDifficulty={difficulty}
        onChange={setDiffChange}
        disabled={gameStarted && !gameCompleted}
      />
      
      {!gameStarted ? (
        <button className="start-button" onClick={startGame}>
          Start Game
        </button>
      ) : (
        <div className="game-container">
          <GameStats 
            stats={stats} 
            gameCompleted={gameCompleted} 
            currentTime={!gameCompleted ? Date.now() : null}
          />
          
          <GameBoard
            key={gameKey}
            difficulty={difficulty}
            onGameComplete={endGame}
            onStatsUpdate={handleStatsUpdate}
            totalPairs={stats.totalPairs}
          />
          
          {gameCompleted && (
            <button className="play-again-button" onClick={resetGame}>
              Play Again
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;