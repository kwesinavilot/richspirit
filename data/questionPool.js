import questionsData from './questions.json';
import archetypesData from './archetypes.json';

// Import the data
const { dimensions, questions } = questionsData;
const { archetypes } = archetypesData;

// Add emojis and messages to archetypes
const spiritAnimals = archetypes.map(archetype => {
  const emojiMap = {
    'Lion': '🦁',
    'Owl': '🦉', 
    'Squirrel': '🐿️',
    'Fox': '🦊',
    'Peacock': '🦚',
    'Elephant': '🐘',
    'Bear': '🐻',
    'Eagle': '🦅',
    'Antelope': '🦌'
  };

  const messageMap = {
    'Lion': "You're a natural leader who takes bold risks for big rewards. Your confidence and ambition drive you to pursue wealth aggressively. Your path to $1M lies in high-stakes ventures and leadership roles.",
    'Owl': "Your wisdom lies in careful analysis and long-term planning. You build wealth through patience, knowledge, and strategic thinking. Your $1M path is steady, secure, and sustainable.",
    'Squirrel': "You excel at consistent saving and delayed gratification. Your frugal nature and cautious approach build wealth slowly but surely. Your $1M comes through disciplined habits and compound growth.",
    'Fox': "You're adaptable and opportunistic, spotting chances others miss. Your strategic agility helps you navigate changing markets. Your $1M path involves clever pivots and calculated moves.",
    'Peacock': "You value aesthetics, status, and social connections. Your wealth-building involves lifestyle and image-conscious decisions. Your $1M path leverages your social influence and brand.",
    'Elephant': "You focus on legacy and long-term impact. Your steady, disciplined approach values generosity alongside wealth. Your $1M path involves building something lasting for future generations.",
    'Bear': "You're grounded and protective, building wealth for security. Your reliable nature creates steady progress. Your $1M path involves consistent, protective strategies that safeguard your family.",
    'Eagle': "You're a visionary who sees the big picture and strategic opportunities. Your bold leadership and future focus drive ambitious goals. Your $1M path soars through high-level strategic moves.",
    'Antelope': "You're agile and perceptive, quickly adapting to opportunities. Your graceful approach balances multiple strategies. Your $1M path involves nimble moves and staying alert to market changes."
  };

  return {
    name: `The ${archetype.name}`,
    emoji: emojiMap[archetype.name],
    description: archetype.traits,
    message: messageMap[archetype.name],
    profile: archetype.profile
  };
});

// Function to select 10 random questions ensuring dimension balance
export const selectQuestions = () => {
  const selectedQuestions = [];
  const usedQuestions = new Set();
  
  // Ensure coverage of all dimensions
  const dimensionCoverage = {};
  dimensions.forEach(dim => dimensionCoverage[dim] = 0);
  
  // First, select questions that cover the most dimensions
  const sortedQuestions = [...questions].sort((a, b) => b.dimension.length - a.dimension.length);
  
  for (const question of sortedQuestions) {
    if (selectedQuestions.length >= 10) break;
    
    // Check if this question adds value (covers under-represented dimensions)
    const wouldImprove = question.dimension.some(dim => dimensionCoverage[dim] < 2);
    
    if (wouldImprove && !usedQuestions.has(question.id)) {
      selectedQuestions.push(question);
      usedQuestions.add(question.id);
      question.dimension.forEach(dim => dimensionCoverage[dim]++);
    }
  }
  
  // Fill remaining slots randomly
  const remainingQuestions = questions.filter(q => !usedQuestions.has(q.id));
  while (selectedQuestions.length < 10 && remainingQuestions.length > 0) {
    const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
    selectedQuestions.push(remainingQuestions.splice(randomIndex, 1)[0]);
  }
  
  // Shuffle final order
  return selectedQuestions.sort(() => Math.random() - 0.5);
};

// Function to calculate spirit animal based on answers
export const calculateSpiritAnimal = (selectedQuestions, answers) => {
  // Initialize dimension scores
  const scores = {};
  dimensions.forEach(dim => scores[dim] = 0);
  
  // Calculate scores based on answers
  selectedQuestions.forEach((question, index) => {
    const answerIndex = answers[index];
    // Score: 0 = first option, 1 = second option, 2 = third option
    const score = answerIndex;
    
    question.dimension.forEach(dim => {
      scores[dim] += score;
    });
  });
  
  // Normalize scores (convert to 0-3 scale for comparison)
  const normalizedScores = {};
  Object.keys(scores).forEach(dim => {
    const maxPossible = selectedQuestions.filter(q => q.dimension.includes(dim)).length * 2;
    normalizedScores[dim] = maxPossible > 0 ? (scores[dim] / maxPossible) * 3 : 0;
  });
  
  // Find best matching spirit animal
  let bestMatch = spiritAnimals[0];
  let bestScore = -1;
  
  spiritAnimals.forEach(animal => {
    let matchScore = 0;
    Object.keys(animal.profile).forEach(trait => {
      if (normalizedScores[trait] !== undefined) {
        // Calculate similarity (closer values = higher match)
        const difference = Math.abs(normalizedScores[trait] - animal.profile[trait]);
        matchScore += (3 - difference); // Higher score for smaller differences
      }
    });
    
    if (matchScore > bestScore) {
      bestScore = matchScore;
      bestMatch = animal;
    }
  });
  
  return { animal: bestMatch, scores: normalizedScores };
};

export { spiritAnimals };