function GameStats({ stats, gameCompleted, currentTime }) {
  const getDuration = () => {
    if (!stats?.startTime) return '0 seconds';
    
    const endTime = gameCompleted ? stats.endTime : currentTime || Date.now();
    const durationMs = Math.max(0, endTime - stats.startTime);
    const seconds = Math.floor(durationMs / 1000);

    if (seconds < 60) {
      return `${seconds} second${seconds !== 1 ? 's' : ''}`;
    }
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ${remainingSeconds} second${remainingSeconds !== 1 ? 's' : ''}`;
  };

  const calcAccuracy = () => {
    if (!stats?.attempts || stats.attempts === 0) return '0%';
    const accuracy = (stats.matchedPairs / stats.attempts) * 100;
    return `${Math.round(accuracy)}%`;
  };

  return (
    <div className="game-stats">
      <h2>{gameCompleted ? 'Game Complete!' : 'Game Stats'}</h2>
      <p>Time: {getDuration()}</p>
      <p>Attempts: {stats?.attempts || 0}</p>
      <p>Matched: {stats?.matchedPairs || 0}/{stats?.totalPairs || 0} pairs</p>
      <p>Accuracy: {calcAccuracy()}</p>
    </div>
  );
}

export default GameStats;