import React, { useState, useEffect } from 'react';
import StatusBar from './StatusBar';
import CityMap from './CityMap';
import { initialGameState, getRandomEvent, applyEventResult } from '../engine/gameState';
import { LogOut, ArrowRight, AlertTriangle } from 'lucide-react';

export default function GameInterface({ onQuit }) {
  const [gameState, setGameState] = useState(initialGameState);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [logs, setLogs] = useState(['Game started. Level 1: "First Day in the City".']);

  const addLog = (msg) => {
    setLogs(prev => [...prev, msg].slice(-5)); // Keep last 5 logs
  };

  const handleNextDay = () => {
    const newEvent = getRandomEvent();
    if (newEvent) {
      addLog(`Day ${gameState.day} started. Monitoring city...`);
      setTimeout(() => {
        setCurrentEvent(newEvent);
        addLog(`Event: ${newEvent.title}`);
      }, 1500);
    } else {
      setGameState(prev => ({ ...prev, day: prev.day + 1 }));
      addLog(`Day ${gameState.day} started. All clear, no events.`);
    }
  };

  const handleOptionSelect = (option) => {
    if (gameState.budget < option.cost) {
      alert("Not enough budget!");
      return;
    }
    
    // Show confirmation on the button
    if (option.text === 'DISPATCH AMBULANCE') {
      setCurrentEvent(prev => ({
        ...prev,
        options: [{ ...option, text: 'Ambulance dispatch requested...' }]
      }));
      addLog('Ambulance dispatch requested.');
      
      setTimeout(() => {
        const newState = applyEventResult(gameState, option);
        setGameState(newState);
        addLog('Ambulance dispatched to Residential Area A.');
        setCurrentEvent(null);
      }, 1500);
    } else {
      const newState = applyEventResult(gameState, option);
      setGameState(newState);
      addLog(`Action taken: ${option.text}. Safety: ${option.effect.safety > 0 ? '+' : ''}${option.effect.safety}, Traffic: ${option.effect.traffic > 0 ? '+' : ''}${option.effect.traffic}`);
      setCurrentEvent(null);
    }
  };

  const handleNodeClick = (node) => {
    addLog(`Selected: ${node.name} (${node.type})`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#f8fafc' }}>
      <StatusBar state={gameState} />
      
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left Sidebar - Logs & Controls */}
        <div style={{ 
          width: '300px', 
          backgroundColor: 'white', 
          borderRight: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          padding: '1rem'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '0.5rem' }}>
            Operations Center
          </h2>
          
          <button 
            className={`btn ${currentEvent ? 'btn-disabled' : ''}`}
            style={{ width: '100%', marginBottom: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
            onClick={handleNextDay}
            disabled={currentEvent !== null}
          >
            Start Day {gameState.day} <ArrowRight size={18} />
          </button>

          <div style={{ flex: 1, overflowY: 'auto', backgroundColor: '#f1f5f9', borderRadius: '0.5rem', padding: '0.5rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#64748b', marginBottom: '0.5rem' }}>Activity Log</h3>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.875rem' }}>
              {logs.map((log, idx) => (
                <li key={idx} style={{ padding: '0.25rem 0', borderBottom: '1px solid #e2e8f0', color: '#334155' }}>
                  {log}
                </li>
              ))}
            </ul>
          </div>

          <button 
            className="btn"
            style={{ marginTop: '1rem', backgroundColor: '#ef4444', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
            onClick={onQuit}
          >
            <LogOut size={18} /> Exit to Menu
          </button>
        </div>

        {/* Main Content Area - Map & Events */}
        <div style={{ flex: 1, padding: '1rem', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          
          {/* Map Area */}
          <div style={{ flex: 1, minHeight: 0 }}>
            <CityMap cityState={gameState.cityState} onNodeClick={handleNodeClick} />
          </div>

          {/* Event Overlay */}
          {currentEvent && (
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 50
            }}>
              <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '1rem',
                maxWidth: '500px',
                width: '90%',
                boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', color: '#ef4444' }}>
                  <AlertTriangle size={32} />
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b' }}>{currentEvent.title}</h2>
                </div>
                <p style={{ marginBottom: '1.5rem', color: '#475569', fontSize: '1.1rem' }}>
                  {currentEvent.description}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {currentEvent.options.map((opt, idx) => (
                      <button
                        key={idx}
                        className="btn"
                        style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          backgroundColor: gameState.budget >= opt.cost && opt.text !== 'Ambulance dispatch requested...' ? '#3b82f6' : '#9ca3af',
                          textAlign: 'left'
                        }}
                        onClick={() => handleOptionSelect(opt)}
                        disabled={gameState.budget < opt.cost || opt.text === 'Ambulance dispatch requested...'}
                      >
                      <span>{opt.text}</span>
                      {opt.cost > 0 && <span style={{ fontFamily: 'monospace' }}>-${opt.cost}</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
