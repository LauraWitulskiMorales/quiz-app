# Quiz App

A modern, context-driven React quiz application with modular architecture, custom styling, and animated UI.

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Features](#2-features)
3. [Technologies & Dependencies](#3-technologies--dependencies)
4. [Project Structure](#4-project-structure)
5. [Key Components](#5-key-components)
6. [Data Source](#6-data-source)
7. [Getting Started](#7-getting-started)
    7.1 [Prerequisites](#71-prerequisites)
    7.2 [Installation](#72-installation)
    7.3 [Running the Application](#73-running-the-application)
8. [Usage](#8-usage)
9. [Customization](#9-customization)
10. [Extended Functionalities](#10-extended-functionalities)
11. [User Interface & Design](#11-user-interface--design)
12. [Scripts](#12-scripts)
13. [Development Setup & Linting](#13-development-setup--linting)
14. [License](#14-license)

---

## 1. Introduction

Welcome to the Quiz App!

This application provides an interactive quiz experience for users, featuring a modern, context-driven design with modular architecture, custom styling, and animated UI.

It was developed as part of my **Jahresziel** (Annual Goal) to deepen my skills in React, TypeScript, and modern web development practices, focusing on creating a robust and engaging user experience.

---

## 2. Features

The Quiz App includes the following core functionalities:

- **Multiple Screens**: Seamless navigation between Start, Game, Pause, and Result screens
- **Global State via Context API**: Efficient and centralized state management
- **Presentational/Container Component Split**: Clear separation of concerns for better maintainability
- **Custom Hooks**: Logic encapsulated in reusable hooks (`useGameState`, `useTimer`)
- **TypeScript**: Enforces type safety and maintainable code
- **Shuffled Questions**: New or restarted games shuffle questions for variety
- **Score and Lives Tracking**: User score and lives persist throughout gameplay
- **Animated UI Elements**: 3D rotation, shake effects, gradients, etc.
- **Answer Verification with Feedback**: Immediate visual feedback (correct/incorrect)
- **Question Skipping**: Option to skip if unsure
- **End Quiz Anytime**: Users can quit mid-quiz

---

## 3. Technologies & Dependencies

- **React** – Component-based UI and state management
- **TypeScript** – Type safety and maintainable logic
- **Vite** – Fast development/build tooling
- **Tailwind CSS** – Utility-first styling system
- **pnpm** – Disk-efficient package manager
- **shadcn/ui** – Headless component primitives built on Tailwind
- **90's Cursor Effects** – Adds nostalgic cursor visuals

---

## 4. Project Structure

```
src/
├── assets/ # Static files (images, sounds, fonts, etc.)
│   ├── images/
│   ├── backgrounds/
│   └── fonts/
├── components/ # Core components
│   ├── App.tsx # Application shell and main logic
│   ├── Quiz.tsx # Quiz logic (state, score, transitions)
│   ├── Question.tsx # Question rendering and answer interaction
│   └── ui/ # Presentational components
│       ├── Buttons.tsx
│       ├── Card.tsx
│       ├── Progress.tsx
│       ├── PauseScreen.tsx
│       ├── StartScreen.tsx
│       ├── ResultScreen.tsx
│       └── QuestionScreen.tsx
├── context/
│   └── QuizContext.tsx # Global state management via Context API
├── data/
│   └── questions.json # Local quiz data
├── hooks/
│   ├── useGameState.ts # Quiz state management
│   └── useTimer.ts # Timer logic
├── lib/
│   ├── types.ts # Shared TypeScript types
│   └── utils.ts # Pure utility functions
├── styles/
│   └── index.css # Global styles (Tailwind config, etc.)
└── main.tsx # App entry point (ReactDOM setup)
```

---

## 5. Key Components

* **`App.tsx`**: The central component orchestrating the overall application flow, including the start screen, the quiz game, and the result display.
* **`Quiz.tsx`**: Manages the core quiz logic, including question progression, answer processing, and score updates.
* **`Question.tsx`**: Responsible for rendering a single question and its associated answer options.
* **UI Components (`src/components/ui` directory)**: A collection of presentational components (e.g., `Card.tsx`, `Buttons.tsx`, `Progress.tsx`, `StartScreen.tsx`, `ResultScreen.tsx`, `QuestionScreen.tsx`, `PauseScreen.tsx`) designed for reusability and consistent styling.

---

## 6. Data Source

The quiz questions are sourced from a local JSON file: `src/data/questions.json`.
A sample structure for `questions.json` is:

```json
[
  {
    "question": "Was ist die Hauptstadt von Deutschland?",
    "answers": ["Berlin", "München", "Hamburg", "Köln"],
    "correctAnswer": "Berlin"
  }
]
```

The application is designed to allow for future integration with an external API (e.g., Open Trivia Database) for dynamic question fetching.

---

## 7. Getting Started

Follow these steps to get the React Quiz App up and running on your local machine.

### 7.1 Prerequisites

Ensure you have the following installed:

* **Node.js**: (LTS version recommended)
* **pnpm**: You can install it globally via npm:
    ```sh
    npm install -g pnpm
    ```
* **Git**

### 7.2 Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/](https://github.com/)[YourUsername]/Jahresziel-Project.git
    cd Jahresziel-Project
    ```
    *(Replace `[YourUsername]` with your actual GitHub username or the repository's path)*

2.  **Install dependencies:**
    ```sh
    pnpm install
    # or
    npm install
    # or
    yarn install
    ```

### 7.3 Running the Application

1.  **Start the development server:**
    ```sh
    pnpm dev
    # or
    npm run dev
    # or
    yarn dev
    ```

2.  **Open in browser:**
    Visit `http://localhost:5173` (or the port shown in your terminal).

---

## 8. Usage

Once the application is running:

* **Start Quiz**: Click the "Start" button on the initial screen.
* **Answer Questions**: Select an answer option for each question.
* **Get Feedback**: See immediate visual feedback (green for correct, red for incorrect).
* **Skip Questions**: Use the "Skip" button to move to the next question without answering.
* **Track Progress**: Your current score and remaining lives are displayed.
* **End Game**: You can choose to end the quiz at any time.

---

## 9. Customization

* **Add Questions**: Extend the quiz by adding more questions to `src/data/questions.json`.
* **Update Styles**: Modify the application's appearance by updating styles in `src/styles/index.css`.
* **Add Assets**: Include new images, fonts, or other media by placing them in `src/assets/` (e.g., `src/assets/images/`, `src/assets/backgrounds/`, `src/assets/fonts/`).

---

## 10. Extended Functionalities

The application includes the following advanced features:

* **Life System**: Users lose the game after 5 incorrect answers.
* **Timer**: A time limit is set for each question, adding an extra challenge.

Future enhancements could include high score saving (locally or via API).

---

## 11. User Interface & Design

The UI is designed with a focus on clarity, user experience, and modern aesthetics:

* **Clear Display**: Questions and answers are presented in a clear, structured manner.
* **Visual Feedback**: Color-coded feedback (green for correct, red for incorrect) is provided for answers.
* **Visible Score**: The current score is always visible.
* **Progress and Life Indicators**: Displayed to enhance the user's awareness of their game status.
* **90's Cursor-Effects**: Adds a unique, nostalgic visual flair to the user interaction.
* **Animated UI Elements**: Incorporates dynamic animations for a more engaging experience.
* **Responsive and Accessible Design**: Ensures the application is usable and visually appealing across various devices and for all users.

---

## 12. Scripts

The following scripts are available for development and building:

* `dev`: Starts the development server.
* `build`: Builds the application for production.
* `preview`: Previews the production build locally.
* `lint`: Runs ESLint for code quality checks.

---

## 13. Development Setup & Linting

This project is set up with Vite for fast development and includes ESLint for code quality.

Currently, two official Vite plugins for React are available:

* [`@vitejs/plugin-react`](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh.
* [`@vitejs/plugin-react-swc`](https://swc.rs/) uses [SWC](https://swc.rs/) for Fast Refresh.

---

## 14. License

Distributed under the **MIT License**. See `LICENSE` for more information.
