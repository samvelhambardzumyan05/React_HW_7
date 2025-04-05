import { useState, useEffect } from 'react';
import Card from './Card';

function GameBoard({ difficulty, onGameComplete, onStatsUpdate, totalPairs }) {
  const [cards, setCards] = useState([]);
  const [flippedC, setflippedC] = useState([]);
  const [matchedC, setmatchedC] = useState([]);
  const [processing, setprocessing] = useState(false);
  const [attempts, setattempts] = useState(0);
  const [matches, setmatches] = useState(0);

  const boardSize = () => {
    switch (difficulty) {
      case 'easy': return 4;
      case 'hard': return 6;
      default: return 5;
    }
  };

  const generatecardSet = (count) => {
    const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🐬', '🐞', '🐜',
                    '🐵', '🐤', '🐌', '🫎', '🐙', '🦀', '🦈', '🐊', '🐍', '🐢', '🦣', '🐄', '🐖', '🐏', '🐳', 
                    '🕷', '🦇', '🦉', '🦚'];
    const mix = [...emojis].sort(() => Math.random() - 0.5);
    return mix.slice(0, count);
  };

  const initializeGame = () => {
    const cardSet = generatecardSet(totalPairs);
    const cardPairs = [...cardSet, ...cardSet];
    
    const mixCards = cardPairs
      .map((content, index) => ({
        id: index,
        content,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5);

    setCards(mixCards);
    setflippedC([]);
    setmatchedC([]);
    setattempts(0);
    setmatches(0);
    onStatsUpdate({
      attempts: 0,
      matchedPairs: 0
    });
  };

  useEffect(() => {
    if (totalPairs > 0) {
      initializeGame();
    }
  }, [difficulty, totalPairs]);

  useEffect(() => {
    if (cards.length > 0 && matchedC.length === totalPairs * 2) {
      onGameComplete({
        attempts: attempts,
        matchedPairs: matches
      });
    }
  }, [matchedC]);

  const handleCardClick = (id) => {
    if (processing || flippedC.length >= 2) return;

    const clickedCard = cards.find(card => card.id === id);
    if (clickedCard.isFlipped || clickedCard.isMatched) return;


    const newCards = cards.map(card => 
      card.id === id ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);
    
    const newflippedC = [...flippedC, id];
    setflippedC(newflippedC);


    if (newflippedC.length === 2) {
      setprocessing(true);
      const [firstId, secondId] = newflippedC;
      const firstCard = newCards.find(card => card.id === firstId);
      const secondCard = newCards.find(card => card.id === secondId);


      const newAttempts = attempts + 1;
      setattempts(newAttempts);
      
      if (firstCard.content === secondCard.content) {

        const newMatches = matches + 1;
        setmatches(newMatches);
        setmatchedC(prev => [...prev, firstId, secondId]);
        

        onStatsUpdate({
          attempts: newAttempts,
          matchedPairs: newMatches
        });
        
        setflippedC([]);
        setprocessing(false);
      } else {

        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              card.id === firstId || card.id === secondId
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setflippedC([]);
          setprocessing(false);
          

          onStatsUpdate({
            attempts: newAttempts,
            matchedPairs: matches
          });
        }, 1000);
      }
    }
  };

  const gridSize = boardSize();
  const gridStyle = {
    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
    gridTemplateRows: `repeat(${gridSize}, 1fr)`,
  };

  return (
    <div className="game-board" style={gridStyle}>
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          content={card.content}
          isFlipped={card.isFlipped || matchedC.includes(card.id)}
          isMatched={matchedC.includes(card.id)}
          onClick={handleCardClick}
        />
      ))}
    </div>
  );
}

export default GameBoard;