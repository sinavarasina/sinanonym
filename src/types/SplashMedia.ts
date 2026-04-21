export type MediaType = "image" | "video";
export type MediaPosition =
  | "center"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export interface SplashConfig {
  type: MediaType;
  src: string;
  position?: MediaPosition;
  scale?: number;
  offsetX?: string;
  offsetY?: string;
}
