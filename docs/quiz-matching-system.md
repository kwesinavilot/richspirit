# Quiz & Matching System Documentation

## Overview
Rich Spirit uses a sophisticated quiz system to match users with their financial spirit animal based on 7 key personality dimensions.

## System Components

### 1. Question Pool (50 Questions)
- **Source**: `data/questions.json`
- **Coverage**: 7 financial personality dimensions
- **Selection**: 10 random questions per user ensuring balanced coverage

### 2. Dimensions Measured
1. **Risk** - Comfort with financial uncertainty
2. **Saving** - Propensity to save vs spend
3. **Future Focus** - Long-term vs short-term thinking
4. **Impulsivity** - Spontaneous vs deliberate decisions
5. **Planning** - Structured vs flexible approach
6. **Status** - Importance of image and social standing
7. **Generosity** - Willingness to give/help others

### 3. Spirit Animals (9 Archetypes)
- **Source**: `data/archetypes.json`
- **Each has**: Unique profile across 7 dimensions (0-3 scale)

## How It Works

### Step 1: Question Selection
```javascript
// Ensures balanced dimension coverage
- Prioritizes multi-dimensional questions
- Guarantees each dimension is represented
- Randomly selects 10 from 50 total questions
```

### Step 2: Answer Scoring
```javascript
// Each answer maps to dimension scores
Answer Index: 0 = Low, 1 = Medium, 2 = High
Example: "Do you save money?" 
- "Always" = 2 points to 'saving'
- "Sometimes" = 1 point to 'saving'  
- "Rarely" = 0 points to 'saving'
```

### Step 3: Score Normalization
```javascript
// Convert raw scores to 0-3 scale
normalizedScore = (rawScore / maxPossible) * 3
```

### Step 4: Animal Matching
```javascript
// Find closest archetype using similarity scoring
For each animal:
  matchScore = sum of (3 - |userScore - animalScore|)
  
Best match = highest matchScore
```

## Example Calculation

**User answers 10 questions, gets these normalized scores:**
- Risk: 2.1, Saving: 0.8, Future Focus: 2.5, etc.

**Lion archetype profile:**
- Risk: 3, Saving: 1, Future Focus: 3, etc.

**Match calculation:**
- Risk similarity: 3 - |2.1 - 3| = 2.1
- Saving similarity: 3 - |0.8 - 1| = 2.8
- Total match score = sum of all similarities

## Archetype Profiles

| Animal | Risk | Saving | Future | Impulsivity | Planning | Status | Generosity |
|--------|------|--------|--------|-------------|----------|--------|------------|
| Lion | 3 | 1 | 3 | 1 | 2 | 3 | 1 |
| Owl | 0 | 3 | 3 | 0 | 3 | 1 | 1 |
| Eagle | 3 | 1 | 3 | 1 | 2 | 3 | 1 |
| Elephant | 0 | 3 | 3 | 0 | 3 | 1 | 2 |
| Fox | 2 | 1 | 2 | 1 | 2 | 2 | 1 |
| Bear | 1 | 2 | 2 | 1 | 2 | 1 | 2 |
| Squirrel | 0 | 3 | 2 | 0 | 2 | 1 | 1 |
| Peacock | 1 | 0 | 1 | 2 | 1 | 3 | 1 |
| Antelope | 2 | 1 | 2 | 2 | 2 | 1 | 1 |

## Result Display
- Shows matched spirit animal with emoji and description
- Displays user's trait breakdown with visual bars
- Provides personalized $1M wealth-building message
- Includes disclaimer for entertainment purposes

## Technical Implementation
- **Frontend**: React Native with AsyncStorage for data persistence
- **Logic**: Pure JavaScript calculation functions
- **Data**: JSON files for questions and archetypes
- **Matching**: Cosine similarity-based algorithm