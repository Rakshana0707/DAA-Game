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
    // Basic graph structure for the city map
    nodes: [
      { id: 'h1', type: 'house', x: 20, y: 20, name: 'Residential Zone A' },
      { id: 'h2', type: 'house', x: 80, y: 20, name: 'Residential Zone B' },
      { id: 'hosp1', type: 'hospital', x: 20, y: 80, name: 'City Hospital' },
      { id: 'fire1', type: 'firestation', x: 80, y: 80, name: 'Fire Department' },
      { id: 'pol1', type: 'policestation', x: 50, y: 50, name: 'Central Police' },
      { id: 'sch1', type: 'school', x: 50, y: 20, name: 'High School' }
    ],
    edges: [
      { id: 'e1', from: 'h1', to: 'sch1', distance: 30, traffic: 0 },
      { id: 'e2', from: 'sch1', to: 'h2', distance: 30, traffic: 0 },
      { id: 'e3', from: 'h1', to: 'pol1', distance: 40, traffic: 0 },
      { id: 'e4', from: 'h2', to: 'pol1', distance: 40, traffic: 0 },
      { id: 'e5', from: 'pol1', to: 'hosp1', distance: 40, traffic: 0 },
      { id: 'e6', from: 'pol1', to: 'fire1', distance: 40, traffic: 0 },
      { id: 'e7', from: 'hosp1', to: 'fire1', distance: 60, traffic: 0 }
    ],
    vehicles: [] // e.g. { id: 'v1', type: 'ambulance', position: { edgeId: 'e5', progress: 0.5 } }
  }
};

// Possible random events for the game loop
const possibleEvents = [
  {
    id: 'ev_fire_1',
    title: 'Small Fire in Residential Zone A',
    description: 'A fire broke out! Dispatch a fire truck quickly.',
    options: [
      { text: 'Dispatch Fire Truck ($500)', cost: 500, effect: { safety: 5, traffic: -10 } },
      { text: 'Ignore', cost: 0, effect: { safety: -20, traffic: 0 } }
    ]
  },
  {
    id: 'ev_traffic_1',
    title: 'Traffic Jam near High School',
    description: 'School rush hour is causing major delays.',
    options: [
      { text: 'Deploy Traffic Police ($300)', cost: 300, effect: { safety: 0, traffic: 20 } },
      { text: 'Let it resolve naturally', cost: 0, effect: { safety: -5, traffic: -20 } }
    ]
  },
  {
    id: 'ev_medical_1',
    title: 'Medical Emergency',
    description: 'Citizen requires immediate medical transport.',
    options: [
      { text: 'Dispatch Ambulance ($400)', cost: 400, effect: { safety: 10, traffic: -5 } },
      { text: 'No ambulances available', cost: 0, effect: { safety: -15, traffic: 0 } }
    ]
  }
];

export function getRandomEvent() {
  const index = Math.floor(Math.random() * possibleEvents.length);
  return possibleEvents[index];
}

export function applyEventResult(state, option) {
  return {
    ...state,
    budget: state.budget - option.cost,
    populationSafety: Math.max(0, Math.min(100, state.populationSafety + option.effect.safety)),
    trafficFlow: Math.max(0, Math.min(100, state.trafficFlow + option.effect.traffic)),
    day: state.day + 1
  };
}
