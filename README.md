# Vita Dairy

A React application built with Vite and TypeScript, focusing on [briefly describe your project's purpose here].

## Tech Stack

- **Framework:** React 19
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** @tanstack/react-router
- **State Management:** Jotai
- **Data Fetching:** @tanstack/react-query, Ky
- **UI Components:** Radix UI (Checkbox, Dialog, Slot, Switch, Tooltip)
- **Animation:** Framer Motion
- **Utilities:** clsx, tailwind-merge, dayjs, fast-equals, lucide-react
- **Linting & Formatting:** ESLint, Prettier (assumed, recommend adding)
- **Package Manager:** Bun (as per user preference)

## Project Structure

The `src` directory contains the core application code:

```
src/
├── App.css
├── App.tsx             # Main application component
├── main.tsx            # Entry point of the application
├── index.css           # Global styles
├── vite-env.d.ts       # Vite environment type definitions
├── assets/             # Static assets (images, fonts, etc.)
├── atoms/              # Jotai atoms for state management
├── components/         # Reusable UI components
├── configs/            # Application configurations
├── contexts/           # React contexts
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and libraries
├── pages/              # Page components for different routes
├── routes/             # Routing configuration
├── services/           # API service integrations
├── stores/             # Global stores (if any, besides Jotai atoms)
└── utils/              # General utility functions
```

## Available Scripts

In the project directory, you can run the following commands using `bun`:

### `bun dev`

Runs the app in development mode.
Open [http://localhost:5173](http://localhost:5173) (or the port Vite assigns) to view it in the browser.
The page will reload if you make edits.

### `bun run build`

Builds the app for production to the `dist` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

### `bun run build:development`

Builds the app for development to the `dist` folder using the development mode configuration.

### `bun run build:production`

Builds the app for production to the `dist` folder using the production mode configuration. (Similar to `bun run build`)

### `bun run lint`

Lints the project files using ESLint.

### `bun run preview`

Serves the production build locally to preview the app. This command should be run after `bun run build`.

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd vita-dairy
    ```

2.  **Install dependencies:**
    Make sure you have [Bun](https://bun.sh/) installed.

    ```bash
    bun install
    ```

3.  **Start the development server:**
    ```bash
    bun dev
    ```

## Development

To start the development server, run:

```bash
bun dev
```

This will start the Vite development server and open the application in your default browser.

## Building the Application

To create a production build:

```bash
bun run build
```

The build artifacts will be stored in the `dist/` directory.

For a development build:

```bash
bun run build:development
```

## Linting

To lint your code:

```bash
bun run lint
```

## Previewing the Production Build

After building the application, you can preview it locally:

```bash
bun run preview
```

This will serve the contents of the `dist` folder.
