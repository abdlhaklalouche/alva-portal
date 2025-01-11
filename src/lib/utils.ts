import { toast } from "@/hooks/use-toast";
import INotification from "@/types/INotification";
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

export const pushNotification = (notification: INotification) => {
  const toastNotification = toast({
    title: notification.title,
    description: notification.description,
  });

  const browserNotification = new Notification(notification.title, {
    body: notification.description,
  });

  browserNotification.addEventListener("close", () => {
    toastNotification.dismiss();
  });
};
