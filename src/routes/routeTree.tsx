import {
  createRouter,
  createRoute,
  Outlet,
  createRootRoute,
} from "@tanstack/react-router";

const rootRoute = createRootRoute({
  component: () => (
    <div>
      <Outlet />
    </div>
  ),
});

const homeRoute = createRoute({
  path: "/",
  component: () => <div>Home</div>,
  getParentRoute: () => rootRoute,
});

const routeTree = rootRoute.addChildren([homeRoute]);

export const router = createRouter({
  routeTree,
});
