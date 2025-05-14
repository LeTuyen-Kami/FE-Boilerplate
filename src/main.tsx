import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import JotaiProvider from "./contexts/JotaiProvider.tsx";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes/routeTree.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <JotaiProvider>
      <RouterProvider router={router} />
    </JotaiProvider>
  </StrictMode>
);
