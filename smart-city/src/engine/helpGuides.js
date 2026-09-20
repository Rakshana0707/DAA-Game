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
  }
};

/**
 * Helper to fetch a level guide by level number
 */
export function getLevelGuide(level = 1) {
  return LEVEL_GUIDES[level] || LEVEL_GUIDES[1];
}
