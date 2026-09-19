import React, { useState } from 'react';
import MainMenu from './components/MainMenu';
import GameInterface from './components/GameInterface';

function App() {
  const [gameState, setGameState] = useState('menu'); // 'menu' | 'playing'

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {gameState === 'menu' && (
        <MainMenu onStartGame={() => setGameState('playing')} />
      )}
      {gameState === 'playing' && (
        <GameInterface onQuit={() => setGameState('menu')} />
      )}
    </div>
  );
}

export default App;
