// Game State and Engine for Smart City: The DAA Challenge
// This is designed to be modular. Future algorithms (e.g. Dijkstra for routing, 
// Knapsack for budget optimization) can be plugged in here to affect the state.

export const initialGameState = {
  day: 1,
  level: 1,
  budget: 10000,
  populationSafety: 100, // 0 to 100
  trafficFlow: 100, // 0 to 100
  energyLevel: 100, // 0 to 100
  events: [],
  cityState: {
    // Level 1: "First Day in the City" - Tutorial Map
    nodes: [
      { id: 'hosp', type: 'hospital', x: 20, y: 50, name: 'City Hospital' },
      { id: 'resA', type: 'house', x: 50, y: 20, name: 'Residential Area A' },
      { id: 'fire', type: 'firestation', x: 50, y: 80, name: 'Fire Station' },
      { id: 'int1', type: 'intersection', x: 50, y: 50, name: 'Main Intersection' },
      { id: 'int2', type: 'intersection', x: 80, y: 50, name: 'East Intersection' },
      { id: 'police', type: 'policestation', x: 80, y: 20, name: 'Police Station' }
    ],
    // 3-4 main roads, 2 intersections. 
    // Here we use edges to connect them to form the roads.
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
      }
    ]
  }
};

const possibleEvents = [
  {
    id: 'lvl1_med_1',
    title: '🚨 MEDICAL EMERGENCY',
    description: 'Medical emergency reported in Residential Area A.',
    options: [
      { 
        text: 'DISPATCH AMBULANCE', 
        cost: 0, 
        effect: { safety: 0, traffic: 0 },
        action: { type: 'dispatch_ambulance', vehicleId: 'amb1', destination: 'resA' }
      }
    ]
  }
];

export function getRandomEvent() {
  const index = Math.floor(Math.random() * possibleEvents.length);
  return possibleEvents[index];
}

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
