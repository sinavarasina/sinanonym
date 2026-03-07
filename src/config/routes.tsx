import type { JSX } from "react";
import { Home } from "../pages/Home/Home";
import { NullPo } from "../components/dummy/NullPo"; // cosmetics only

export interface RouteConfig {
  path: string;
  element: JSX.Element;
  isWIP?: boolean;
}

export const appRoutes: RouteConfig[] = [
  { path: "/", element: <Home /> },
  { path: "/home", element: <Home /> },
  { path: "/gallery", element: <NullPo />, isWIP: true },
  { path: "/fun-things", element: <NullPo />, isWIP: true },
  { path: "/about-me", element: <NullPo />, isWIP: true },
];
