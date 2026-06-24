# Rick and Morty Wiki

A small React Native app (Expo) that lists Rick and Morty episodes and characters — a lightweight wiki/demo built with TypeScript and modern React Native tooling.

## Quick overview

- **Platform:** React Native (Expo Managed + Dev Client)
- **Language:** TypeScript
- **Main entry:** [index.tsx](index.tsx#L1)
- **App root:** [app/app.tsx](app/app.tsx#L1)

## Features

- Browse episodes and seasons
- Episode details and character lists
- Theming and i18n-ready strings

## Prerequisites

- Node.js >= 20
- npm or yarn
- Xcode (for iOS simulator) or Android Studio (for Android emulator) if you run natively
- Optional: EAS CLI for cloud/local builds (`npm i -g eas-cli`)

## Quick start

Install dependencies and start the dev server:

```bash
npm install
npm run start
```

Open the app on a device or simulator:

- iOS simulator: `npm run ios`
- Android emulator: `npm run android`

This project uses the Expo dev client (`expo-dev-client`). Use the QR code from `npm run start` with your dev client app, or run on a simulator with the scripts above.

## Building

Local EAS builds are provided via scripts in `package.json`:

- `npm run build:ios:sim` — build iOS simulator locally
- `npm run build:android:sim` — build Android locally

For cloud builds, configure `eas.json` and run `eas build --platform <ios|android>`.

## Testing & linting

- Run unit tests: `npm test`
- Run tests in watch mode: `npm run test:watch`
- Lint and auto-fix: `npm run lint`

## Project layout (high level)

- [app/screens/EpisodeListScreen.tsx](app/screens/EpisodeListScreen.tsx#L1) — main episode list
- [app/screens/EpisodeScreen.tsx](app/screens/EpisodeScreen.tsx#L1) — episode detail view
- [app/components](app/components) — reusable UI components (Card, Button, AutoImage, etc.)
- [app/services/api](app/services/api) — API wrappers
- [app/theme](app/theme) — colors, spacing, typography

## Where to look first

- App entry: [app/app.tsx](app/app.tsx#L1)
- Navigation setup: [app/navigators/AppNavigator.tsx](app/navigators/AppNavigator.tsx#L1)
- Episode list: [app/screens/EpisodeListScreen.tsx](app/screens/EpisodeListScreen.tsx#L1)

---

## React Native Technical Challenge

Hello! This project can be used as the submission for the React Native technical challenge. Below are the original instructions used for the exercise — keep them as a reference for requirements, evaluation criteria, and bonus ideas.

### Getting Started

1. Project Setup

	- The challenge uses the Ignite CLI React Native boilerplate. To start a fresh project, follow the Ignite README: https://github.com/infinitered/ignite
	- Create a new project named `RickMortyChallenge` when starting from scratch.
	- When prompted, choose **React Navigation** (not Expo Router).
	- The project is TypeScript-ready and includes pre-built components from the Ignite boilerplate.

### The Challenge

Build a small app that consumes the Rick and Morty REST API: https://rickandmortyapi.com/documentation/#rest

Required screens:

- Screen 1 — Episodes List: display all episodes showing episode name, air date, and episode number (season + episode format).
- Screen 2 — Episode Detail: show episode information and a list of characters appearing in the episode. For each character show image, name, and status (Alive, Dead, Unknown).

### What We Value

- Clean, readable code and separation of concerns
- Efficient API usage and data handling
- Loading states and error handling
- Responsive UI across screen sizes
- Modern React Native patterns and best practices

### Time Expectation

This challenge is designed to be completed in ~1 hour. Prioritize core functionality, clean architecture, and polish if time allows.

### Bonus Ideas

- Search functionality
- Pull-to-refresh
- Offline handling / caching improvements
- Custom animations
- Additional character details

### Getting Help

- Ignite boilerplate docs: https://github.com/infinitered/ignite
- Rick and Morty API docs: https://rickandmortyapi.com/documentation/#rest