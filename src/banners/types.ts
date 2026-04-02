import type { ComponentType } from "react";

export type BannerId = "strip" | "og" | "square" | "header";

export type BannerDefinition = {
  id: BannerId;
  width: number;
  height: number;
  purpose: string;
  Component: ComponentType;
};
