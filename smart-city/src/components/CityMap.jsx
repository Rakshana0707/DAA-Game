import React from 'react';
import { Home, Hospital, Flame, Shield, School, Circle, Ambulance } from 'lucide-react';

export default function CityMap({ cityState, onNodeClick }) {
  // Simple layout scaling
  const mapWidth = 800;
  const mapHeight = 500;
  
  const getIcon = (type) => {
    switch (type) {
      case 'house': return <Home size={24} color="#3b82f6" />;
      case 'hospital': return <Hospital size={24} color="#ef4444" />;
      case 'firestation': return <Flame size={24} color="#f97316" />;
      case 'policestation': return <Shield size={24} color="#3b82f6" />;
      case 'school': return <School size={24} color="#eab308" />;
      case 'intersection': return <Circle size={16} color="#4b5563" />;
      default: return <Home size={24} />;
    }
  };

  const getLabel = (type) => {
    switch (type) {
      case 'house': return 'Resid.';
      case 'hospital': return 'Hosp.';
      case 'firestation': return 'Fire';
      case 'policestation': return 'Police';
      case 'school': return 'School';
      case 'intersection': return '';
      default: return '';
    }
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      backgroundColor: '#d1d5db',
      backgroundImage: 'radial-gradient(#9ca3af 1px, transparent 1px)',
      backgroundSize: '20px 20px',
      overflow: 'hidden',
      borderRadius: '0.5rem',
      boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)'
    }}>
      {/* Draw Edges (Roads) */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        {cityState.edges.map(edge => {
          const fromNode = cityState.nodes.find(n => n.id === edge.from);
          const toNode = cityState.nodes.find(n => n.id === edge.to);
          
          if (!fromNode || !toNode) return null;

          return (
            <line
              key={edge.id}
              x1={`${fromNode.x}%`}
              y1={`${fromNode.y}%`}
              x2={`${toNode.x}%`}
              y2={`${toNode.y}%`}
              stroke="#6b7280"
              strokeWidth="6"
              strokeLinecap="round"
            />
          );
        })}

        {/* Draw Active Routes for Dispatched Vehicles */}
        {cityState.vehicles.filter(v => v.path).map((vehicle, vIdx) => {
          return vehicle.path.map((nodeId, idx) => {
            if (idx >= vehicle.path.length - 1) return null;
            const fromNode = cityState.nodes.find(n => n.id === nodeId);
            const toNode = cityState.nodes.find(n => n.id === vehicle.path[idx + 1]);
            if (!fromNode || !toNode) return null;
            return (
              <line
                key={`route-${vIdx}-${idx}`}
                x1={`${fromNode.x}%`}
                y1={`${fromNode.y}%`}
                x2={`${toNode.x}%`}
                y2={`${toNode.y}%`}
                stroke="#3b82f6"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray="8, 8"
                opacity="0.7"
              />
            );
          });
        })}
      </svg>

      {/* Draw Moving Vehicles */}
      {cityState.vehicles.filter(v => v.status === 'Dispatched' && v.path).map(vehicle => {
        const fromNode = cityState.nodes.find(n => n.id === vehicle.path[vehicle.pathIndex]);
        const toNode = cityState.nodes.find(n => n.id === vehicle.path[vehicle.pathIndex + 1]);
        if (!fromNode || !toNode) return null;

        const currentX = fromNode.x + (toNode.x - fromNode.x) * vehicle.progress;
        const currentY = fromNode.y + (toNode.y - fromNode.y) * vehicle.progress;

        return (
          <div key={vehicle.id} style={{
            position: 'absolute',
            left: `${currentX}%`,
            top: `${currentY}%`,
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fef08a', // Highlight color
            padding: '4px', // Slightly larger
            borderRadius: '50%',
            boxShadow: '0 0 15px 5px rgba(234, 179, 8, 0.6)', // Glow effect
            border: vehicle.type === 'ambulance' ? '3px solid #ef4444' : '3px solid #3b82f6',
            zIndex: 30 // Ensure it's on top
          }}>
            {vehicle.type === 'ambulance' && <Ambulance size={24} color="#ef4444" />}
          </div>
        );
      })}

      {/* Draw Nodes (Buildings) */}
      {cityState.nodes.map(node => {
        // Check if this node is the destination of any dispatched vehicle
        const isDestination = cityState.vehicles.some(v => v.status === 'Dispatched' && v.destination === node.id);

        return (
          <div
            key={node.id}
            onClick={() => onNodeClick(node)}
            style={{
              position: 'absolute',
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            className="city-node"
          >
            <div style={{
              backgroundColor: isDestination ? '#fef08a' : 'white', // Highlight destination
              padding: '0.5rem',
              borderRadius: '50%',
              boxShadow: isDestination ? '0 0 20px 8px rgba(234, 179, 8, 0.5)' : '0 4px 6px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: node.type === 'intersection' ? 'none' : (isDestination ? '3px solid #eab308' : '2px solid #e5e7eb'),
              position: 'relative',
              zIndex: isDestination ? 15 : 10
            }}>
              {getIcon(node.type)}
              {cityState.vehicles.filter(v => v.currentLocation === node.id).map((vehicle, idx) => (
                <div key={vehicle.id} style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '-15px',
                  backgroundColor: 'white',
                  padding: '2px',
                  borderRadius: '50%',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  border: vehicle.type === 'ambulance' ? '1px solid #ef4444' : '1px solid #3b82f6',
                  transform: `translateX(${idx * 20}px)` // Offset slightly if multiple
                }}>
                  {vehicle.type === 'ambulance' && <Ambulance size={16} color="#ef4444" />}
                </div>
              ))}
            </div>
          {getLabel(node.type) && (
            <span style={{
              marginTop: '0.25rem',
              backgroundColor: 'rgba(255,255,255,0.9)',
              padding: '0.1rem 0.4rem',
              borderRadius: '0.25rem',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              color: '#374151'
            }}>
              {getLabel(node.type)}
            </span>
          )}
        </div>
      );
      })}
      
      {/* Add a little style tag for hover effects since we are not using full tailwind */}
      <style>{`
        .city-node:hover {
          transform: translate(-50%, -50%) scale(1.1) !important;
          z-index: 10;
        }
      `}</style>
    </div>
  );
}
