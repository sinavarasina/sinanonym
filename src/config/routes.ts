export interface RouteConfig {
  path: string;
  pageKey: string;
  isWIP?: boolean;
}

export const appRoutes: RouteConfig[] = [
  { path: "/", pageKey: "Home" },
  { path: "/home", pageKey: "Home" },
  { path: "/gallery", pageKey: "Gallery", isWIP: true },
  { path: "/fun-things", pageKey: "FunThings", isWIP: true },
  { path: "/about-me", pageKey: "AboutMe", isWIP: true },
];
