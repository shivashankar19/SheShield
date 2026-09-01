# SheShield

SheShield is a safety and wellbeing web application designed to provide users with access to safety tools, health/wellbeing resources, emergency contacts, and AI-assisted support.

## Features

- Safety and emergency support features
- Health and wellbeing resources
- Emergency/contact management
- User profile and dashboard
- AI-assisted support
- Responsive web interface

## Tech Stack

- React
- TypeScript
- Vite
- CSS
- Google Gemini API / AI service integration

## Project Structure

```text
SheShield/
├── components/       # Reusable UI components
├── pages/            # Application pages
├── services/         # API/AI service integrations
├── screenshots/      # Application screenshots
├── uml/              # UML and architecture diagrams
├── docs/             # Project documentation
├── App.tsx
├── index.tsx
├── package.json
└── README.md
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a local `.env.local` file based on `.env.example`.

Do **not** commit `.env.local` or API keys to GitHub.

### 3. Start the development server

```bash
npm run dev
```

Then open the local URL shown by Vite.

## Documentation

- Application screenshots are available in [`screenshots/`](screenshots/)
- UML and architecture diagrams are available in [`uml/`](uml/)
  
## Security Note

Environment files containing API keys or other secrets are intentionally excluded from this repository. Use `.env.example` as the template for local configuration.

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1KQdZNybV0Am78g6Cppurq7mhApTD-ghA

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
