// Game State and Engine for Smart City: The DAA Challenge
// This is designed to be modular. Future algorithms (e.g. Dijkstra for routing, 
// Knapsack for budget optimization) can be plugged in here to affect the state.

export const LEVELS = [
  { id: 1, name: "First Day in the City" },
  { id: 2, name: "Busy Morning" },
  { id: 3, name: "Rush Hour" },
  { id: 4, name: "Power Grid Crisis" },
  { id: 5, name: "Storm Warning" },
  { id: 6, name: "Downtown Gridlock" },
  { id: 7, name: "Hospital Surge" },
  { id: 8, name: "Bridge Bottleneck" },
  { id: 9, name: "Subway Outage" },
  { id: 10, name: "Smart Metro Master" }
];

export const level1CityState = {
  // Level 1: "First Day in the City" - Tutorial Map
  nodes: [
    { id: 'hosp', type: 'hospital', x: 20, y: 50, name: 'City Hospital' },
    { id: 'resA', type: 'house', x: 50, y: 20, name: 'Residential Area A' },
    { id: 'fire', type: 'firestation', x: 50, y: 80, name: 'Fire Station' },
    { id: 'int1', type: 'intersection', x: 50, y: 50, name: 'Main Intersection' },
    { id: 'int2', type: 'intersection', x: 80, y: 50, name: 'East Intersection' },
    { id: 'police', type: 'policestation', x: 80, y: 20, name: 'Police Station' }
  ],
  edges: [
    { id: 'e1', from: 'hosp', to: 'int1', distance: 30, traffic: 0, name: 'West Road' },
    { id: 'e2', from: 'resA', to: 'int1', distance: 30, traffic: 0, name: 'North Road' },
    { id: 'e3', from: 'fire', to: 'int1', distance: 30, traffic: 0, name: 'South Road' },
    { id: 'e4', from: 'int1', to: 'int2', distance: 30, traffic: 0, name: 'Main Street' },
    { id: 'e5', from: 'int2', to: 'police', distance: 30, traffic: 0, name: 'East Road' }
  ],
  vehicles: [
    {
      id: 'amb1',
      type: 'ambulance',
      currentLocation: 'hosp', // Currently stationary at a node
      status: 'Idle',
      destination: null,
      isAvailable: true
    },
    {
      id: 'amb2',
      type: 'ambulance',
      currentLocation: 'hosp',
      status: 'Idle',
      destination: null,
      isAvailable: true
    }
  ]
};

export const level2CityState = {
  // Level 2: "Busy Morning"
  nodes: [
    { id: 'hosp', type: 'hospital', x: 20, y: 50, name: 'City Hospital' },
    { id: 'resA', type: 'house', x: 50, y: 20, name: 'Residential Area A' },
    { id: 'fire', type: 'firestation', x: 50, y: 80, name: 'Fire Station' },
    { id: 'int1', type: 'intersection', x: 50, y: 50, name: 'Main Intersection' },
    { id: 'comm', type: 'house', x: 80, y: 80, name: 'Commercial Area' },
    { id: 'mainRd', type: 'intersection', x: 80, y: 50, name: 'Main Road' }
  ],
  edges: [
    { id: 'e1', from: 'hosp', to: 'int1', distance: 30, traffic: 0, name: 'West Road' },
    { id: 'e2', from: 'resA', to: 'int1', distance: 30, traffic: 0, name: 'North Road' },
    { id: 'e3', from: 'fire', to: 'int1', distance: 30, traffic: 0, name: 'South Road' },
    { id: 'e4', from: 'int1', to: 'mainRd', distance: 30, traffic: 0, name: 'Main Street' },
    { id: 'e5', from: 'mainRd', to: 'comm', distance: 30, traffic: 0, name: 'Commercial Road' }
  ],
  vehicles: [
    {
      id: 'amb1',
      type: 'ambulance',
      currentLocation: 'hosp',
      status: 'Idle',
      destination: null,
      isAvailable: true
    }
  ]
};

export function getInitialGameState(level) {
  return {
    day: 1,
    level: level,
    unlockedLevels: [1, 2],
    budget: 10000,
    populationSafety: 100, // 0 to 100
    trafficFlow: 100, // 0 to 100
    energyLevel: 100, // 0 to 100
    events: level === 2 ? level2Events : level1Events,
    cityState: level === 2 ? level2CityState : level1CityState
  };
}

// Keep this for backwards compatibility if needed, but prefer getInitialGameState
export const initialGameState = getInitialGameState(1);

export const level1Events = [
  {
    id: 'lvl1_med_1',
    title: '🚨 MEDICAL EMERGENCY',
    description: 'Residential Area A\n\nSeverity: HIGH\nResponse Target: 60 seconds\n\nAVAILABLE AMBULANCES\n\n🚑 Ambulance 1\nStatus: Available\n\n🚑 Ambulance 2\nStatus: Available',
    options: [
      { 
        text: 'DISPATCH AMBULANCE 1', 
        cost: 0, 
        effect: { safety: 0, traffic: 0 },
        action: { type: 'dispatch_ambulance', vehicleId: 'amb1', destination: 'resA' }
      },
      { 
        text: 'DISPATCH AMBULANCE 2', 
        cost: 0, 
        effect: { safety: 0, traffic: 0 },
        action: { type: 'dispatch_ambulance', vehicleId: 'amb2', destination: 'resA' }
      }
    ]
  }
];

export const level2Events = [
  {
    id: 'lvl2_med_1',
    type: 'medical',
    severity: 'medium',
    location: 'resA',
    title: '🚑 MEDICAL EMERGENCY',
    description: 'Medical emergency reported in Residential Area A. Severity: Medium.',
    options: [{ text: 'ACKNOWLEDGE', cost: 0, effect: { safety: 0, traffic: 0 }, action: { type: 'none' } }]
  },
  {
    id: 'lvl2_fire_1',
    type: 'fire',
    severity: 'medium',
    location: 'comm',
    title: '🔥 SMALL FIRE',
    description: 'Small fire reported in the Commercial Area. Severity: Medium.',
    options: [{ text: 'ACKNOWLEDGE', cost: 0, effect: { safety: 0, traffic: 0 }, action: { type: 'none' } }]
  },
  {
    id: 'lvl2_acc_1',
    type: 'accident',
    severity: 'low',
    location: 'mainRd',
    title: '🚗 ROAD ACCIDENT',
    description: 'Road accident on Main Road. Severity: Low.',
    options: [{ text: 'ACKNOWLEDGE', cost: 0, effect: { safety: 0, traffic: 0 }, action: { type: 'none' } }]
  }
];


export function applyEventResult(state, option) {
  let newCityState = { ...state.cityState };

  if (option.action && option.action.type === 'dispatch_ambulance') {
    newCityState = {
      ...newCityState,
      vehicles: newCityState.vehicles.map(v => 
        v.id === option.action.vehicleId 
          ? { 
              ...v, 
              status: 'Dispatched', 
              isAvailable: false, 
              destination: option.action.destination,
              path: ['hosp', 'int1', 'resA'],
              pathIndex: 0,
              progress: 0
            }
          : v
      )
    };
  }

  return {
    ...state,
    budget: state.budget - option.cost,
    populationSafety: Math.max(0, Math.min(100, state.populationSafety + option.effect.safety)),
    trafficFlow: Math.max(0, Math.min(100, state.trafficFlow + option.effect.traffic)),
    day: state.day + 1,
    cityState: newCityState
  };
}
