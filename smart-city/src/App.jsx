import React, { useState } from 'react';
import MainMenu from './components/MainMenu';
import GameInterface from './components/GameInterface';

function App() {
  const [currentScreen, setCurrentScreen] = useState('menu'); // 'menu' | 'playing'
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [unlockedLevels, setUnlockedLevels] = useState([1]); // In-memory session progression

  const handleStartGame = (level = 1) => {
    if (level === 1) {
      setSelectedLevel(1);
      setCurrentScreen('playing');
    } else if (level === 2 && unlockedLevels.includes(2)) {
      alert("Level 2 ('Busy Morning') is unlocked! Gameplay is coming soon.");
    }
  };

  const handleLevelComplete = (completedLevelId) => {
    const nextLevel = completedLevelId + 1;
    setUnlockedLevels((prev) => {
      if (!prev.includes(nextLevel)) {
        return [...prev, nextLevel];
      }
      return prev;
    });
  };

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {currentScreen === 'menu' && (
        <MainMenu
          onStartGame={handleStartGame}
          unlockedLevels={unlockedLevels}
        />
      )}
      {currentScreen === 'playing' && (
        <GameInterface
          level={selectedLevel}
          onQuit={() => setCurrentScreen('menu')}
          onLevelComplete={handleLevelComplete}
        />
      )}
    </div>
  );
}

export default App;
