import React from 'react';
import { Play, Settings, Info } from 'lucide-react';

export default function MainMenu({ onStartGame }) {
  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)',
      color: 'white'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
        SMART CITY: <br/><span style={{ color: '#60a5fa' }}>THE DAA CHALLENGE</span>
      </h1>
      
      <div style={{ 
        background: 'rgba(255,255,255,0.1)', 
        padding: '2rem', 
        borderRadius: '1rem',
        backdropFilter: 'blur(10px)',
        maxWidth: '500px',
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Welcome, Operations Manager</h2>
        <p style={{ marginBottom: '1.5rem', color: '#cbd5e1' }}>
          Keep the city functioning successfully. Balance the budget, ensure population safety, and maintain traffic flow. Advanced routing and resource algorithms run behind the scenes to power the city!
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.5rem 1rem', background: '#334155', borderRadius: '0.5rem' }}>
            <strong>Level 1</strong> (Unlocked)
          </div>
          <div style={{ padding: '0.5rem 1rem', background: '#334155', borderRadius: '0.5rem', opacity: 0.5 }}>
            Level 2 (Locked)
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button 
          className="btn" 
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', fontSize: '1.25rem', backgroundColor: '#2563eb' }}
          onClick={onStartGame}
        >
          <Play size={24} /> Start Game
        </button>
      </div>
    </div>
  );
}
