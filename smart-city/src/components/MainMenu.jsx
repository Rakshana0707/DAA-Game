import React from 'react';
import { Play, Settings, Info } from 'lucide-react';

export default function MainMenu({ onStartGame }) {
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
          className="btn" 
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', fontSize: '1.25rem', backgroundColor: '#2563eb' }}
          onClick={onStartGame}
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
        maxWidth: '600px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>LEVELS</h2>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem' }}>
          {levels.map((level) => {
            const isUnlocked = level === 1;
            return (
              <button
                key={level}
                onClick={isUnlocked ? onStartGame : undefined}
                className={isUnlocked ? 'btn' : 'btn btn-disabled'}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  backgroundColor: isUnlocked ? '#3b82f6' : '#334155',
                  color: isUnlocked ? 'white' : '#9ca3af',
                  cursor: isUnlocked ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '140px',
                  opacity: isUnlocked ? 1 : 0.7
                }}
                disabled={!isUnlocked}
              >
                Level {level} {isUnlocked ? '(Unlocked)' : '(Locked)'}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
