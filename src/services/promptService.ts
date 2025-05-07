
// List of reflection prompts
const prompts = [
  "What made you smile today?",
  "What are you grateful for right now?",
  "What challenged you today and what did you learn?",
  "What's something small that brought you joy?",
  "Describe a moment of calm you experienced today.",
  "What's something kind you did for yourself or someone else?",
  "Share a tiny victory from your day, no matter how small.",
  "What's something you're looking forward to?",
  "What's a quality in yourself that you appreciate?",
  "Reflect on something beautiful you noticed today.",
  "What's a small step you took toward a goal?",
  "What's something that made you feel peaceful?",
  "What did you learn about yourself recently?",
  "Describe a moment when you felt fully present today.",
  "What's something that inspired you lately?",
  "What challenged you recently and how did you respond?",
  "What's something you'd like to let go of?",
  "What's giving you hope right now?",
  "What's a boundary you're proud of setting?",
  "What's something you're curious about these days?",
  "Describe a meaningful connection you had recently.",
  "What wisdom would you share with yourself from a year ago?",
  "What's a simple pleasure you enjoyed today?",
  "What are you nurturing in your life right now?",
];

// Function to get a prompt for today
export const getPromptForToday = (): string => {
  // Get today's date and use it to select a prompt deterministically
  const today = new Date();
  const dayOfYear = getDayOfYear(today);
  
  // Use the day of year as an index (wrapping around if needed)
  const promptIndex = dayOfYear % prompts.length;
  return prompts[promptIndex];
};

// Helper function to get the day of the year (1-366)
const getDayOfYear = (date: Date): number => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

// Function to get a random prompt (for testing)
export const getRandomPrompt = (): string => {
  const randomIndex = Math.floor(Math.random() * prompts.length);
  return prompts[randomIndex];
};
