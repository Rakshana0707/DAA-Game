import React from 'react';
import { DollarSign, Shield, Car, Zap, Calendar, MapPin } from 'lucide-react';

export default function StatusBar({ state }) {
  const getStatusColor = (value) => {
    if (value > 70) return '#4ade80'; // green
    if (value > 30) return '#fbbf24'; // yellow
    return '#f87171'; // red
  };

  const statStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: '#1e293b',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      backgroundColor: '#0f172a',
      color: 'white',
      borderBottom: '2px solid #334155',
      flexWrap: 'wrap',
      gap: '0.5rem'
    }}>
      <div style={statStyle}>
        <Calendar size={20} color="#60a5fa" />
        <span style={{ fontWeight: 'bold' }}>Day {state.day}</span>
      </div>
      
      <div style={statStyle}>
        <MapPin size={20} color="#a78bfa" />
        <span>Level {state.level}</span>
      </div>

      <div style={statStyle}>
        <DollarSign size={20} color="#4ade80" />
        <span style={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>${state.budget.toLocaleString()}</span>
      </div>

      <div style={statStyle}>
        <Shield size={20} color={getStatusColor(state.populationSafety)} />
        <span>Safety: {state.populationSafety}%</span>
      </div>

      <div style={statStyle}>
        <Car size={20} color={getStatusColor(state.trafficFlow)} />
        <span>Traffic: {state.trafficFlow}%</span>
      </div>

      <div style={statStyle}>
        <Zap size={20} color={getStatusColor(state.energyLevel)} />
        <span>Energy: {state.energyLevel}%</span>
      </div>
    </div>
  );
}
