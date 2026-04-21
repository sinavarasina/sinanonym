import { createBrowserRouter } from "react-router-dom";
import { appRoutes } from "./config/routes";
import { Home } from "./pages/Home/Home";
import { NotFound } from "./pages/NotFound/NotFound";
import WIPAnimation from "./assets/videos/anone.webm";

const PAGE_MAP: Record<string, React.ReactNode> = {
  Home: <Home />,
};

const routerObjects = appRoutes.map((route) => {
  if (route.isWIP) {
    return {
      path: route.path,
      element: (
        <NotFound
          title={`Page ${route.path} is WIP`}
          message="This sector is currently under construction. Please check back later."
          animVid={WIPAnimation}
        />
      ),
    };
  }

  return {
    path: route.path,
    element: PAGE_MAP[route.pageKey] ?? <NotFound />,
  };
});

routerObjects.push({
  path: "*",
  element: <NotFound />,
});

export const router = createBrowserRouter(routerObjects);
