# Daily Self-Improvement Checklist

A simple web application that generates a daily checklist of three self-improvement tasks using Anthropic's Claude AI. The app allows users to track their progress throughout the day with a clean, intuitive interface.

## Features

- Daily generation of three simple self-improvement tasks using Claude AI
- Persistent task completion state within the same day
- Automatic reset of tasks at the beginning of each new day
- Responsive UI built with Shadcn UI components
- Robust error handling with fallback tasks
- Server-side caching to minimize API calls

## Tech Stack

- **Frontend**: Next.js 15, React 19
- **Styling**: TailwindCSS v4
- **State Management**: Zustand
- **UI Components**: Shadcn UI
- **AI Integration**: Anthropic's Claude API

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- An Anthropic API key

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/daily-self-improvement.git
   cd daily-self-improvement
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your Anthropic API key:

   ```
   ANTHROPIC_API_KEY=your_api_key_here
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.

## How It Works

1. On initial load, the client checks local storage for today's tasks
2. If no tasks exist for today, it requests new tasks from the server
3. The server checks its in-memory cache for today's tasks
4. If no tasks exist in the cache, it generates new tasks using the Claude API
5. Tasks are cached on the server for the current day to minimize API calls
6. Task completion states are stored in local storage, keyed by the current date
7. Each new day automatically generates a fresh list of tasks

## Security and Performance Considerations

- The Anthropic API key is stored server-side only
- API calls to Claude are minimized through server-side caching
- Local storage is used for persisting user data, with automatic cleanup (old days' data isn't preserved)
- Robust error handling ensures the app continues to function even if the AI service is unavailable

## License

This project is licensed under the MIT License - see the LICENSE file for details.
