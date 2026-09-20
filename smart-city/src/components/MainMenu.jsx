import React from 'react';
import { Play } from 'lucide-react';

export default function MainMenu({ onStartGame, unlockedLevels = [1] }) {
  const levels = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)',
      color: 'white',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
        SMART CITY: <br/><span style={{ color: '#60a5fa' }}>THE DAA CHALLENGE</span>
      </h1>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button 
          id="start-game-btn"
          className="btn" 
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', fontSize: '1.25rem', backgroundColor: '#2563eb' }}
          onClick={() => onStartGame(1)}
        >
          <Play size={24} /> Start Game
        </button>
      </div>

      <div style={{ 
        background: 'rgba(255,255,255,0.1)', 
        padding: '2rem', 
        borderRadius: '1rem',
        backdropFilter: 'blur(10px)',
        width: '100%',
        maxWidth: '650px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>LEVELS</h2>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem' }}>
          {levels.map((level) => {
            const isUnlocked = unlockedLevels.includes(level);
            return (
              <button
                key={level}
                id={`level-btn-${level}`}
                onClick={isUnlocked ? () => onStartGame(level) : undefined}
                className={isUnlocked ? 'btn' : 'btn btn-disabled'}
                style={{
                  padding: '0.75rem 1.25rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  backgroundColor: isUnlocked ? '#3b82f6' : '#334155',
                  color: isUnlocked ? 'white' : '#9ca3af',
                  cursor: isUnlocked ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '150px',
                  minHeight: '75px',
                  opacity: isUnlocked ? 1 : 0.7,
                  transition: 'all 0.2s ease',
                  textAlign: 'center',
                  gap: '0.2rem'
                }}
                disabled={!isUnlocked}
              >
                {level === 2 ? (
                  isUnlocked ? (
                    <>
                      <span style={{ fontWeight: 'bold' }}>Level 2</span>
                      <span style={{ fontSize: '0.85rem', fontStyle: 'italic', color: '#bfdbfe' }}>"Busy Morning"</span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#86efac', letterSpacing: '0.05em' }}>UNLOCKED</span>
                    </>
                  ) : (
                    <>
                      <span style={{ fontWeight: 'bold' }}>Level 2</span>
                      <span style={{ fontSize: '0.75rem' }}>(Locked)</span>
                    </>
                  )
                ) : level === 1 ? (
                  <>
                    <span style={{ fontWeight: 'bold' }}>Level 1</span>
                    <span style={{ fontSize: '0.85rem', fontStyle: 'italic', color: '#bfdbfe' }}>"First Day in the City"</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#86efac', letterSpacing: '0.05em' }}>UNLOCKED</span>
                  </>
                ) : (
                  <>
                    <span style={{ fontWeight: 'bold' }}>Level {level}</span>
                    <span style={{ fontSize: '0.75rem' }}>{isUnlocked ? 'UNLOCKED' : '(Locked)'}</span>
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
