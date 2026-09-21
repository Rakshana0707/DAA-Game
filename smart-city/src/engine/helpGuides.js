/**
 * Reusable In-Game Help & Guide Data
 * Extensible for all current and future levels.
 */

export const LEVEL_GUIDES = {
  1: {
    levelNumber: 1,
    title: 'Level 1 — First Day in the City',
    subtitle: 'Tutorial & First Emergency Response',
    sections: [
      {
        id: 'objective',
        number: 1,
        title: 'Section 1 — Objective',
        type: 'text',
        content:
          'You are responsible for responding to your first city emergency. Your goal is to dispatch the available ambulance and ensure that it reaches the emergency location before the response timer expires.'
      },
      {
        id: 'what-to-do',
        number: 2,
        title: 'Section 2 — What You Need To Do',
        type: 'steps',
        intro: 'Follow this basic operational sequence:',
        items: [
          'Watch for the emergency alert.',
          'Read the emergency location.',
          'Dispatch the ambulance.',
          'Follow the ambulance\'s progress.',
          'Complete the emergency before time runs out.'
        ]
      },
      {
        id: 'controls',
        number: 3,
        title: 'Section 3 — Controls',
        type: 'bullet-list',
        items: [
          'Click buildings or city locations to inspect them.',
          'Click DISPATCH AMBULANCE to respond.',
          'Use PLAY AGAIN if the level is failed.',
          'Use NEXT LEVEL after successful completion.'
        ]
      },
      {
        id: 'city-info',
        number: 4,
        title: 'Section 4 — City Information',
        type: 'stats',
        intro: 'Basic city statistics shown in the operations monitor:',
        items: [
          {
            name: 'Budget',
            desc: 'The city\'s operational funds allocated for deploying units, repairs, and daily services.'
          },
          {
            name: 'City Safety',
            desc: 'The safety rating of citizens. Successfully handling incidents maintains and increases safety; failed responses decrease it.'
          },
          {
            name: 'Response Time',
            desc: 'The active countdown timer (in seconds) to reach and resolve an emergency before conditions deteriorate.'
          },
          {
            name: 'Current Day',
            desc: 'Tracks the operational schedule as time and events advance in the city.'
          }
        ]
      },
      {
        id: 'how-to-succeed',
        number: 5,
        title: 'Section 5 — How To Succeed',
        type: 'bullet-list',
        items: [
          'Respond quickly to emergencies.',
          'Keep an eye on the response timer.',
          'Make sure the appropriate emergency vehicle is available.',
          'Avoid unnecessary delays.'
        ]
      },
      {
        id: 'daa-engine',
        number: 6,
        title: 'Section 6 — DAA Engine',
        badge: 'Behind the Scenes',
        type: 'daa',
        content:
          'DAA algorithms are used internally to help the city make decisions.\n\nBinary Search is used internally for city resource estimation. You do not need to solve the algorithm yourself.'
      },
      {
        id: 'failure',
        number: 7,
        title: 'Section 7 — Failure',
        type: 'alert',
        content:
          'If the emergency is not handled before the response limit, the level may be failed.'
      },
      {
        id: 'goal',
        number: 8,
        title: 'Section 8 — Goal',
        type: 'goal',
        content: 'Successfully resolve the emergency and keep the city safe.'
      }
    ]
  },
  2: {
    levelNumber: 2,
    title: 'Level 2 — Busy Morning',
    subtitle: 'Multi-Incident Response & Resource Coordination',
    sections: [
      {
        id: 'situation',
        number: 1,
        title: 'Section 1 — Situation',
        type: 'text',
        content: 'The city is entering a busy morning. Several incidents may occur while emergency resources are limited.'
      },
      {
        id: 'objective',
        number: 2,
        title: 'Section 2 — Objective',
        type: 'text',
        content: 'Manage the morning\'s emergencies while keeping the city safe and using emergency resources effectively.'
      },
      {
        id: 'what-is-new',
        number: 3,
        title: 'Section 3 — What Is New?',
        type: 'bullet-list',
        intro: 'Compared with Level 1:',
        items: [
          'More than one incident can occur.',
          'Different incidents have different severity levels.',
          'Different incidents have different urgency levels.',
          'Emergency vehicles are limited.',
          'The player must monitor several situations.',
          'Decisions made for one incident can affect the rest of the city.'
        ]
      },
      {
        id: 'incident-types',
        number: 4,
        title: 'Section 4 — Incident Types',
        type: 'incidents',
        items: [
          { icon: '🚑', name: 'Medical Emergency', requirement: 'Requires an ambulance.' },
          { icon: '🔥', name: 'Fire', requirement: 'Requires a fire truck.' },
          { icon: '🚗', name: 'Road Accident', requirement: 'Requires an ambulance.' }
        ]
      },
      {
        id: 'important-info',
        number: 5,
        title: 'Section 5 — Important Information',
        type: 'stats',
        items: [
          { name: 'Severity', desc: 'How serious the incident is.' },
          { name: 'Urgency', desc: 'How quickly the incident needs attention.' },
          { name: 'City Safety', desc: 'The overall safety condition of the city.' },
          { name: 'Vehicle Status', desc: 'Whether an emergency vehicle is available or busy.' }
        ]
      },
      {
        id: 'what-player-does',
        number: 6,
        title: 'Section 6 — What The Player Does',
        type: 'steps',
        items: [
          'Monitor incoming incidents.',
          'Inspect their severity and urgency.',
          'Check available emergency vehicles.',
          'Decide which response should happen.',
          'Dispatch the appropriate vehicle.',
          'Monitor the response.',
          'React when new incidents appear.',
          'Keep City Safety above the required level.'
        ]
      },
      {
        id: 'daa-engine',
        number: 7,
        title: 'Section 7 — DAA Engine',
        badge: 'Behind the Scenes',
        type: 'daa',
        content: 'DAA algorithms operate behind the scenes to help the city analyze and organize emergency responses.\n\nMaximum and Minimum helps identify the most and least severe active incidents.\n\nMerge Sort helps organize the emergency response queue.\n\nYou do not manually solve these algorithms. Your decisions happen through the city-management interface.'
      },
      {
        id: 'tips',
        number: 8,
        title: 'Section 8 — Tips',
        type: 'bullet-list',
        items: [
          'Keep an eye on all active incidents.',
          'Pay attention to severity and urgency.',
          'Check vehicle availability before dispatching.',
          'Avoid leaving serious incidents unattended.',
          'Think ahead when resources are limited.',
          'Monitor City Safety.'
        ]
      },
      {
        id: 'failure',
        number: 9,
        title: 'Section 9 — Failure',
        type: 'alert',
        content: 'The level can fail if City Safety falls too low or too many incidents remain unresolved.'
      },
      {
        id: 'goal',
        number: 10,
        title: 'Section 10 — Goal',
        type: 'goal',
        content: 'Successfully manage the busy morning and keep the city safe.'
      }
    ]
  }
};

/**
 * Helper to fetch a level guide by level number
 */
export function getLevelGuide(level = 1) {
  return LEVEL_GUIDES[level] || LEVEL_GUIDES[1];
}
