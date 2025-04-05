import { useState, useEffect } from 'react';

function Card({ id, content, isFlipped, isMatched, onClick }) {
  const [localFlipped, setLocalFlipped] = useState(isFlipped);


  useEffect(() => {
    if (isFlipped !== localFlipped) {
      setLocalFlipped(isFlipped);
    }
  }, [isFlipped, localFlipped]);

  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      onClick(id);
    }
  };

  return (
    <div
      className={`card ${localFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
      onClick={handleClick}
    >
      <div className="card-inner">
        <div className="card-front"></div>
        <div className="card-back">{content}</div>
      </div>
    </div>
  );
}

export default Card;