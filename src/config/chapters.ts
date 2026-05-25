export interface Chapter {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  narration: string[];
  interactiveType: 'explore' | 'time' | 'resonance' | 'constellation';
  interactiveLabel: string;
}

export const chapters: Chapter[] = [
  {
    id: 0,
    title: "Chaos & The Cosmos",
    subtitle: "Prologue: Two Infinite Lines",
    description: "In a universe of infinite possibilities, two paths wander in complete isolation, unaware of the subtle gravity drawing them close.",
    narration: [
      "In the beginning, there was only drift.",
      "Leo and Maya—two souls wandering different spirals of a vast cosmic sky.",
      "Each particle, a memory; each wave, a passing day in solitude.",
      "They were two parallel lines in an infinite canvas, moving forward, yet infinitely apart."
    ],
    interactiveType: 'explore',
    interactiveLabel: "Move your cursor to drift through their thoughts."
  },
  {
    id: 1,
    title: "The Echo of Presence",
    subtitle: "Chapter I: Shared Horizons",
    description: "They walked the same streets, breathed the same cold air, and heard the same ambient city hums. Yet, their paths never crossed.",
    narration: [
      "Days turned into orbits, pulling them to the same coordinates.",
      "They crossed the same bridges at dawn, read the same pages in separate cafes.",
      "A ripple in the crowd, a momentary glance at a reflection.",
      "They could feel the echoes of someone close. A gravity that could not yet be seen."
    ],
    interactiveType: 'explore',
    interactiveLabel: "Hover around to create ripples of anticipation."
  },
  {
    id: 2,
    title: "The Neon Convergence",
    subtitle: "Chapter II: The Rain & The Spark",
    description: "A sudden evening storm. A shared café awning. Under the glowing neon lights, time slows down. The universe holds its breath.",
    narration: [
      "It started with a single drop of rain.",
      "Beneath a glowing marquee, their paths finally intersected.",
      "Time, usually a rushing torrent, suddenly felt like glass.",
      "As their eyes met, the noise of the city dissolved into silence."
    ],
    interactiveType: 'time',
    interactiveLabel: "Hold the button below to slow down time."
  },
  {
    id: 3,
    title: "Resonance of the Soul",
    subtitle: "Chapter III: Harmonic Frequencies",
    description: "Words turned into frequencies. Frequencies turned into gravity. The distance between their separate worlds began to fade.",
    narration: [
      "They spoke in whispers that resonated across years of isolation.",
      "Their thoughts began to sync, pulsing to a shared heartbeat.",
      "The red and blue particles of their spirits started to swirl, blending into a deep, warm violet.",
      "They realized they were tuning to the exact same frequency."
    ],
    interactiveType: 'resonance',
    interactiveLabel: "Adjust the frequency slider to align their hearts."
  },
  {
    id: 4,
    title: "The Celestial Constellation",
    subtitle: "Epilogue: Bound in Stars",
    description: "No longer two separate paths, but a single constellation written in the sky. A narrative of timing, gravity, and eternal connection.",
    narration: [
      "They merged into a single light.",
      "No longer separate lines, they became a constellation that outlasts the night.",
      "A story written in the stars, connecting their past, present, and infinite future.",
      "Leave your mark on their skies, and become a part of their constellation."
    ],
    interactiveType: 'constellation',
    interactiveLabel: "Click the canvas to add stars, and sign the constellation."
  }
];
