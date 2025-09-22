# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2024-09-22

### Added
- Complete quiz flow with 4 screens (Welcome, Identity, Questions, Reveal)
- Comprehensive question pool with 50 financial personality questions
- 9 spirit animal archetypes (Lion, Owl, Eagle, Elephant, Fox, Bear, Squirrel, Peacock, Antelope)
- Smart question selection algorithm ensuring balanced dimension coverage
- 7-dimension personality scoring system (Risk, Saving, Future Focus, Impulsivity, Planning, Status, Generosity)
- Similarity-based matching algorithm for spirit animal assignment
- Interactive postcard reveal with flip animation
- Trait breakdown visualization with progress bars
- Multi-platform sharing functionality
- Quiz completion tracking with AsyncStorage
- Custom font integration (Plus Jakarta Sans family)
- Jungle-themed UI with forest background
- Progress indicator during quiz
- Personalized wealth-building messages for each archetype
- Documentation for quiz and matching system

### Changed
- Restructured app into quiz and actualize groups
- Updated main layout to handle quiz completion routing
- Replaced hardcoded questions with JSON-based question pool

### Fixed
- TypeScript error for backPressTimer variable typing
- Question display using correct JSON property names

[Unreleased]: https://github.com/username/richspirit/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/username/richspirit/releases/tag/v1.0.0