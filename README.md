code example below to get the boxes iterated.

```javascript
import React, { useState } from 'react';
import './game.css'; // Ensure this CSS file is linked

const Game = () => {
  const [tickBox, setTickBox] = useState(null);

  const handleBoxClick = (boxId) => {
    setTickBox(boxId);
  };

  return (
    <div className="game-container">
      <div className="game-boxes-outline">
        {[...Array(9)].map((_, index) => {
          const boxId = index + 1;
          return (
            <div
              key={boxId}
              className={`game-box ${tickBox === boxId ? 'tick' : ''}`}
              id={`box${boxId}`}
              onClick={() => handleBoxClick(boxId)}
            >
              {tickBox === boxId ? '✓' : ''}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Game;
```
