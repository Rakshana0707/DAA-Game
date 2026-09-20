import React, { useState, useEffect, useRef } from 'react';
import StatusBar from './StatusBar';
import CityMap from './CityMap';
import HelpGuideModal from './HelpGuideModal';
import { initialGameState, getRandomEvent, applyEventResult } from '../engine/gameState';
import { binarySearch } from '../engine/algorithms/binarySearch';
import { LogOut, ArrowRight, AlertTriangle, Activity, HelpCircle } from 'lucide-react';

export default function GameInterface({ onQuit, onLevelComplete }) {
  const [gameState, setGameState] = useState(initialGameState);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [levelComplete, setLevelComplete] = useState(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const isHelpOpenRef = useRef(isHelpOpen);
  useEffect(() => {
    isHelpOpenRef.current = isHelpOpen;
  }, [isHelpOpen]);
  const [logs, setLogs] = useState(['Game started. Level 1: "First Day in the City".']);
  const [recommendedVehicles, setRecommendedVehicles] = useState(null);

  // Run Resource Analysis on mount
  useEffect(() => {
    console.log("Running City Resource Analysis via Binary Search...");
    // The city has a response-time target.
    // Possible ambulance counts to evaluate:
    const possibleCounts = [1, 2, 3, 4, 5, 6, 7];
    
    // We map these counts to a strictly sorted set of strings so we can use our exact binary search.
    // 0_NOT_SATISFIED < 1_SATISFIED_MINIMUM < 2_SATISFIED_SURPLUS
    const evaluationArray = possibleCounts.map(count => {
      // Conceptual logic: target is satisfied at 3 ambulances
      if (count < 3) return "0_NOT_SATISFIED";
      if (count === 3) return "1_SATISFIED_MINIMUM";
      return "2_SATISFIED_SURPLUS";
    });
    
    // Use the exact Binary Search implementation to find the minimum valid value
    const foundIndex = binarySearch(evaluationArray, "1_SATISFIED_MINIMUM");
    
    if (foundIndex !== -1) {
      const minRequired = possibleCounts[foundIndex];
      console.log(`Binary Search found minimum required ambulances at index ${foundIndex}: ${minRequired}`);
      setRecommendedVehicles(minRequired);
    } else {
      console.log("Binary Search failed to find a valid minimum.");
    }
  }, []);

  // Movement loop
  useEffect(() => {
    const interval = setInterval(() => {
      if (isHelpOpenRef.current) return;
      setGameState(prev => {
        const hasMoving = prev.cityState.vehicles.some(v => v.status === 'Dispatched');
        if (!hasMoving) return prev;

        let justArrived = false;
        const newVehicles = prev.cityState.vehicles.map(v => {
          if (v.status === 'Dispatched' && v.path) {
            let p = v.progress + 0.05; // 1 second per edge (50ms * 20 = 1000ms)
            let idx = v.pathIndex;
            if (p >= 1) {
              p = 0;
              idx++;
            }
            if (idx >= v.path.length - 1) {
              justArrived = true;
              return { ...v, status: 'Arrived', currentLocation: v.destination, path: null };
            }
            return { ...v, progress: p, pathIndex: idx, currentLocation: null };
          }
          return v;
        });

        if (justArrived) {
          setTimeout(() => {
            setLogs(prevLogs => [...prevLogs, 'Ambulance arrived at the emergency.', 'Emergency resolved! City safety increased.'].slice(-5));
            setCurrentEvent(curr => {
              if (curr && curr.timeLeft > 0 && curr.missionStatus !== 'FAILED') {
                setGameState(gs => ({ ...gs, populationSafety: Math.min(100, gs.populationSafety + 10) }));
                if (onLevelComplete) {
                  onLevelComplete(1);
                }
                return { ...curr, missionStatus: 'SUCCESS' };
              }
              return curr;
            });
          }, 0);
        }

        return {
          ...prev,
          cityState: { ...prev.cityState, vehicles: newVehicles }
        };
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Timer loop
  useEffect(() => {
    if (!currentEvent || currentEvent.missionStatus === 'SUCCESS' || currentEvent.missionStatus === 'FAILED') return;

    const timer = setInterval(() => {
      if (isHelpOpenRef.current) return;
      setCurrentEvent(prev => {
        if (!prev) return prev;
        const newTime = prev.timeLeft - 1;
        if (newTime <= 0) {
          setTimeout(() => {
            setLogs(prevLogs => [...prevLogs, 'Mission FAILED: Timer ran out!', 'Emergency unresolved. City safety decreased.'].slice(-5));
            setGameState(gs => ({ ...gs, populationSafety: Math.max(0, gs.populationSafety - 20) }));
          }, 0);
          return { ...prev, timeLeft: 0, missionStatus: 'FAILED' };
        }
        return { ...prev, timeLeft: newTime };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentEvent?.missionStatus]);

  const addLog = (msg) => {
    setLogs(prev => [...prev, msg].slice(-5)); // Keep last 5 logs
  };

  const handleNextDay = () => {
    const newEvent = getRandomEvent();
    if (newEvent) {
      addLog(`Day ${gameState.day} started. Monitoring city...`);
      setTimeout(() => {
        setCurrentEvent({ ...newEvent, timeLeft: 60, missionStatus: 'ACTIVE' });
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
      <StatusBar state={gameState} onOpenHelp={() => setIsHelpOpen(true)} />
      
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
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.75rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '0.5rem' }}>
            Operations Center
          </h2>

          <button
            id="help-guide-btn"
            className="btn"
            style={{
              width: '100%',
              marginBottom: '0.75rem',
              backgroundColor: '#0284c7',
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: 'bold',
              padding: '0.65rem 1rem',
              fontSize: '0.9rem',
              boxShadow: '0 2px 4px rgba(2, 132, 199, 0.25)',
              borderRadius: '0.5rem',
              cursor: 'pointer'
            }}
            onClick={() => setIsHelpOpen(true)}
            title="Open Level 1 Help & Player Guide"
          >
            <HelpCircle size={18} />
            [? HELP / GUIDE]
          </button>
          
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

          {/* Resource Analysis Panel */}
          {recommendedVehicles !== null && (
            <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#3b82f6', marginBottom: '0.25rem' }}>
                <Activity size={16} />
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>City Resource Analysis</span>
              </div>
              <div style={{ fontSize: '0.875rem', color: '#475569' }}>
                Recommended emergency vehicles: <strong>{recommendedVehicles}</strong>
              </div>
            </div>
          )}

          <button 
            className="btn"
            style={{ marginTop: '1rem', backgroundColor: '#3b82f6', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
            onClick={() => {
              setGameState(initialGameState);
              setCurrentEvent(null);
              setLogs(['Game restarted. Level 1: "First Day in the City".']);
            }}
          >
            Restart Level
          </button>

          <button 
            className="btn"
            style={{ marginTop: '0.5rem', backgroundColor: '#ef4444', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
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

                {/* Timer Display */}
                <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#f1f5f9', borderRadius: '0.5rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: currentEvent.timeLeft <= 10 ? '#ef4444' : '#1e293b' }}>
                    Response Time Remaining: {currentEvent.timeLeft} seconds
                  </div>
                  {currentEvent.missionStatus === 'SUCCESS' && <div style={{ color: '#22c55e', fontWeight: 'bold', marginTop: '0.5rem', fontSize: '1.5rem' }}>SUCCESS</div>}
                  {currentEvent.missionStatus === 'FAILED' && <div style={{ color: '#ef4444', fontWeight: 'bold', marginTop: '0.5rem', fontSize: '1.5rem' }}>FAILED</div>}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {currentEvent.missionStatus !== 'SUCCESS' && currentEvent.missionStatus !== 'FAILED' && currentEvent.options.map((opt, idx) => (
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

                {(currentEvent.missionStatus === 'SUCCESS' || currentEvent.missionStatus === 'FAILED') && (
                  <button className="btn" onClick={() => {
                    if (currentEvent.missionStatus === 'SUCCESS') {
                      setLevelComplete({
                        citizensHelped: 1,
                        responseTime: 60 - currentEvent.timeLeft,
                        citySafety: gameState.populationSafety,
                        budgetRemaining: gameState.budget
                      });
                    }
                    setCurrentEvent(null);
                  }} style={{ width: '100%', marginTop: '1rem', backgroundColor: '#64748b' }}>
                    Close
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Level Complete Overlay */}
          {levelComplete && (
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 100
            }}>
              <div style={{
                backgroundColor: 'white',
                padding: '3rem',
                borderRadius: '1rem',
                maxWidth: '600px',
                width: '90%',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                textAlign: 'center'
              }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#10b981', marginBottom: '0.5rem' }}>LEVEL 1 COMPLETE</h1>
                <h2 style={{ fontSize: '1.25rem', color: '#64748b', marginBottom: '2rem' }}>First Day in the City</h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', textAlign: 'left', marginBottom: '2rem' }}>
                  <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '0.5rem' }}>
                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Citizens helped</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b' }}>{levelComplete.citizensHelped}</div>
                  </div>
                  <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '0.5rem' }}>
                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Response time</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b' }}>{levelComplete.responseTime} seconds</div>
                  </div>
                  <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '0.5rem' }}>
                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>City safety</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b' }}>{levelComplete.citySafety}%</div>
                  </div>
                  <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '0.5rem' }}>
                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Budget remaining</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b' }}>${levelComplete.budgetRemaining}</div>
                  </div>
                </div>

                <div style={{ backgroundColor: '#eff6ff', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '2rem', textAlign: 'left', border: '1px solid #bfdbfe' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1d4ed8', marginBottom: '0.5rem' }}>DAA ENGINE</h3>
                  <div style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1e3a8a' }}>Binary Search</div>
                  <div style={{ fontSize: '0.875rem', color: '#3b82f6' }}>Used for emergency vehicle resource estimation.</div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  <button className="btn" style={{ backgroundColor: '#3b82f6', flex: 1 }} onClick={() => {
                    setGameState(initialGameState);
                    setLevelComplete(null);
                    setLogs(['Game restarted. Level 1: "First Day in the City".']);
                  }}>
                    PLAY AGAIN
                  </button>
                  <button className="btn" style={{ backgroundColor: '#475569', flex: 1 }} onClick={onQuit}>
                    LEVEL SELECTION
                  </button>
                  <button className="btn" style={{ backgroundColor: '#9ca3af', flex: 1, cursor: 'not-allowed' }} disabled>
                    NEXT LEVEL
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reusable In-Game Help / Guide Modal */}
      <HelpGuideModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        level={gameState.level || 1}
      />
    </div>
  );
}
