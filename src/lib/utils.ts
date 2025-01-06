import { clsx, type ClassValue } from "clsx";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTokenFromCookies = (store: ReadonlyRequestCookies): string => {
  const token = store.get("token")?.value;

  return token ? `Bearer ${token}` : "";
};

export const getRandomBlackShade = () => {
  const randomShade = Math.floor(Math.random() * 256);
  return `rgb(${randomShade}, ${randomShade}, ${randomShade})`;
};
